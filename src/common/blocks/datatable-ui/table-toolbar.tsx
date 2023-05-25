import React, { useContext } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { DatatableContext } from './datatable.context';

interface TableToolbarProps {
  onSearch?: (e?: any) => void;
}

export default function TableToolbar({
  onSearch,
}: TableToolbarProps) {
  const { tableConfig } = useContext(DatatableContext);

  return (
    <div className='table-search'>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
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

      </Toolbar>
    </div>
  );
}
