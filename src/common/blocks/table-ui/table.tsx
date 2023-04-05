import * as React from 'react';
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
  dataTableQueries: DataTableQueries;
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
}: TableProps) {
  const [selected, setSelected] = React.useState([]);
  const tableQueries: DataTableQueries = { ...dataTableQueries };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = dataItems.map((n) => n.name);

      setSelected(newSelected);

      return;
    }

    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

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

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }} className='data-table'>
        <TableToolbar numSelected={selected.length} tableConfig={tableConfig} onSearch={callbackOnsearch} />

        <TableContainer>
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
            />

            <TableBody>
              {dataItems
                ? dataItems.map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`${row.name}-${index}`}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox
                          color='primary'
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>

                      {columnsConfig && columnsConfig.map((item, index) => {
                        return (
                          <TableCell key={index} align={item.align} >{row[item.dataKey]}</TableCell>
                        )
                      })}

                    </TableRow>
                  );
                })
                : null}

              {dataItems.length === 0 && (
                <TableRow

                >
                  <TableCell colSpan={6} >Không có kết quả</TableCell>
                </TableRow>
              )}

            </TableBody>
          </Table>
        </TableContainer>

        {dataItems.length > 0 && <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={dataItems.length}
          rowsPerPage={dataTableQueries?.size || 10}
          page={dataTableQueries?.page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />}
      </Paper>

    </Box>
  );
}
