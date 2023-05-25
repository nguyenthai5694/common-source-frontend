"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiInputDateRangeField = void 0;
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
var _useMultiInputDateRangeField = require("../internal/hooks/useMultiInputRangeField/useMultiInputDateRangeField");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["slots", "slotProps", "components", "componentsProps", "value", "defaultValue", "format", "onChange", "readOnly", "disabled", "onError", "shouldDisableDate", "minDate", "maxDate", "disableFuture", "disablePast", "selectedSections", "onSelectedSectionsChange", "autoFocus"],
  _excluded2 = ["onKeyDown", "ref", "readOnly", "inputMode"],
  _excluded3 = ["onKeyDown", "ref", "readOnly", "inputMode"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const MultiInputDateRangeFieldRoot = (0, _styles.styled)( /*#__PURE__*/React.forwardRef((props, ref) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Stack.default, (0, _extends2.default)({
  ref: ref,
  spacing: 2,
  direction: "row",
  alignItems: "baseline"
}, props))), {
  name: 'MuiMultiInputDateRangeField',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({});
const MultiInputDateRangeFieldSeparator = (0, _styles.styled)(props => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, (0, _extends2.default)({}, props, {
  children: props.children ?? ' — '
})), {
  name: 'MuiMultiInputDateRangeField',
  slot: 'Separator',
  overridesResolver: (props, styles) => styles.separator
})({});
const MultiInputDateRangeField = /*#__PURE__*/React.forwardRef(function MultiInputDateRangeField(inProps, ref) {
  const themeProps = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiMultiInputDateRangeField'
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
      shouldDisableDate,
      minDate,
      maxDate,
      disableFuture,
      disablePast,
      selectedSections,
      onSelectedSectionsChange,
      autoFocus
    } = themeProps,
    other = (0, _objectWithoutPropertiesLoose2.default)(themeProps, _excluded);
  const slots = innerSlots ?? (0, _internals.uncapitalizeObjectKeys)(components);
  const slotProps = innerSlotProps ?? componentsProps;
  const ownerState = themeProps;
  const Root = slots?.root ?? MultiInputDateRangeFieldRoot;
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
  const Separator = slots?.separator ?? MultiInputDateRangeFieldSeparator;
  const separatorProps = (0, _utils.useSlotProps)({
    elementType: Separator,
    externalSlotProps: slotProps?.separator ?? componentsProps?.separator,
    ownerState
  });
  const _useMultiInputDateRan = (0, _useMultiInputDateRangeField.useMultiInputDateRangeField)({
      sharedProps: {
        value,
        defaultValue,
        format,
        onChange,
        readOnly,
        disabled,
        onError,
        shouldDisableDate,
        minDate,
        maxDate,
        disableFuture,
        disablePast,
        selectedSections,
        onSelectedSectionsChange
      },
      startTextFieldProps,
      endTextFieldProps,
      startInputRef: startTextFieldProps.inputRef,
      endInputRef: endTextFieldProps.inputRef
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
    } = _useMultiInputDateRan,
    startDateProps = (0, _objectWithoutPropertiesLoose2.default)(_useMultiInputDateRan.startDate, _excluded3),
    endDateProps = (0, _objectWithoutPropertiesLoose2.default)(_useMultiInputDateRan.endDate, _excluded2);
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
exports.MultiInputDateRangeField = MultiInputDateRangeField;
process.env.NODE_ENV !== "production" ? MultiInputDateRangeField.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
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
   * Maximal selectable date.
   */
  maxDate: _propTypes.default.any,
  /**
   * Minimal selectable date.
   */
  minDate: _propTypes.default.any,
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
   * Disable specific date.
   * @template TDate
   * @param {TDate} day The date to test.
   * @param {string} position The date to test, 'start' or 'end'.
   * @returns {boolean} Returns `true` if the date should be disabled.
   */
  shouldDisableDate: _propTypes.default.func,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: _propTypes.default.object,
  /**
   * Overridable component slots.
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