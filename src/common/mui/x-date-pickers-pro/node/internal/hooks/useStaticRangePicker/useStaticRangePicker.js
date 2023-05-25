"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStaticRangePicker = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _styles = require("@mui/material/styles");
var _LocalizationProvider = require("@mui/x-date-pickers/LocalizationProvider");
var _PickersLayout = require("@mui/x-date-pickers/PickersLayout");
var _internals = require("@mui/x-date-pickers/internals");
var _useRangePosition = require("../useRangePosition");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const PickerStaticLayout = (0, _styles.styled)(_PickersLayout.PickersLayout)(({
  theme
}) => ({
  overflow: 'hidden',
  minWidth: _internals.DIALOG_WIDTH,
  backgroundColor: (theme.vars || theme).palette.background.paper
}));

/**
 * Hook managing all the range static pickers:
 * - StaticDateRangePicker
 */
const useStaticRangePicker = ({
  props,
  valueManager,
  validator,
  ref
}) => {
  const {
    localeText,
    slots,
    slotProps,
    className,
    sx,
    displayStaticWrapperAs,
    autoFocus
  } = props;
  const {
    rangePosition,
    onRangePositionChange
  } = (0, _useRangePosition.useRangePosition)(props);
  const {
    layoutProps,
    renderCurrentView
  } = (0, _internals.usePicker)({
    props,
    valueManager,
    validator,
    autoFocusView: autoFocus ?? false,
    additionalViewProps: {
      rangePosition,
      onRangePositionChange
    },
    wrapperVariant: displayStaticWrapperAs
  });
  const Layout = slots?.layout ?? PickerStaticLayout;
  const slotPropsForLayout = (0, _extends2.default)({}, slotProps, {
    toolbar: (0, _extends2.default)({}, slotProps?.toolbar, {
      rangePosition,
      onRangePositionChange
    })
  });
  const renderPicker = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_LocalizationProvider.LocalizationProvider, {
    localeText: localeText,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Layout, (0, _extends2.default)({}, layoutProps, slotProps?.layout, {
      slots: slots,
      slotProps: slotPropsForLayout,
      sx: [...(Array.isArray(sx) ? sx : [sx]), ...(Array.isArray(slotProps?.layout?.sx) ? slotProps.layout.sx : [slotProps?.layout?.sx])],
      className: (0, _clsx.default)(className, slotProps?.layout?.className),
      ref: ref,
      children: renderCurrentView()
    }))
  });
  return {
    renderPicker
  };
};
exports.useStaticRangePicker = useStaticRangePicker;