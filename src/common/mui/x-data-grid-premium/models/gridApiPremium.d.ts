import { GridPrivateOnlyApiCommon } from '@mui/x-data-grid/internals';
import {
  GridApiCommon, GridColumnPinningApi, GridDetailPanelApi, GridDetailPanelPrivateApi,
  GridRowPinningApi, GridRowMultiSelectionApi, GridColumnReorderApi, GridRowProApi,
} from 'common/mui/x-data-grid-pro';
import type { GridRowGroupingApi, GridExcelExportApi, GridAggregationApi } from '../hooks';
import { GridCellSelectionApi } from '../hooks/features/cellSelection/gridCellSelectionInterfaces';
import { GridInitialStatePremium, GridStatePremium } from './gridStatePremium';
/**
 * The api of `DataGridPremium`.
 * TODO: Do not redefine manually the pro features
 */
export interface GridApiPremium extends
  GridApiCommon<GridStatePremium, GridInitialStatePremium>, GridRowProApi, GridColumnPinningApi,
  GridDetailPanelApi, GridRowGroupingApi, GridExcelExportApi, GridAggregationApi, GridRowPinningApi,
  GridCellSelectionApi, GridRowMultiSelectionApi, GridColumnReorderApi, GridRowProApi {
}
export interface GridPrivateApiPremium extends
  GridApiPremium, GridPrivateOnlyApiCommon<GridApiPremium, GridPrivateApiPremium>,
  GridDetailPanelPrivateApi {
}
