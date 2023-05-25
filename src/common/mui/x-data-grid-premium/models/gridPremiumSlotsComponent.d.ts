import { GridProSlotsComponent, UncapitalizedGridProSlotsComponent } from 'common/mui/x-data-grid-pro';
import { UncapitalizeObjectKeys } from 'common/mui/x-data-grid-pro/internals';
import { GridPremiumIconSlotsComponent } from './gridPremiumIconSlotsComponent';
/**
 * Grid components React prop interface containing all the overridable components
 * for Premium package
 */
export interface GridPremiumSlotsComponent extends GridProSlotsComponent, GridPremiumIconSlotsComponent {
}
export interface UncapitalizedGridPremiumSlotsComponent
  extends UncapitalizedGridProSlotsComponent, UncapitalizeObjectKeys<GridPremiumIconSlotsComponent> {
}
