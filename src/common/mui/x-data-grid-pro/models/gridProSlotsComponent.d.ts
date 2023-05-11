import { GridSlotsComponent, UncapitalizedGridSlotsComponent } from '@mui/x-data-grid';
import { UncapitalizeObjectKeys } from '@mui/x-data-grid/internals';
import { GridProIconSlotsComponent } from './gridProIconSlotsComponent';
/**
 * Grid components React prop interface containing all the overridable components
 * for Pro package
 */
export interface GridProSlotsComponent extends GridSlotsComponent, GridProIconSlotsComponent {
}
export interface UncapitalizedGridProSlotsComponent
  extends UncapitalizedGridSlotsComponent, UncapitalizeObjectKeys<GridProIconSlotsComponent> {
}
