"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleInputDateRangeField = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _styles = require("@mui/material/styles");
var _utils = require("@mui/base/utils");
var _useSingleInputDateRangeField = require("./useSingleInputDateRangeField");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["slots", "slotProps", "components", "componentsProps"],
  _excluded2 = ["ref", "onPaste", "inputMode", "readOnly"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const SingleInputDateRangeField = /*#__PURE__*/React.forwardRef(function SingleInputDateRangeField(inProps, ref) {
  const themeProps = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiSingleInputDateRangeField'
  });
  const {
      slots,
      slotProps,
      components,
      componentsProps
    } = themeProps,
    other = (0, _objectWithoutPropertiesLoose2.default)(themeProps, _excluded);
  const ownerState = themeProps;
  const TextField = slots?.textField ?? components?.TextField ?? _TextField.default;
  const textFieldProps = (0, _utils.useSlotProps)({
    elementType: TextField,
    externalSlotProps: slotProps?.textField ?? componentsProps?.textField,
    externalForwardedProps: other,
    ownerState
  });
  const _useSingleInputDateRa = (0, _useSingleInputDateRangeField.useSingleInputDateRangeField)({
      props: textFieldProps,
      inputRef: textFieldProps.inputRef
    }),
    {
      ref: inputRef,
      onPaste,
      inputMode,
      readOnly
    } = _useSingleInputDateRa,
    fieldProps = (0, _objectWithoutPropertiesLoose2.default)(_useSingleInputDateRa, _excluded2);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(TextField, (0, _extends2.default)({
    ref: ref
  }, fieldProps, {
    inputProps: (0, _extends2.default)({}, fieldProps.inputProps, {
      ref: inputRef,
      onPaste,
      inputMode,
      readOnly
    })
  }));
});
exports.SingleInputDateRangeField = SingleInputDateRangeField;
SingleInputDateRangeField.fieldType = 'single-input';
process.env.NODE_ENV !== "production" ? SingleInputDateRangeField.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the `input` element is focused during the first mount.
   * @default false
   */
  autoFocus: _propTypes.default.bool,
  className: _propTypes.default.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * @default 'primary'
   */
  color: _propTypes.default.oneOf(['error', 'info', 'primary', 'secondary', 'success', 'warning']),
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
   * If `true`, the component is displayed in focused state.
   */
  focused: _propTypes.default.bool,
  /**
   * Format of the date when rendered in the input(s).
   */
  format: _propTypes.default.string,
  /**
   * Props applied to the [`FormHelperText`](/material-ui/api/form-helper-text/) element.
   */
  FormHelperTextProps: _propTypes.default.object,
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth: _propTypes.default.bool,
  /**
   * The helper text content.
   */
  helperText: _propTypes.default.node,
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel: _propTypes.default.bool,
  /**
   * The id of the `input` element.
   * Use this prop to make `label` and `helperText` accessible for screen readers.
   */
  id: _propTypes.default.string,
  /**
   * Props applied to the [`InputLabel`](/material-ui/api/input-label/) element.
   * Pointer events like `onClick` are enabled if and only if `shrink` is `true`.
   */
  InputLabelProps: _propTypes.default.object,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: _propTypes.default.object,
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](/material-ui/api/filled-input/),
   * [`OutlinedInput`](/material-ui/api/outlined-input/) or [`Input`](/material-ui/api/input/)
   * component depending on the `variant` prop value.
   */
  InputProps: _propTypes.default.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({
    current: _propTypes.default.any.isRequired
  })]),
  /**
   * The label content.
   */
  label: _propTypes.default.node,
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   * @default 'none'
   */
  margin: _propTypes.default.oneOf(['dense', 'none', 'normal']),
  /**
   * Maximal selectable date.
   */
  maxDate: _propTypes.default.any,
  /**
   * Minimal selectable date.
   */
  minDate: _propTypes.default.any,
  /**
   * Name attribute of the `input` element.
   */
  name: _propTypes.default.string,
  onBlur: _propTypes.default.func,
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
  onFocus: _propTypes.default.func,
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
   * If `true`, the label is displayed as required and the `input` element is required.
   * @default false
   */
  required: _propTypes.default.bool,
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
   * The size of the component.
   */
  size: _propTypes.default.oneOf(['medium', 'small']),
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
  style: _propTypes.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  /**
   * The ref object used to imperatively interact with the field.
   */
  unstableFieldRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value: _propTypes.default.arrayOf(_propTypes.default.any),
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: _propTypes.default.oneOf(['filled', 'outlined', 'standard'])
} : void 0;