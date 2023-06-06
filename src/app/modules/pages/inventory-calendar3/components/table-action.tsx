import React from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Tooltip from '@mui/material/Tooltip';
import { CellComponentProps } from 'common/blocks/datatable-ui/datatable.type';

export default function TableAction(props: CellComponentProps) {
  return (
    <div className='table-action' key={props.dataItem.id}>
      <div className='table-action-item' key='attachfile'>
        <Tooltip title='Attach File' onClick={() => props.onActionClick('attachfile')}>
          <AttachFileIcon sx={{ color: '#2E68FF' }} />
        </Tooltip>
      </div>
    </div>
  );
}
