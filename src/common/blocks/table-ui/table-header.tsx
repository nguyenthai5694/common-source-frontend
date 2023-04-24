import React, { useContext } from 'react';
import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { DatatableContext } from './datatable.context';

interface TableHeadProps {
  onSelectAllClick: (e?: any) => void;
  onRequestSort: (e?: any, e1?: any) => void;
}

export default function DataTableHead({
  onSelectAllClick,
  onRequestSort,
}: TableHeadProps) {
  const {
    tableConfig,
    columnsConfig,
    checkType,
    selected,
    dataTableQueries,
    dataItems,
  } = useContext(DatatableContext);

  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };

  return (
    <TableHead>
      <TableRow>
        {checkType === 'checkbox' && <TableCell padding='checkbox' className='table-colunm-fixed'>
          <Checkbox
            color='primary'
            indeterminate={selected.length > 0 && selected.length < dataItems.length}
            checked={dataItems.length > 0 && selected.length === dataItems.length}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>}

        {checkType === 'radio' && <TableCell padding='checkbox' className='table-colunm-fixed'>
        </TableCell>}

        {columnsConfig.map((headCell: any, index) => (
          <TableCell
            key={`${headCell.dataKey}-${index}`}
            align={'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={dataTableQueries.sort?.dataKey === headCell.dataKey ? dataTableQueries.sort?.type : false}
            width={headCell.width}
            className={`${tableConfig.fixedLastColunm && index === columnsConfig.length - 1 ? 'colunm-action' : ''} 
            ${tableConfig.fixedColumnNumber > index ? 'table-colunm-fixed' : ''}`}
          >
            {!headCell.disableSort && <TableSortLabel
              active={dataTableQueries.sort?.dataKey === headCell.dataKey}
              direction={dataTableQueries.sort?.dataKey === headCell.dataKey ? dataTableQueries.sort?.type : 'asc'}
              onClick={createSortHandler(headCell.dataKey)}
            >
              {headCell.label}

              {dataTableQueries.sort?.dataKey === headCell.dataKey ? (
                <Box component='span' sx={visuallyHidden}>
                  {dataTableQueries.sort?.type === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>}

            {headCell.disableSort && <>
              {headCell.label}
            </>}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}