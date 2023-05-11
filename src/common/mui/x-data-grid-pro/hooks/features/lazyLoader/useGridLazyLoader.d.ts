import * as React from 'react';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
import { GridPrivateApiPro } from '../../../models/gridApiPro';
/**
 * @requires useGridRows (state)
 * @requires useGridPagination (state)
 * @requires useGridDimensions (method) - can be after
 * @requires useGridScroll (method
 */
export declare const useGridLazyLoader:
  (privateApiRef: React.MutableRefObject<GridPrivateApiPro>,
    props: Pick<DataGridProProcessedProps,
      'onFetchRows' | 'rowsLoadingMode' | 'pagination' | 'paginationMode'
      | 'rowBuffer' | 'experimentalFeatures'>
  ) => void;
