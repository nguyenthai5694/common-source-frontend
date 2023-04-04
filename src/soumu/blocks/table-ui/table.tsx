import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ColumnsConfig, DataTableQueries, TableConfig } from '../datatable/datatable.type';
import EnhancedTableHead from './table-header';
import TableToolbar from './table-toolbar';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) {
      return order;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'calories';
const DEFAULT_ROWS_PER_PAGE = 5;

interface TableProps {
  columnsConfig: ColumnsConfig<any>;
  dataItems: any[];
  tableConfig: TableConfig<any>;
  /**
   * Triggered when:
   * - DataTable componentDidMount.
   * - user apply search - click search button(**Notice**: `DataTableQueries.page` will be reset to 1).
   * - user apply sort(if there is no `onLocalSearch`).
   * - user change page number(if there is no `onLocalSearch`).
   * - user change page size(if there is no `onLocalSearch`).
   */
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
  // const { dataItems, columnsConfig, tableConfig, onSearch } = props
  const [order, setOrder] = React.useState<'asc' | 'desc'>(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [visibleRows, setVisibleRows] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = React.useState(0);
  const tableQueries: DataTableQueries = { ...dataTableQueries };

  React.useEffect(() => {
    let rowsOnMount = stableSort(
      dataItems,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY),
    );

    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
    );

    setVisibleRows(rowsOnMount);
  }, [dataItems]);

  // const handleRequestSort = React.useCallback(
  //   (event, newOrderBy) => {
  //     const isAsc = orderBy === newOrderBy && order === 'asc';
  //     const toggledOrder = isAsc ? 'desc' : 'asc';

  //     setOrder(toggledOrder);
  //     setOrderBy(newOrderBy);

  //     const sortedRows = stableSort(dataItems, getComparator(toggledOrder, newOrderBy));
  //     const updatedRows = sortedRows.slice(
  //       page * rowsPerPage,
  //       page * rowsPerPage + rowsPerPage,
  //     );

  //     setVisibleRows(updatedRows);
  //   },
  //   [dataItems, order, orderBy, page, rowsPerPage],
  // );

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

  const handleChangePage = React.useCallback(
    (event, newPage) => {
      setPage(newPage);

      const sortedRows = stableSort(dataItems, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage,
      );

      setVisibleRows(updatedRows);

      // Avoid a layout jump when reaching the last page with empty rows.
      const numEmptyRows =
        newPage > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - dataItems.length) : 0;

      const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;

      setPaddingHeight(newPaddingHeight);
    },
    [dataItems, order, orderBy, rowsPerPage, dense],
  );

  const handleChangeRowsPerPage = React.useCallback(
    (event) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);

      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const sortedRows = stableSort(dataItems, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage,
      );

      setVisibleRows(updatedRows);

      // There is no layout jump to handle on the first page.
      setPaddingHeight(0);
    },
    [dataItems, order, orderBy],
  );

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
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

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }} className='data-table'>
        <TableToolbar numSelected={selected.length} tableConfig={tableConfig} onSearch={callbackOnsearch} />

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size={dense ? 'small' : 'medium'}
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
              {visibleRows
                ? visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
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

              {paddingHeight > 0 && (
                <TableRow
                  style={{
                    height: paddingHeight,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={dataItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label='Dense padding'
      />
    </Box>
  );
}
