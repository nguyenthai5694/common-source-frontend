import * as React from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ColumnsConfig, DataTableQueries, TableConfig } from '../datatable/datatable.type';
import EnhancedTableHead from './table-header';
import TableToolbar from './table-toolbar';

interface TableProps {
  columnsConfig: ColumnsConfig<any>;
  dataItems: any[];
  tableConfig: TableConfig<any>;
  onSearch?: (queries: DataTableQueries) => void;
  onSelectItem?: (items: any) => void;
  onActionClick?: (items: any) => void;
  dataTableQueries: DataTableQueries;
  totalItem: number;
  checkType?: 'checkbox' | 'radio';
}

export const defaultQueries: DataTableQueries = {
  page: 1,
  size: 10,
  sort: null,
  filter: null,
};

export default function DataTable({
  dataItems,
  columnsConfig,
  tableConfig,
  dataTableQueries,
  onSearch,
  totalItem,
  checkType,
  onSelectItem,
  onActionClick,
}: TableProps) {
  const [selected, setSelected] = React.useState([]);
  const [paddingRightTable, setPaddingRightTable] = React.useState(0);
  const tableQueries: DataTableQueries = { ...dataTableQueries };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(dataItems);

      return;
    }

    setSelected([]);
  };

  const handleClick = (event, item, index?: number) => {
    if (checkType === 'checkbox') {
      const selectedItem = selected.find(e => item[`${tableConfig.idProp}`] === e[`${tableConfig.idProp}`])

      let newSelected;

      if (selectedItem) {
        newSelected = selected.filter(e => item[`${tableConfig.idProp}`] !== e[`${tableConfig.idProp}`])
      } else {
        newSelected = [...selected]

        newSelected.push(item)
      }

      setSelected(newSelected);
      onSelectItem(newSelected)
    } else {
      onSelectItem([item])
    }
  };

  /**
   * callback submit Table Search
   */
  const callbackOnsearch = React.useCallback((value) => {
    tableQueries.filter = { ...value }

    // call onSearch of Component
    onSearch(tableQueries);
  }, [tableQueries, onSearch])

  /**
   * Event Sort
   */
  const handleSort = React.useCallback(
    (event, newOrderBy) => {
      const isAsc = dataTableQueries?.sort?.dataKey === newOrderBy && dataTableQueries?.sort?.type === 'asc';
      const toggledOrder = isAsc ? 'desc' : 'asc';

      dataTableQueries.sort = {
        dataKey: newOrderBy,
        type: toggledOrder,
      }

      // call onSearch of Component
      onSearch(dataTableQueries);
    },
    [dataTableQueries, onSearch],
  );

  /**
   * Event change page
   */
  const handleChangePage = React.useCallback(
    (event, newPage) => {
      dataTableQueries.page = newPage
      onSearch(dataTableQueries);
    },
    [dataTableQueries, onSearch],
  );

  /**
   * Event change Rows Per Page
   */
  const handleChangeRowsPerPage = React.useCallback(
    (event) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);

      dataTableQueries.size = updatedRowsPerPage
      onSearch(dataTableQueries);
    },
    [dataTableQueries, onSearch],
  );

  React.useEffect(() => {
    const listTdAction = document.querySelectorAll('.colunm-action-item')

    listTdAction.forEach((item: HTMLElement) => {
      item.style.height = (item.parentElement.offsetHeight + 2) + 'px'
    })

    let paddingLeft = 0;

    const listTd = document.querySelectorAll('.MuiTableHead-root .table-colunm-fixed')

    listTd.forEach((item: HTMLElement, index) => {
      item.style.height = (item.parentElement.offsetHeight) + 'px'
      item.style.left = paddingLeft + 'px'
      setWidthHeightBoxFixed(paddingLeft, index, index === listTd.length - 1)
      paddingLeft += item.offsetWidth

      if (index === listTd.length - 1) item.style.borderRight = '1px solid #fff'
    })

    setPaddingRightTable(paddingLeft - 1)
  }, [dataItems, tableConfig.fixedColumnNumber])

  const setWidthHeightBoxFixed = (paddingLeft, index, isBorderRight) => {
    const listTd = document.querySelectorAll('.MuiTableBody-root .table-colunm-fixed.table-colunm-' + index)

    listTd.forEach((item: HTMLElement) => {
      item.style.height = (item.parentElement.offsetHeight + 1) + 'px'
      item.style.left = paddingLeft + 'px'

      if (isBorderRight) item.style.borderRight = '1px solid rgba(224, 224, 224, 1)'
    })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }} className='data-table'>
        <TableToolbar numSelected={selected.length} tableConfig={tableConfig} onSearch={callbackOnsearch} />

        <TableContainer
          sx={{
            paddingRight: columnsConfig[columnsConfig.length - 1].width,
            paddingLeft: paddingRightTable + 'px',
          }}>
          <Box>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby='tableTitle'
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={dataTableQueries.sort?.type}
                orderBy={dataTableQueries.sort?.dataKey}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleSort}
                rowCount={dataItems.length}
                headCells={columnsConfig}
                checkType={checkType}
                fixedLastColunm={tableConfig.fixedLastColunm}
                tableConfig={tableConfig}
              />

              <TableBody>
                {dataItems
                  ? dataItems.map((row, index) => {
                    const isItemSelected = selected.find(e =>
                      row[`${tableConfig.idProp}`] === e[`${tableConfig.idProp}`])
                      ? true : false
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role='checkbox'
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={`${row.name}-${index}`}
                        selected={isItemSelected}
                        className={index === 0 ? 'row-first' : ''}
                      >
                        {checkType === 'checkbox' &&
                          <TableCell padding='checkbox' className='table-colunm-0 table-colunm-fixed'>
                            <Checkbox
                              color='primary'
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                              onClick={(event) => handleClick(event, row, index)}
                            />
                          </TableCell>}

                        {checkType === 'radio' &&
                          <TableCell
                            className='table-checkbox table-colunm-0 table-colunm-fixed'
                            padding='checkbox'
                            align='center'
                          >
                            <RadioGroup
                              aria-labelledby='demo-controlled-radio-buttons-group'
                              name='controlled-radio-buttons-group'
                            >
                              <FormControlLabel value={index} control={<Radio />} label=''
                                onClick={(event) => handleClick(event, row)} />
                            </RadioGroup>
                          </TableCell>}

                        {columnsConfig && columnsConfig.map((item, i) => {
                          return (
                            <TableCell
                              key={`${item.dataKey}-${i}`} align={item.align}
                              className={`${tableConfig.fixedLastColunm &&
                                columnsConfig.length - 1 === i ?
                                'colunm-action-item' : ''} table-colunm-${checkType ? i + 1 : i} 
                                ${tableConfig.fixedColumnNumber > i ? 'table-colunm-fixed' : ''}`}
                              width={item.width}
                              sx={tableConfig.fixedColumnNumber - 1 === i ? {
                                borderRight: '1px solid rgba(224, 224, 224, 1)',
                              } : tableConfig.fixedColumnNumber === i ? {
                                borderLeft: 'none !important',
                              } : null}
                            >
                              {!item.component && row[item.dataKey]}

                              {item.component && <item.component
                                dataItem={row}
                                index={index}
                                clickAction={onActionClick}
                                buttons={item.buttons}
                              />}
                            </TableCell>

                          )
                        })}

                      </TableRow>
                    );
                  })
                  : null}

                {dataItems.length === 0 && (
                  <TableRow

                  >
                    <TableCell colSpan={columnsConfig.length} >Không có kết quả</TableCell>
                  </TableRow>
                )}

              </TableBody>
            </Table>
          </Box>
        </TableContainer>

        {dataItems.length > 0 && <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={totalItem}
          rowsPerPage={dataTableQueries?.size || 10}
          page={dataTableQueries?.page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />}
      </Paper>

    </Box >
  );
}
