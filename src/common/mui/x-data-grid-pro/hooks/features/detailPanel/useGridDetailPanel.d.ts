import * as React from 'react';
import { GridStateInitializer } from '@mui/x-data-grid/internals';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
import { GridPrivateApiPro } from '../../../models/gridApiPro';

export declare const detailPanelStateInitializer:
  GridStateInitializer<Pick<DataGridProProcessedProps, 'initialState' | 'detailPanelExpandedRowIds'>>;
export declare const useGridDetailPanel:
  (apiRef: React.MutableRefObject<GridPrivateApiPro>,
    props: Pick<DataGridProProcessedProps,
      'getDetailPanelContent' | 'getDetailPanelHeight' |
      'detailPanelExpandedRowIds' | 'onDetailPanelExpandedRowIdsChange'>
  ) => void;
