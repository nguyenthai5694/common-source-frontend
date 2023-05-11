import _extends from "@babel/runtime/helpers/esm/extends";
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
const GridAggregationHeaderRoot = styled(Box, {
  name: 'MuiDataGrid',
  slot: 'AggregationColumnHeader',
  overridesResolver: (_, styles) => styles.aggregationColumnHeader
})({
  display: 'flex',
  flexDirection: 'column',
  [`&.${gridClasses['aggregationColumnHeader--alignRight']}`]: {
    alignItems: 'flex-end'
  },
  [`&.${gridClasses['aggregationColumnHeader--alignCenter']}`]: {
    alignItems: 'center'
  }
});
const GridAggregationFunctionLabel = styled('div', {
  name: 'MuiDataGrid',
  slot: 'AggregationColumnHeaderLabel',
  overridesResolver: (_, styles) => styles.aggregationColumnHeaderLabel
})(({
  theme
}) => {
  return {
    fontSize: theme.typography.caption.fontSize,
    lineHeight: theme.typography.caption.fontSize,
    marginTop: `calc(-2px - ${theme.typography.caption.fontSize})`,
    fontWeight: theme.typography.fontWeightMedium,
    color: (theme.vars || theme).palette.primary.dark,
    textTransform: 'uppercase'
  };
});
const useUtilityClasses = ownerState => {
  const {
    classes,
    colDef
  } = ownerState;
  const slots = {
    root: ['aggregationColumnHeader', colDef.headerAlign === 'left' && 'aggregationColumnHeader--alignLeft', colDef.headerAlign === 'center' && 'aggregationColumnHeader--alignCenter', colDef.headerAlign === 'right' && 'aggregationColumnHeader--alignRight'],
    aggregationLabel: ['aggregationColumnHeaderLabel']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};
function GridAggregationHeader(props) {
  var _colDef$headerName;
  const {
    colDef,
    aggregation
  } = props;
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const ownerState = _extends({}, rootProps, {
    classes: rootProps.classes,
    colDef
  });
  const classes = useUtilityClasses(ownerState);
  if (!aggregation) {
    return null;
  }
  const aggregationLabel = getAggregationFunctionLabel({
    apiRef,
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