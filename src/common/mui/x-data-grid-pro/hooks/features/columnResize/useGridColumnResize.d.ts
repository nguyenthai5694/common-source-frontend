import * as React from 'react';
import { GridStateInitializer } from '@mui/x-data-grid/internals';
import { DataGridProProcessedProps } from '../../../models/dataGridProProps';
import { GridPrivateApiPro } from '../../../models/gridApiPro';

export declare const columnResizeStateInitializer: GridStateInitializer;
/**
 * @requires useGridColumns (method, event)
 * TODO: improve experience for last column
 */
export declare const useGridColumnResize:
  (apiRef: React.MutableRefObject<GridPrivateApiPro>,
    props: Pick<DataGridProProcessedProps, 'onColumnResize' | 'onColumnWidthChange'>) => void;