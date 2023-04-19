import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { TableConfig } from '../datatable/datatable.type';

interface TableToolbarProps {
  numSelected: number;
  tableConfig: TableConfig<any>;
  onSearch?: (e?: any) => void;
}

export default function TableToolbar(props: TableToolbarProps) {
  const { numSelected, tableConfig, onSearch } = props;

  return (
    <div className='table-search'>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant='h6'
          id='tableTitle'
          component='div'
        >
          {tableConfig.headerMiddle && (
            <tableConfig.headerMiddle
              onSearch={(onSearch)}
            />
          )}
        </Typography>

        {/* {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )} */}
      </Toolbar>
    </div>
  );
}
