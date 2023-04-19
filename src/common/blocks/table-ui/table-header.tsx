import * as React from 'react';
import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { TableConfig } from '../datatable/datatable.type';

interface TableHeadProps {
  numSelected: number;
  onRequestSort: (e?: any, e1?: any) => void;
  onSelectAllClick: (e?: any) => void;
  order: 'asc' | 'desc';
  orderBy: string,
  rowCount: number,
  headCells: any,
  checkType?: 'checkbox' | 'radio';
  fixedLastColunm?: boolean;
  tableConfig: TableConfig<any>;
}

export default function EnhancedTableHead({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  headCells,
  checkType,
  fixedLastColunm,
  tableConfig,
}: TableHeadProps) {
  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };

  return (
    <TableHead>
      <TableRow>
        {checkType === 'checkbox' && <TableCell padding='checkbox' className='table-colunm-fixed'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>}

        {checkType === 'radio' && <TableCell padding='checkbox' className='table-colunm-fixed'>
        </TableCell>}

        {headCells.map((headCell, index) => (
          <TableCell
            key={`${headCell.dataKey}-${index}`}
            align={'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.dataKey ? order : false}
            width={headCell.width}
            className={`${fixedLastColunm && index === headCells.length - 1 ? 'colunm-action' : ''} 
            ${tableConfig.fixedColumnNumber > index ? 'table-colunm-fixed' : ''}`}
            sx={tableConfig.fixedColumnNumber - 1 === index ? {
              borderRight: '1px solid #fff',
            } : tableConfig.fixedColumnNumber === index ? {
              borderLeft: 'none !important',
            } : null}
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