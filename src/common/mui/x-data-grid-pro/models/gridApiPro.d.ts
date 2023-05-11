import { GridApiCommon, GridColumnReorderApi, GridRowMultiSelectionApi, GridRowProApi } from '@mui/x-data-grid';
import { GridPrivateOnlyApiCommon } from '@mui/x-data-grid/internals';
import type { GridColumnPinningApi, GridDetailPanelApi, GridRowPinningApi, GridDetailPanelPrivateApi } from '../hooks';
import { GridInitialStatePro, GridStatePro } from './gridStatePro';
/**
 * The api of `DataGridPro`.
 */
export interface GridApiPro extends GridApiCommon<GridStatePro, GridInitialStatePro>,
  GridRowProApi, GridColumnPinningApi, GridDetailPanelApi, GridRowPinningApi,
  GridRowMultiSelectionApi, GridColumnReorderApi, GridRowProApi {
}
export interface GridPrivateApiPro extends GridApiPro,
  GridPrivateOnlyApiCommon<GridApiPro, GridPrivateApiPro>, GridDetailPanelPrivateApi {
}
