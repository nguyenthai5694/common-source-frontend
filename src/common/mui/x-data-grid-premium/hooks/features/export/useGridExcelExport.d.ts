import * as React from 'react';
import { DataGridPremiumProps } from '../../../models/dataGridPremiumProps';
import { GridPrivateApiPremium } from '../../../models/gridApiPremium';
/**
 * @requires useGridColumns (state)
 * @requires useGridFilter (state)
 * @requires useGridSorting (state)
 * @requires useGridSelection (state)
 * @requires useGridParamsApi (method)
 */
export declare const useGridExcelExport:
  (apiRef: React.MutableRefObject<GridPrivateApiPremium>, props: DataGridPremiumProps) => void;
