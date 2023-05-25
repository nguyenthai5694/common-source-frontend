import * as React from 'react';
import { jsx as _jsx } from 'react/jsx-runtime';
import _extends from '@babel/runtime/helpers/esm/extends';
import PropTypes from 'prop-types';
import { GridGenericColumnMenu, GRID_COLUMN_MENU_SLOTS, GRID_COLUMN_MENU_SLOT_PROPS } from '../../x-data-grid-pro';
import { isGroupingColumn } from '../hooks/features/rowGrouping';
import { GridColumnMenuAggregationItem } from './GridColumnMenuAggregationItem';
import { GridColumnMenuRowGroupItem } from './GridColumnMenuRowGroupItem';
import { GridColumnMenuRowUngroupItem } from './GridColumnMenuRowUngroupItem';

export function GridColumnMenuGroupingItem(props) {
  const {
    colDef,
  } = props;

  if (isGroupingColumn(colDef.field)) {
    return /*#__PURE__*/_jsx(GridColumnMenuRowGroupItem, _extends({}, props));
  }

  if (colDef.groupable) {
    return /*#__PURE__*/_jsx(GridColumnMenuRowUngroupItem, _extends({}, props));
  }

  return null;
}
export const GRID_COLUMN_MENU_SLOTS_PREMIUM = _extends({}, GRID_COLUMN_MENU_SLOTS, {
  columnMenuAggregationItem: GridColumnMenuAggregationItem,
  columnMenuGroupingItem: GridColumnMenuGroupingItem,
});
export const GRID_COLUMN_MENU_SLOT_PROPS_PREMIUM = _extends({}, GRID_COLUMN_MENU_SLOT_PROPS, {
  columnMenuAggregationItem: {
    displayOrder: 23,
  },
  columnMenuGroupingItem: {
    displayOrder: 27,
  },
});
const GridPremiumColumnMenu = /*#__PURE__*/React.forwardRef(function GridPremiumColumnMenuSimple(props, ref) {
  return /*#__PURE__*/_jsx(GridGenericColumnMenu, _extends({
    ref,
  }, props, {
    defaultSlots: GRID_COLUMN_MENU_SLOTS_PREMIUM,
    defaultSlotProps: GRID_COLUMN_MENU_SLOT_PROPS_PREMIUM,
  }));
});

process.env.NODE_ENV !== 'production' ? GridPremiumColumnMenu.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  colDef: PropTypes.object.isRequired,
  hideMenu: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
} : void 0;
export { GridPremiumColumnMenu };