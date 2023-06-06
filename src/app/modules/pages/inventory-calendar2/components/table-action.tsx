import React from 'react';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import { CellComponentProps } from 'common/blocks/datatable-ui/datatable.type';

export default function TableAction(props: CellComponentProps) {
  return (
    <div className='table-action' key={props.dataItem.id}>
      <div className='table-action-item' key='edit'>
        <Tooltip title='Edit' onClick={() => props.onActionClick('edit')}>
          <EditIcon sx={{ color: '#2E68FF' }} />
        </Tooltip>
      </div>

      <div className='table-action-item' key='download'>
        <Tooltip title='Download' onClick={() => props.onActionClick('download')}>
          <CloudDownloadIcon sx={{ color: '#0761AD' }} />
        </Tooltip>

      </div>

    </div>
  );
}
