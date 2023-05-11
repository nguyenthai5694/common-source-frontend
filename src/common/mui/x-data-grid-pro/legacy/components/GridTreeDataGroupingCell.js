import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import Box from '@mui/material/Box';
import { useGridSelector, gridFilteredDescendantCountLookupSelector, getDataGridUtilityClass } from '@mui/x-data-grid';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['treeDataGroupingCell'],
    toggle: ['treeDataGroupingCellToggle']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
function GridTreeDataGroupingCell(props) {
  var _filteredDescendantCo, _rootProps$slotProps;
  var id = props.id,
    field = props.field,
    formattedValue = props.formattedValue,
    rowNode = props.rowNode,
    hideDescendantCount = props.hideDescendantCount,
    _props$offsetMultipli = props.offsetMultiplier,
    offsetMultiplier = _props$offsetMultipli === void 0 ? 2 : _props$offsetMultipli;
  var rootProps = useGridRootProps();
  var apiRef = useGridApiContext();
  var ownerState = {
    classes: rootProps.classes
  };
  var classes = useUtilityClasses(ownerState);
  var filteredDescendantCountLookup = useGridSelector(apiRef, gridFilteredDescendantCountLookupSelector);
  var filteredDescendantCount = (_filteredDescendantCo = filteredDescendantCountLookup[rowNode.id]) != null ? _filteredDescendantCo : 0;
  var Icon = rowNode.childrenExpanded ? rootProps.slots.treeDataCollapseIcon : rootProps.slots.treeDataExpandIcon;
  var handleClick = function handleClick(event) {
    apiRef.current.setRowChildrenExpansion(id, !rowNode.childrenExpanded);
    apiRef.current.setCellFocus(id, field);
    event.stopPropagation(); // TODO remove event.stopPropagation
  };

  return /*#__PURE__*/_jsxs(Box, {
    className: classes.root,
    sx: {
      ml: rowNode.depth * offsetMultiplier
    },
    children: [/*#__PURE__*/_jsx("div", {
      className: classes.toggle,
      children: filteredDescendantCount > 0 && /*#__PURE__*/_jsx(rootProps.slots.baseIconButton, _extends({
        size: "small",
        onClick: handleClick,
        tabIndex: -1,
        "aria-label": rowNode.childrenExpanded ? apiRef.current.getLocaleText('treeDataCollapse') : apiRef.current.getLocaleText('treeDataExpand')
      }, rootProps == null ? void 0 : (_rootProps$slotProps = rootProps.slotProps) == null ? void 0 : _rootProps$slotProps.baseIconButton, {
        children: /*#__PURE__*/_jsx(Icon, {
          fontSize: "inherit"
        })
      }))
    }), /*#__PURE__*/_jsxs("span", {
      children: [formattedValue === undefined ? rowNode.groupingKey : formattedValue, !hideDescendantCount && filteredDescendantCount > 0 ? " (".concat(filteredDescendantCount, ")") : '']
    })]
  });
}
process.env.NODE_ENV !== "production" ? GridTreeDataGroupingCell.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * GridApi that let you manipulate the grid.
   */
  api: PropTypes.object.isRequired,
  /**
   * The mode of the cell.
   */
  cellMode: PropTypes.oneOf(['edit', 'view']).isRequired,
  /**
   * The column of the row that the current cell belongs to.
   */
  colDef: PropTypes.object.isRequired,
  /**
   * The column field of the cell that triggered the event.
   */
  field: PropTypes.string.isRequired,
  /**
   * A ref allowing to set imperative focus.
   * It can be passed to the element that should receive focus.
   * @ignore - do not document.
   */
  focusElementRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
    current: PropTypes.shape({
      focus: PropTypes.func.isRequired
    })
  })]),
  /**
   * The cell value formatted with the column valueFormatter.
   */
  formattedValue: PropTypes.any,
  /**
   * If true, the cell is the active element.
   */
  hasFocus: PropTypes.bool.isRequired,
  hideDescendantCount: PropTypes.bool,
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /**
   * If true, the cell is editable.
   */
  isEditable: PropTypes.bool,
  /**
   * The cell offset multiplier used for calculating cell offset (`rowNode.depth * offsetMultiplier` px).
   * @default 2
   */
  offsetMultiplier: PropTypes.number,
  /**
   * The row model of the row that the current cell belongs to.
   */
  row: PropTypes.any.isRequired,
  /**
   * The node of the row that the current cell belongs to.
   */
  rowNode: PropTypes.object.isRequired,
  /**
   * the tabIndex value.
   */
  tabIndex: PropTypes.oneOf([-1, 0]).isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: PropTypes.any
} : void 0;
export { GridTreeDataGroupingCell };