"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiInputTimeRangeField = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Stack = _interopRequireDefault(require("@mui/material/Stack"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _styles = require("@mui/material/styles");
var _utils = require("@mui/base/utils");
var _internals = require("@mui/x-date-pickers/internals");
var _useMultiInputTimeRangeField = require("../internal/hooks/useMultiInputRangeField/useMultiInputTimeRangeField");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["slots", "slotProps", "components", "componentsProps", "value", "defaultValue", "format", "onChange", "readOnly", "disabled", "onError", "minTime", "maxTime", "minutesStep", "shouldDisableClock", "shouldDisableTime", "disableFuture", "disablePast", "selectedSections", "onSelectedSectionsChange", "unstableStartFieldRef", "unstableEndFieldRef", "autoFocus"],
  _excluded2 = ["onKeyDown", "ref", "readOnly", "inputMode"],
  _excluded3 = ["onKeyDown", "ref", "readOnly", "inputMode"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const MultiInputTimeRangeFieldRoot = (0, _styles.styled)( /*#__PURE__*/React.forwardRef((props, ref) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Stack.default, (0, _extends2.default)({
  ref: ref,
  spacing: 2,
  direction: "row",
  alignItems: "baseline"
}, props))), {
  name: 'MuiMultiInputTimeRangeField',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({});
const MultiInputTimeRangeFieldSeparator = (0, _styles.styled)(props => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, (0, _extends2.default)({}, props, {
  children: props.children ?? ' — '
})), {
  name: 'MuiMultiInputTimeRangeField',
  slot: 'Separator',
  overridesResolver: (props, styles) => styles.separator
})({});
const MultiInputTimeRangeField = /*#__PURE__*/React.forwardRef(function MultiInputTimeRangeField(inProps, ref) {
  const themeProps = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiMultiInputTimeRangeField'
  });
  const {
      slots: innerSlots,
      slotProps: innerSlotProps,
      components,
      componentsProps,
      value,
      defaultValue,
      format,
      onChange,
      readOnly,
      disabled,
      onError,
      minTime,
      maxTime,
      minutesStep,
      shouldDisableClock,
      shouldDisableTime,
      disableFuture,
      disablePast,
      selectedSections,
      onSelectedSectionsChange,
      unstableStartFieldRef,
      unstableEndFieldRef,
      autoFocus
    } = themeProps,
    other = (0, _objectWithoutPropertiesLoose2.default)(themeProps, _excluded);
  const slots = innerSlots ?? (0, _internals.uncapitalizeObjectKeys)(components);
  const slotProps = innerSlotProps ?? componentsProps;
  const ownerState = themeProps;
  const Root = slots?.root ?? MultiInputTimeRangeFieldRoot;
  const rootProps = (0, _utils.useSlotProps)({
    elementType: Root,
    externalSlotProps: slotProps?.root,
    externalForwardedProps: other,
    additionalProps: {
      ref
    },
    ownerState
  });
  const TextField = slots?.textField ?? _TextField.default;
  const startTextFieldProps = (0, _utils.useSlotProps)({
    elementType: TextField,
    externalSlotProps: slotProps?.textField,
    additionalProps: {
      autoFocus
    },
    ownerState: (0, _extends2.default)({}, ownerState, {
      position: 'start'
    })
  });
  const endTextFieldProps = (0, _utils.useSlotProps)({
    elementType: TextField,
    externalSlotProps: slotProps?.textField,
    ownerState: (0, _extends2.default)({}, ownerState, {
      position: 'end'
    })
  });
  const Separator = slots?.separator ?? MultiInputTimeRangeFieldSeparator;
  const separatorProps = (0, _utils.useSlotProps)({
    elementType: Separator,
    externalSlotProps: slotProps?.separator,
    ownerState
  });
  const _useMultiInputTimeRan = (0, _useMultiInputTimeRangeField.useMultiInputTimeRangeField)({
      sharedProps: {
        value,
        defaultValue,
        format,
        onChange,
        readOnly,
        disabled,
        onError,
        minTime,
        maxTime,
        minutesStep,
        shouldDisableClock,
        shouldDisableTime,
        disableFuture,
        disablePast,
        selectedSections,
        onSelectedSectionsChange
      },
      startTextFieldProps,
      endTextFieldProps,
      startInputRef: startTextFieldProps.inputRef,
      unstableStartFieldRef,
      endInputRef: endTextFieldProps.inputRef,
      unstableEndFieldRef
    }),
    {
      startDate: {
        onKeyDown: onStartInputKeyDown,
        ref: startInputRef,
        readOnly: startReadOnly,
        inputMode: startInputMode
      },
      endDate: {
        onKeyDown: onEndInputKeyDown,
        ref: endInputRef,
        readOnly: endReadOnly,
        inputMode: endInputMode
      }
    } = _useMultiInputTimeRan,
    startDateProps = (0, _objectWithoutPropertiesLoose2.default)(_useMultiInputTimeRan.startDate, _excluded3),
    endDateProps = (0, _objectWithoutPropertiesLoose2.default)(_useMultiInputTimeRan.endDate, _excluded2);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(Root, (0, _extends2.default)({}, rootProps, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(TextField, (0, _extends2.default)({
      fullWidth: true
    }, startDateProps, {
      inputProps: (0, _extends2.default)({}, startDateProps.inputProps, {
        ref: startInputRef,
        readOnly: startReadOnly,
        inputMode: startInputMode,
        onKeyDown: onStartInputKeyDown
      })
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(Separator, (0, _extends2.default)({}, separatorProps)), /*#__PURE__*/(0, _jsxRuntime.jsx)(TextField, (0, _extends2.default)({
      fullWidth: true
    }, endDateProps, {
      inputProps: (0, _extends2.default)({}, endDateProps.inputProps, {
        ref: endInputRef,
        readOnly: endReadOnly,
        inputMode: endInputMode,
        onKeyDown: onEndInputKeyDown
      })
    }))]
  }));
});
exports.MultiInputTimeRangeField = MultiInputTimeRangeField;
process.env.NODE_ENV !== "production" ? MultiInputTimeRangeField.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * 12h/24h view for hour selection clock.
   * @default `utils.is12HourCycleInCurrentLocale()`
   */
  ampm: _propTypes.default.bool,
  autoFocus: _propTypes.default.bool,
  className: _propTypes.default.string,
  /**
   * Overridable components.
   * @default {}
   * @deprecated Please use `slots`.
   */
  components: _propTypes.default.object,
  /**
   * The props used for each component slot.
   * @default {}
   * @deprecated Please use `slotProps`.
   */
  componentsProps: _propTypes.default.object,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: _propTypes.default.arrayOf(_propTypes.default.any),
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction: _propTypes.default.oneOfType([_propTypes.default.oneOf(['column-reverse', 'column', 'row-reverse', 'row']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['column-reverse', 'column', 'row-reverse', 'row'])), _propTypes.default.object]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,
  /**
   * If `true`, disable values after the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disableFuture: _propTypes.default.bool,
  /**
   * Do not ignore date part when validating min/max time.
   * @default false
   */
  disableIgnoringDatePartForTimeValidation: _propTypes.default.bool,
  /**
   * If `true`, disable values before the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disablePast: _propTypes.default.bool,
  /**
   * Add an element between each child.
   */
  divider: _propTypes.default.node,
  /**
   * Format of the date when rendered in the input(s).
   */
  format: _propTypes.default.string,
  /**
   * Maximal selectable time.
   * The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
   */
  maxTime: _propTypes.default.any,
  /**
   * Minimal selectable time.
   * The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
   */
  minTime: _propTypes.default.any,
  /**
   * Step over minutes.
   * @default 1
   */
  minutesStep: _propTypes.default.number,
  /**
   * Callback fired when the value changes.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TValue} value The new value.
   * @param {FieldChangeHandlerContext<TError>} context The context containing the validation result of the current value.
   */
  onChange: _propTypes.default.func,
  /**
   * Callback fired when the error associated to the current value changes.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TError} error The new error.
   * @param {TValue} value The value associated to the error.
   */
  onError: _propTypes.default.func,
  /**
   * Callback fired when the selected sections change.
   * @param {FieldSelectedSections} newValue The new selected sections.
   */
  onSelectedSectionsChange: _propTypes.default.func,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   * @default false
   */
  readOnly: _propTypes.default.bool,
  /**
   * The currently selected sections.
   * This prop accept four formats:
   * 1. If a number is provided, the section at this index will be selected.
   * 2. If an object with a `startIndex` and `endIndex` properties are provided, the sections between those two indexes will be selected.
   * 3. If a string of type `FieldSectionType` is provided, the first section with that name will be selected.
   * 4. If `null` is provided, no section will be selected
   * If not provided, the selected sections will be handled internally.
   */
  selectedSections: _propTypes.default.oneOfType([_propTypes.default.oneOf(['all', 'day', 'hours', 'meridiem', 'minutes', 'month', 'seconds', 'weekDay', 'year']), _propTypes.default.number, _propTypes.default.shape({
    endIndex: _propTypes.default.number.isRequired,
    startIndex: _propTypes.default.number.isRequired
  })]),
  /**
   * Disable specific clock time.
   * @param {number} clockValue The value to check.
   * @param {TimeView} view The clock type of the timeValue.
   * @returns {boolean} If `true` the time will be disabled.
   * @deprecated Consider using `shouldDisableTime`.
   */
  shouldDisableClock: _propTypes.default.func,
  /**
   * Disable specific time.
   * @param {TDate} value The value to check.
   * @param {TimeView} view The clock type of the timeValue.
   * @returns {boolean} If `true` the time will be disabled.
   */
  shouldDisableTime: _propTypes.default.func,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: _propTypes.default.object,
  /**
   * Overridable slots.
   * @default {}
   */
  slots: _propTypes.default.object,
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])), _propTypes.default.number, _propTypes.default.object, _propTypes.default.string]),
  style: _propTypes.default.object,
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  unstableEndFieldRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
  unstableStartFieldRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value: _propTypes.default.arrayOf(_propTypes.default.any)
} : void 0;