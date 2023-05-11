import * as React from 'react';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
import { GridPrivateApiPro } from '../../../models/gridApiPro';

export declare const GRID_SKELETON_ROW_ROOT_ID = 'auto-generated-skeleton-row-root';
export declare const useGridLazyLoaderPreProcessors:
  (privateApiRef: React.MutableRefObject<GridPrivateApiPro>,
    props: Pick<DataGridProProcessedProps, 'rowCount' | 'rowsLoadingMode' | 'experimentalFeatures'>
  ) => void;
