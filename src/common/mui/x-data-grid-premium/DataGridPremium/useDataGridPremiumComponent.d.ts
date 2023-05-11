import * as React from 'react';
import { DataGridPremiumProcessedProps } from '../models/dataGridPremiumProps';
import { GridApiPremium, GridPrivateApiPremium } from '../models/gridApiPremium';

export declare const useDataGridPremiumComponent: (inputApiRef: React.MutableRefObject<GridApiPremium> |
  undefined, props: DataGridPremiumProcessedProps) => React.MutableRefObject<GridPrivateApiPremium>;
