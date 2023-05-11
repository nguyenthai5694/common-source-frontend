"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDataGridProProps = exports.DATA_GRID_PRO_PROPS_DEFAULT_VALUES = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _styles = require("@mui/material/styles");
var _xDataGrid = require("@mui/x-data-grid");
var _internals = require("@mui/x-data-grid/internals");
var _dataGridProDefaultSlotsComponents = require("../constants/dataGridProDefaultSlotsComponents");
const _excluded = ["components", "componentsProps"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * The default values of `DataGridProPropsWithDefaultValue` to inject in the props of DataGridPro.
 */
const DATA_GRID_PRO_PROPS_DEFAULT_VALUES = (0, _extends2.default)({}, _xDataGrid.DATA_GRID_PROPS_DEFAULT_VALUES, {
  scrollEndThreshold: 80,
  treeData: false,
  defaultGroupingExpansionDepth: 0,
  disableColumnPinning: false,
  keepColumnPositionIfDraggedOutside: false,
  disableChildrenFiltering: false,
  disableChildrenSorting: false,
  rowReordering: false,
  rowsLoadingMode: 'client',
  getDetailPanelHeight: () => 500
});
exports.DATA_GRID_PRO_PROPS_DEFAULT_VALUES = DATA_GRID_PRO_PROPS_DEFAULT_VALUES;
const defaultSlots = (0, _internals.uncapitalizeObjectKeys)(_dataGridProDefaultSlotsComponents.DATA_GRID_PRO_DEFAULT_SLOTS_COMPONENTS);
const useDataGridProProps = inProps => {
  const _useThemeProps = (0, _styles.useThemeProps)({
      props: inProps,
      name: 'MuiDataGrid'
    }),
    {
      components,
      componentsProps
    } = _useThemeProps,
    themedProps = (0, _objectWithoutPropertiesLoose2.default)(_useThemeProps, _excluded);
  const localeText = React.useMemo(() => (0, _extends2.default)({}, _xDataGrid.GRID_DEFAULT_LOCALE_TEXT, themedProps.localeText), [themedProps.localeText]);
  const slots = React.useMemo(() => (0, _internals.computeSlots)({
    defaultSlots,
    slots: themedProps.slots,
    components
  }), [components, themedProps.slots]);
  return React.useMemo(() => (0, _extends2.default)({}, DATA_GRID_PRO_PROPS_DEFAULT_VALUES, themedProps, {
    localeText,
    slots,
    slotProps: themedProps.slotProps ?? componentsProps,
    signature: 'DataGridPro'
  }), [themedProps, localeText, slots, componentsProps]);
};
exports.useDataGridProProps = useDataGridProProps;