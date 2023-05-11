import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import Box from '@mui/material/Box';
import { useGridSelector, gridFilteredDescendantCountLookupSelector, getDataGridUtilityClass } from '@mui/x-data-grid-pro';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['groupingCriteriaCell'],
    toggle: ['groupingCriteriaCellToggle']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
export function GridGroupingCriteriaCell(props) {
  var _filteredDescendantCo, _rootProps$slotProps;
  var id = props.id,
    field = props.field,
    rowNode = props.rowNode,
    hideDescendantCount = props.hideDescendantCount,
    formattedValue = props.formattedValue;
  var rootProps = useGridRootProps();
  var apiRef = useGridApiContext();
  var ownerState = {
    classes: rootProps.classes
  };
  var classes = useUtilityClasses(ownerState);
  var filteredDescendantCountLookup = useGridSelector(apiRef, gridFilteredDescendantCountLookupSelector);
  var filteredDescendantCount = (_filteredDescendantCo = filteredDescendantCountLookup[rowNode.id]) != null ? _filteredDescendantCo : 0;
  var Icon = rowNode.childrenExpanded ? rootProps.slots.groupingCriteriaCollapseIcon : rootProps.slots.groupingCriteriaExpandIcon;
  var handleKeyDown = function handleKeyDown(event) {
    if (event.key === ' ') {
      // We call event.stopPropagation to avoid unfolding the row and also scrolling to bottom
      // TODO: Remove and add a check inside useGridKeyboardNavigation
      event.stopPropagation();
    }
    apiRef.current.publishEvent('cellKeyDown', props, event);
  };
  var handleClick = function handleClick(event) {
    apiRef.current.setRowChildrenExpansion(id, !rowNode.childrenExpanded);
    apiRef.current.setCellFocus(id, field);
    event.stopPropagation();
  };
  var marginLeft = rootProps.rowGroupingColumnMode === 'multiple' ? 0 : rowNode.depth * 2;
  var cellContent;
  var colDef = apiRef.current.getColumn(rowNode.groupingField);
  if (typeof colDef.renderCell === 'function') {
    cellContent = colDef.renderCell(props);
  } else if (typeof formattedValue !== 'undefined') {
    cellContent = /*#__PURE__*/_jsx("span", {
      children: formattedValue
    });
  } else {
    cellContent = /*#__PURE__*/_jsx("span", {
      children: rowNode.groupingKey
    });
  }
  return /*#__PURE__*/_jsxs(Box, {
    className: classes.root,
    sx: {
      ml: marginLeft
    },
    children: [/*#__PURE__*/_jsx("div", {
      className: classes.toggle,
      children: filteredDescendantCount > 0 && /*#__PURE__*/_jsx(rootProps.slots.baseIconButton, _extends({
        size: "small",
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        tabIndex: -1,
        "aria-label": rowNode.childrenExpanded ? apiRef.current.getLocaleText('treeDataCollapse') : apiRef.current.getLocaleText('treeDataExpand')
      }, (_rootProps$slotProps = rootProps.slotProps) == null ? void 0 : _rootProps$slotProps.baseIconButton, {
        children: /*#__PURE__*/_jsx(Icon, {
          fontSize: "inherit"
        })
      }))
    }), cellContent, !hideDescendantCount && filteredDescendantCount > 0 ? /*#__PURE__*/_jsxs("span", {
      style: {
        whiteSpace: 'pre'
      },
      children: [" (", filteredDescendantCount, ")"]
    }) : null]
  });
}