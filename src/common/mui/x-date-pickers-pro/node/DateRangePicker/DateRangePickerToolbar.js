"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateRangePickerToolbar = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _styles = require("@mui/material/styles");
var _utils = require("@mui/utils");
var _internals = require("@mui/x-date-pickers/internals");
var _dateRangePickerToolbarClasses = require("./dateRangePickerToolbarClasses");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["value", "rangePosition", "onRangePositionChange", "toolbarFormat", "className"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    container: ['container']
  };
  return (0, _utils.unstable_composeClasses)(slots, _dateRangePickerToolbarClasses.getDateRangePickerToolbarUtilityClass, classes);
};
const DateRangePickerToolbarRoot = (0, _styles.styled)(_internals.PickersToolbar, {
  name: 'MuiDateRangePickerToolbar',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})({
  [`& .${_internals.pickersToolbarClasses.penIconButton}`]: {
    position: 'relative',
    top: 4
  }
});
const DateRangePickerToolbarContainer = (0, _styles.styled)('div', {
  name: 'MuiDateRangePickerToolbar',
  slot: 'Container',
  overridesResolver: (_, styles) => styles.container
})({
  display: 'flex'
});
const DateRangePickerToolbar = /*#__PURE__*/React.forwardRef(function DateRangePickerToolbar(inProps, ref) {
  const utils = (0, _internals.useUtils)();
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiDateRangePickerToolbar'
  });
  const {
      value: [start, end],
      rangePosition,
      onRangePositionChange,
      toolbarFormat,
      className
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const localeText = (0, _internals.useLocaleText)();
  const startDateValue = start ? utils.formatByString(start, toolbarFormat || utils.formats.shortDate) : localeText.start;
  const endDateValue = end ? utils.formatByString(end, toolbarFormat || utils.formats.shortDate) : localeText.end;
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(DateRangePickerToolbarRoot, (0, _extends2.default)({}, other, {
    toolbarTitle: localeText.dateRangePickerToolbarTitle,
    isLandscape: false,
    className: (0, _clsx.default)(className, classes.root),
    ownerState: ownerState,
    ref: ref,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(DateRangePickerToolbarContainer, {
      className: classes.container,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_internals.PickersToolbarButton, {
        variant: start !== null ? 'h5' : 'h6',
        value: startDateValue,
        selected: rangePosition === 'start',
        onClick: () => onRangePositionChange('start')
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Typography.default, {
        variant: "h5",
        children: ["\xA0", '–', "\xA0"]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_internals.PickersToolbarButton, {
        variant: end !== null ? 'h5' : 'h6',
        value: endDateValue,
        selected: rangePosition === 'end',
        onClick: () => onRangePositionChange('end')
      })]
    })
  }));
});
exports.DateRangePickerToolbar = DateRangePickerToolbar;
process.env.NODE_ENV !== "production" ? DateRangePickerToolbar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  classes: _propTypes.default.object,
  /**
   * className applied to the root component.
   */
  className: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  /**
   * If `true`, show the toolbar even in desktop mode.
   * @default `true` for Desktop, `false` for Mobile.
   */
  hidden: _propTypes.default.bool,
  onRangePositionChange: _propTypes.default.func.isRequired,
  rangePosition: _propTypes.default.oneOf(['end', 'start']).isRequired,
  readOnly: _propTypes.default.bool,
  titleId: _propTypes.default.string,
  /**
   * Toolbar date format.
   */
  toolbarFormat: _propTypes.default.string,
  /**
   * Toolbar value placeholder—it is displayed when the value is empty.
   * @default "––"
   */
  toolbarPlaceholder: _propTypes.default.node,
  value: _propTypes.default.arrayOf(_propTypes.default.any).isRequired
} : void 0;