import React from 'react';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import { CellComponentProps } from 'common/blocks/datatable-ui/datatable.type';

export default function TableAction(props: CellComponentProps) {
  return (
    <div className='table-action'>
      <div className='table-action-item' key='table-action-item-edit'>
        <Tooltip title='Edit' onClick={() => props.onActionClick('edit')}>
          <EditIcon sx={{ color: '#2E68FF' }} />
        </Tooltip>
      </div>

      <div className='table-action-item' key='table-action-item-download'>
        <Tooltip title='Download' onClick={() => props.onActionClick('download')}>
          <CloudDownloadIcon sx={{ color: '#0761AD' }} />
        </Tooltip>

      </div>

    </div>
  );
}
