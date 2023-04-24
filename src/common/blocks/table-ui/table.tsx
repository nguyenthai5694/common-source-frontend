import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { DataTableQueries } from '../datatable/datatable.type';
import { DatatableContext } from './datatable.context';
import DataTableBody from './table-body';
import TableProps from './table-config';
import DataTableHead from './table-header';
import TableToolbar from './table-toolbar';

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
  /**
   * Table queies
   */
  const tableQueries: DataTableQueries = { ...dataTableQueries };

  /**
 * List item selected
 */
  const [selected, setSelected] = React.useState([]);

  /**
   * 
   * @param event 
   * Event select all of type checkbox
   */
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(dataItems);

      return;
    }

    setSelected([]);
  };

  /**
   * 
   * @param event 
   * @param item 
   * @param index 
   * Event choose record of type checkbox or radio
   */
  const handleClick = (event, item: any, index?: number) => {
    let newSelected = [];

    if (checkType === 'checkbox') {
      //Get item selected
      const selectedItem = selected.find(e => item[`${tableConfig.idProp}`] === e[`${tableConfig.idProp}`])

      //Create new valiabel Selected

      //Check item select with list selected and get newSelected
      if (selectedItem) {
        newSelected = selected.filter(e => item[`${tableConfig.idProp}`] !== e[`${tableConfig.idProp}`])
      } else {
        newSelected = [...selected]

        newSelected.push(item)
      }

      setSelected(newSelected);
    } else {
      newSelected = [item]
    }

    //Callback function onSelectItem for Component
    onSelectItem(newSelected)
  };

  /**
   * callback submit Table Search
   */
  const callbackOnsearch = React.useCallback((value) => {
    tableQueries.filter = { ...value }

    // call function onSearch of Component
    onSearch(tableQueries);
  }, [tableQueries, onSearch])

  /**
   * Event Sort
   */
  const handleSort = React.useCallback(
    (event, newOrderBy) => {
      const isAsc = dataTableQueries?.sort?.dataKey === newOrderBy && dataTableQueries?.sort?.type === 'asc';

      dataTableQueries.sort = {
        dataKey: newOrderBy,
        type: isAsc ? 'desc' : 'asc',
      }

      // call function onSearch of Component
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

  /**
   * Event first load 
   */
  React.useEffect(() => {
    let paddingLeft = 0;

    //Get list element tag th has class table-colunm-fixed
    const listTh = document.querySelectorAll('.MuiTableHead-root .table-colunm-fixed')

    //Set position colunm fixed
    listTh.forEach((item: HTMLElement, index) => {
      item.style.left = paddingLeft + 'px'
      paddingLeft += item.offsetWidth
    })

    //Get list element tag td has class table-colunm-fixed
    const listTd = document.querySelectorAll('.MuiTableBody-root .table-colunm-fixed')

    paddingLeft = 0

    //Set position colunm fixed
    listTd.forEach((item: HTMLElement, index) => {
      item.style.left = paddingLeft + 'px'
      paddingLeft += item.offsetWidth
    })
  }, [dataItems])

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }} className='data-table'>
        <DatatableContext.Provider
          value={{
            dataItems,
            columnsConfig,
            tableConfig,
            onSearch,
            dataTableQueries,
            totalItem,
            checkType,
            selected,
          }}
        >
          <TableToolbar onSearch={callbackOnsearch} />

          <TableContainer>
            <Box>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby='tableTitle'
              >
                <DataTableHead
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleSort}
                />

                <DataTableBody
                  onActionClick={onActionClick}
                  handleClick={handleClick}
                />
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

        </DatatableContext.Provider>
      </Paper>

    </Box >
  );
}
