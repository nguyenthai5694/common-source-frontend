import * as React from 'react';
import { DataGridPremiumProcessedProps } from '../../../models/dataGridPremiumProps';
import { GridPrivateApiPremium } from '../../../models/gridApiPremium';

export declare const useGridAggregationPreProcessors: (apiRef: React.MutableRefObject<GridPrivateApiPremium>,
  props: Pick<DataGridPremiumProcessedProps,
    'aggregationFunctions' | 'disableAggregation' | 'getAggregationPosition' | 'slotProps' | 'slots'>) => void;
