import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
var _styled;
import * as React from 'react';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { getDataGridUtilityClass, gridClasses, GridColumnHeaderTitle } from '@mui/x-data-grid';
import { getAggregationFunctionLabel } from '../hooks/features/aggregation/gridAggregationUtils';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var GridAggregationHeaderRoot = styled(Box, {
  name: 'MuiDataGrid',
  slot: 'AggregationColumnHeader',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.aggregationColumnHeader;
  }
})((_styled = {
  display: 'flex',
  flexDirection: 'column'
}, _defineProperty(_styled, "&.".concat(gridClasses['aggregationColumnHeader--alignRight']), {
  alignItems: 'flex-end'
}), _defineProperty(_styled, "&.".concat(gridClasses['aggregationColumnHeader--alignCenter']), {
  alignItems: 'center'
}), _styled));
var GridAggregationFunctionLabel = styled('div', {
  name: 'MuiDataGrid',
  slot: 'AggregationColumnHeaderLabel',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.aggregationColumnHeaderLabel;
  }
})(function (_ref) {
  var theme = _ref.theme;
  return {
    fontSize: theme.typography.caption.fontSize,
    lineHeight: theme.typography.caption.fontSize,
    marginTop: "calc(-2px - ".concat(theme.typography.caption.fontSize, ")"),
    fontWeight: theme.typography.fontWeightMedium,
    color: (theme.vars || theme).palette.primary.dark,
    textTransform: 'uppercase'
  };
});
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    colDef = ownerState.colDef;
  var slots = {
    root: ['aggregationColumnHeader', colDef.headerAlign === 'left' && 'aggregationColumnHeader--alignLeft', colDef.headerAlign === 'center' && 'aggregationColumnHeader--alignCenter', colDef.headerAlign === 'right' && 'aggregationColumnHeader--alignRight'],
    aggregationLabel: ['aggregationColumnHeaderLabel']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
function GridAggregationHeader(props) {
  var _colDef$headerName;
  var colDef = props.colDef,
    aggregation = props.aggregation;
  var apiRef = useGridApiContext();
  var rootProps = useGridRootProps();
  var ownerState = _extends({}, rootProps, {
    classes: rootProps.classes,
    colDef: colDef
  });
  var classes = useUtilityClasses(ownerState);
  if (!aggregation) {
    return null;
  }
  var aggregationLabel = getAggregationFunctionLabel({
    apiRef: apiRef,
    aggregationRule: aggregation.aggregationRule
  });
  return /*#__PURE__*/_jsxs(GridAggregationHeaderRoot, {
    ownerState: ownerState,
    className: classes.root,
    children: [/*#__PURE__*/_jsx(GridColumnHeaderTitle, {
      label: (_colDef$headerName = colDef.headerName) != null ? _colDef$headerName : colDef.field,
      description: colDef.description,
      columnWidth: colDef.computedWidth
    }), /*#__PURE__*/_jsx(GridAggregationFunctionLabel, {
      ownerState: ownerState,
      className: classes.aggregationLabel,
      children: aggregationLabel
    })]
  });
}
export { GridAggregationHeader };