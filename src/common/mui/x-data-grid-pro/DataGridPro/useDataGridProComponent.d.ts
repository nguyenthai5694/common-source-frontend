import * as React from 'react';
import { DataGridProProcessedProps } from '../models/dataGridProProps';
import { GridApiPro, GridPrivateApiPro } from '../models/gridApiPro';

export declare const useDataGridProComponent:
  (inputApiRef: React.MutableRefObject<GridApiPro> | undefined, props: DataGridProProcessedProps) =>
    React.MutableRefObject<GridPrivateApiPro>;
