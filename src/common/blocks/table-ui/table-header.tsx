import * as React from 'react';
import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

interface TableHeadProps {
  numSelected: number;
  onRequestSort: (e?: any, e1?: any) => void;
  onSelectAllClick: (e?: any) => void;
  order: 'asc' | 'desc';
  orderBy: string,
  rowCount: number,
  headCells: any,
}

export default function EnhancedTableHead(props: TableHeadProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } =
    props;
  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>

        {headCells.map((headCell, index) => (
          <TableCell
            key={`${headCell.dataKey}-${index}`}
            align={'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.dataKey ? order : false}
            width={headCell.width}
          >
            {!headCell.disableSort && <TableSortLabel
              active={orderBy === headCell.dataKey}
              direction={orderBy === headCell.dataKey ? order : 'asc'}
              onClick={createSortHandler(headCell.dataKey)}
            >
              {headCell.label}

              {orderBy === headCell.dataKey ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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