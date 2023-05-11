import * as React from 'react';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
import { GridApiPro } from '../../../models/gridApiPro';

export declare const useGridDetailPanelCache:
  (apiRef: React.MutableRefObject<GridApiPro>,
    props: Pick<DataGridProProcessedProps, 'getDetailPanelContent' | 'getDetailPanelHeight'>
  ) => void;
