import * as React from 'react';
import { GridStateInitializer } from '@mui/x-data-grid-pro/internals';
import { DataGridPremiumProcessedProps } from '../../../models/dataGridPremiumProps';
import { GridPrivateApiPremium } from '../../../models/gridApiPremium';

export declare const cellSelectionStateInitializer:
  GridStateInitializer<Pick<DataGridPremiumProcessedProps, 'unstable_cellSelectionModel' | 'initialState'>>;
export declare const useGridCellSelection:
  (apiRef: React.MutableRefObject<GridPrivateApiPremium>,
    props: Pick<DataGridPremiumProcessedProps,
      'unstable_cellSelection' | 'unstable_cellSelectionModel' | 'unstable_onCellSelectionModelChange' |
      'pagination' | 'paginationMode'>) => void;