import * as React from 'react';
import { GridStateInitializer } from '@mui/x-data-grid/internals';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
import { GridPrivateApiPro } from '../../../models/gridApiPro';

export declare const columnPinningStateInitializer:
  GridStateInitializer<Pick<DataGridProProcessedProps,
    'pinnedColumns' | 'initialState' | 'disableColumnPinning'>>;
export declare const useGridColumnPinning:
  (apiRef: React.MutableRefObject<GridPrivateApiPro>,
    props: Pick<DataGridProProcessedProps, 'disableColumnPinning' | 'initialState' |
      'pinnedColumns' | 'onPinnedColumnsChange' | 'slotProps' | 'slots'>) => void;
