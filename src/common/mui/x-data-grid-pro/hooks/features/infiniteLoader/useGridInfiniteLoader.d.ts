import * as React from 'react';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
import { GridPrivateApiPro } from '../../../models/gridApiPro';
/**
 * @requires useGridColumns (state)
 * @requires useGridDimensions (method) - can be after
 * @requires useGridScroll (method
 */
export declare const useGridInfiniteLoader:
  (apiRef: React.MutableRefObject<GridPrivateApiPro>,
    props: Pick<DataGridProProcessedProps, 'onRowsScrollEnd' |
      'scrollEndThreshold' | 'pagination' | 'paginationMode' | 'rowsLoadingMode'>) => void;
