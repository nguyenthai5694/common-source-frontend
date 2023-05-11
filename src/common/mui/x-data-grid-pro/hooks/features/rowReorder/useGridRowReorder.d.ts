import * as React from 'react';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
import { GridPrivateApiPro } from '../../../models/gridApiPro';
/**
 * Only available in DataGridPro
 * @requires useGridRows (method)
 */
export declare const useGridRowReorder:
  (apiRef: React.MutableRefObject<GridPrivateApiPro>, props: Pick<DataGridProProcessedProps,
    'rowReordering' | 'onRowOrderChange' | 'classes'>
  ) => void;
