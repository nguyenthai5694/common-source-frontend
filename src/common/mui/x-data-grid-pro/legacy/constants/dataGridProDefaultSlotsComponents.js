import _extends from "@babel/runtime/helpers/esm/extends";
import { DATA_GRID_DEFAULT_SLOTS_COMPONENTS } from '@mui/x-data-grid/internals';
import { GridProColumnMenu } from '../components/GridProColumnMenu';
import { GridColumnHeaders } from '../components/GridColumnHeaders';
import materialSlots from '../material';
export var DATA_GRID_PRO_DEFAULT_SLOTS_COMPONENTS = _extends({}, DATA_GRID_DEFAULT_SLOTS_COMPONENTS, materialSlots, {
  ColumnMenu: GridProColumnMenu,
  ColumnHeaders: GridColumnHeaders
});