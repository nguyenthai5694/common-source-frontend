import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { CellComponentProps } from './datatable.type';

export default function TableAction(props: CellComponentProps) {
  const [buttons] = React.useState(props.buttons ? props.buttons.split(',') : [])

  return (
    <div className='table-action'>
      {buttons.includes('view') && <div className='table-action-item table-action-view'>
        <Tooltip title='View'>
          <IconButton onClick={() => props.onActionClick('view')}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      </div>}

      {buttons.includes('edit') && <div className='table-action-item table-action-edit'>
        <Tooltip title='Edit'>
          <IconButton onClick={() => props.onActionClick('edit')}>
            <EditIcon />
          </IconButton>
        </Tooltip>

      </div>}

      {buttons.includes('delete') && <div className='table-action-item table-action-delete'>
        <Tooltip title='Delete'>
          <IconButton onClick={() => props.onActionClick('delete')}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>

      </div>}

    </div>
  );
}
