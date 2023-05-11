"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridAggregationHeader = GridAggregationHeader;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/utils");
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _styles = require("@mui/material/styles");
var _xDataGrid = require("@mui/x-data-grid");
var _gridAggregationUtils = require("../hooks/features/aggregation/gridAggregationUtils");
var _useGridApiContext = require("../hooks/utils/useGridApiContext");
var _useGridRootProps = require("../hooks/utils/useGridRootProps");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const GridAggregationHeaderRoot = (0, _styles.styled)(_Box.default, {
  name: 'MuiDataGrid',
  slot: 'AggregationColumnHeader',
  overridesResolver: (_, styles) => styles.aggregationColumnHeader
})({
  display: 'flex',
  flexDirection: 'column',
  [`&.${_xDataGrid.gridClasses['aggregationColumnHeader--alignRight']}`]: {
    alignItems: 'flex-end'
  },
  [`&.${_xDataGrid.gridClasses['aggregationColumnHeader--alignCenter']}`]: {
    alignItems: 'center'
  }
});
const GridAggregationFunctionLabel = (0, _styles.styled)('div', {
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
  return (0, _utils.unstable_composeClasses)(slots, _xDataGrid.getDataGridUtilityClass, classes);
};
function GridAggregationHeader(props) {
  const {
    colDef,
    aggregation
  } = props;
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const ownerState = (0, _extends2.default)({}, rootProps, {
    classes: rootProps.classes,
    colDef
  });
  const classes = useUtilityClasses(ownerState);
  if (!aggregation) {
    return null;
  }
  const aggregationLabel = (0, _gridAggregationUtils.getAggregationFunctionLabel)({
    apiRef,
    aggregationRule: aggregation.aggregationRule
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(GridAggregationHeaderRoot, {
    ownerState: ownerState,
    className: classes.root,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_xDataGrid.GridColumnHeaderTitle, {
      label: colDef.headerName ?? colDef.field,
      description: colDef.description,
      columnWidth: colDef.computedWidth
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(GridAggregationFunctionLabel, {
      ownerState: ownerState,
      className: classes.aggregationLabel,
      children: aggregationLabel
    })]
  });
}