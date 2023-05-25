import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["slots", "slotProps", "components", "componentsProps", "value", "defaultValue", "format", "onChange", "readOnly", "disabled", "onError", "minTime", "maxTime", "minutesStep", "shouldDisableClock", "shouldDisableTime", "disableFuture", "disablePast", "selectedSections", "onSelectedSectionsChange", "unstableStartFieldRef", "unstableEndFieldRef", "autoFocus"],
  _excluded2 = ["onKeyDown", "ref", "readOnly", "inputMode"],
  _excluded3 = ["onKeyDown", "ref", "readOnly", "inputMode"];
import * as React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import MuiTextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled, useThemeProps } from '@mui/material/styles';
import { useSlotProps } from '@mui/base/utils';
import { uncapitalizeObjectKeys } from '@mui/x-date-pickers/internals';
import { useMultiInputTimeRangeField } from '../internal/hooks/useMultiInputRangeField/useMultiInputTimeRangeField';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var MultiInputTimeRangeFieldRoot = styled( /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/_jsx(Stack, _extends({
    ref: ref,
    spacing: 2,
    direction: "row",
    alignItems: "baseline"
  }, props));
}), {
  name: 'MuiMultiInputTimeRangeField',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})({});
var MultiInputTimeRangeFieldSeparator = styled(function (props) {
  var _props$children;
  return /*#__PURE__*/_jsx(Typography, _extends({}, props, {
    children: (_props$children = props.children) != null ? _props$children : ' — '
  }));
}, {
  name: 'MuiMultiInputTimeRangeField',
  slot: 'Separator',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.separator;
  }
})({});
var MultiInputTimeRangeField = /*#__PURE__*/React.forwardRef(function MultiInputTimeRangeField(inProps, ref) {
  var _slots$root, _slots$textField, _slots$separator;
  var themeProps = useThemeProps({
    props: inProps,
    name: 'MuiMultiInputTimeRangeField'
  });
  var innerSlots = themeProps.slots,
    innerSlotProps = themeProps.slotProps,
    components = themeProps.components,
    componentsProps = themeProps.componentsProps,
    value = themeProps.value,
    defaultValue = themeProps.defaultValue,
    format = themeProps.format,
    onChange = themeProps.onChange,
    readOnly = themeProps.readOnly,
    disabled = themeProps.disabled,
    onError = themeProps.onError,
    minTime = themeProps.minTime,
    maxTime = themeProps.maxTime,
    minutesStep = themeProps.minutesStep,
    shouldDisableClock = themeProps.shouldDisableClock,
    shouldDisableTime = themeProps.shouldDisableTime,
    disableFuture = themeProps.disableFuture,
    disablePast = themeProps.disablePast,
    selectedSections = themeProps.selectedSections,
    onSelectedSectionsChange = themeProps.onSelectedSectionsChange,
    unstableStartFieldRef = themeProps.unstableStartFieldRef,
    unstableEndFieldRef = themeProps.unstableEndFieldRef,
    autoFocus = themeProps.autoFocus,
    other = _objectWithoutProperties(themeProps, _excluded);
  var slots = innerSlots != null ? innerSlots : uncapitalizeObjectKeys(components);
  var slotProps = innerSlotProps != null ? innerSlotProps : componentsProps;
  var ownerState = themeProps;
  var Root = (_slots$root = slots == null ? void 0 : slots.root) != null ? _slots$root : MultiInputTimeRangeFieldRoot;
  var rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps == null ? void 0 : slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: ref
    },
    ownerState: ownerState
  });
  var TextField = (_slots$textField = slots == null ? void 0 : slots.textField) != null ? _slots$textField : MuiTextField;
  var startTextFieldProps = useSlotProps({
    elementType: TextField,
    externalSlotProps: slotProps == null ? void 0 : slotProps.textField,
    additionalProps: {
      autoFocus: autoFocus
    },
    ownerState: _extends({}, ownerState, {
      position: 'start'
    })
  });
  var endTextFieldProps = useSlotProps({
    elementType: TextField,
    externalSlotProps: slotProps == null ? void 0 : slotProps.textField,
    ownerState: _extends({}, ownerState, {
      position: 'end'
    })
  });
  var Separator = (_slots$separator = slots == null ? void 0 : slots.separator) != null ? _slots$separator : MultiInputTimeRangeFieldSeparator;
  var separatorProps = useSlotProps({
    elementType: Separator,
    externalSlotProps: slotProps == null ? void 0 : slotProps.separator,
    ownerState: ownerState
  });
  var _useMultiInputTimeRan = useMultiInputTimeRangeField({
      sharedProps: {
        value: value,
        defaultValue: defaultValue,
        format: format,
        onChange: onChange,
        readOnly: readOnly,
        disabled: disabled,
        onError: onError,
        minTime: minTime,
        maxTime: maxTime,
        minutesStep: minutesStep,
        shouldDisableClock: shouldDisableClock,
        shouldDisableTime: shouldDisableTime,
        disableFuture: disableFuture,
        disablePast: disablePast,
        selectedSections: selectedSections,
        onSelectedSectionsChange: onSelectedSectionsChange
      },
      startTextFieldProps: startTextFieldProps,
      endTextFieldProps: endTextFieldProps,
      startInputRef: startTextFieldProps.inputRef,
      unstableStartFieldRef: unstableStartFieldRef,
      endInputRef: endTextFieldProps.inputRef,
      unstableEndFieldRef: unstableEndFieldRef
    }),
    _useMultiInputTimeRan2 = _useMultiInputTimeRan.startDate,
    onStartInputKeyDown = _useMultiInputTimeRan2.onKeyDown,
    startInputRef = _useMultiInputTimeRan2.ref,
    startReadOnly = _useMultiInputTimeRan2.readOnly,
    startInputMode = _useMultiInputTimeRan2.inputMode,
    startDateProps = _objectWithoutProperties(_useMultiInputTimeRan2, _excluded2),
    _useMultiInputTimeRan3 = _useMultiInputTimeRan.endDate,
    onEndInputKeyDown = _useMultiInputTimeRan3.onKeyDown,
    endInputRef = _useMultiInputTimeRan3.ref,
    endReadOnly = _useMultiInputTimeRan3.readOnly,
    endInputMode = _useMultiInputTimeRan3.inputMode,
    endDateProps = _objectWithoutProperties(_useMultiInputTimeRan3, _excluded3);
  return /*#__PURE__*/_jsxs(Root, _extends({}, rootProps, {
    children: [/*#__PURE__*/_jsx(TextField, _extends({
      fullWidth: true
    }, startDateProps, {
      inputProps: _extends({}, startDateProps.inputProps, {
        ref: startInputRef,
        readOnly: startReadOnly,
        inputMode: startInputMode,
        onKeyDown: onStartInputKeyDown
      })
    })), /*#__PURE__*/_jsx(Separator, _extends({}, separatorProps)), /*#__PURE__*/_jsx(TextField, _extends({
      fullWidth: true
    }, endDateProps, {
      inputProps: _extends({}, endDateProps.inputProps, {
        ref: endInputRef,
        readOnly: endReadOnly,
        inputMode: endInputMode,
        onKeyDown: onEndInputKeyDown
      })
    }))]
  }));
});
process.env.NODE_ENV !== "production" ? MultiInputTimeRangeField.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * 12h/24h view for hour selection clock.
   * @default `utils.is12HourCycleInCurrentLocale()`
   */
  ampm: PropTypes.bool,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Overridable components.
   * @default {}
   * @deprecated Please use `slots`.
   */
  components: PropTypes.object,
  /**
   * The props used for each component slot.
   * @default {}
   * @deprecated Please use `slotProps`.
   */
  componentsProps: PropTypes.object,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.arrayOf(PropTypes.any),
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction: PropTypes.oneOfType([PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']), PropTypes.arrayOf(PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row'])), PropTypes.object]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, disable values after the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disableFuture: PropTypes.bool,
  /**
   * Do not ignore date part when validating min/max time.
   * @default false
   */
  disableIgnoringDatePartForTimeValidation: PropTypes.bool,
  /**
   * If `true`, disable values before the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disablePast: PropTypes.bool,
  /**
   * Add an element between each child.
   */
  divider: PropTypes.node,
  /**
   * Format of the date when rendered in the input(s).
   */
  format: PropTypes.string,
  /**
   * Maximal selectable time.
   * The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
   */
  maxTime: PropTypes.any,
  /**
   * Minimal selectable time.
   * The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
   */
  minTime: PropTypes.any,
  /**
   * Step over minutes.
   * @default 1
   */
  minutesStep: PropTypes.number,
  /**
   * Callback fired when the value changes.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TValue} value The new value.
   * @param {FieldChangeHandlerContext<TError>} context The context containing the validation result of the current value.
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the error associated to the current value changes.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TError} error The new error.
   * @param {TValue} value The value associated to the error.
   */
  onError: PropTypes.func,
  /**
   * Callback fired when the selected sections change.
   * @param {FieldSelectedSections} newValue The new selected sections.
   */
  onSelectedSectionsChange: PropTypes.func,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   * @default false
   */
  readOnly: PropTypes.bool,
  /**
   * The currently selected sections.
   * This prop accept four formats:
   * 1. If a number is provided, the section at this index will be selected.
   * 2. If an object with a `startIndex` and `endIndex` properties are provided, the sections between those two indexes will be selected.
   * 3. If a string of type `FieldSectionType` is provided, the first section with that name will be selected.
   * 4. If `null` is provided, no section will be selected
   * If not provided, the selected sections will be handled internally.
   */
  selectedSections: PropTypes.oneOfType([PropTypes.oneOf(['all', 'day', 'hours', 'meridiem', 'minutes', 'month', 'seconds', 'weekDay', 'year']), PropTypes.number, PropTypes.shape({
    endIndex: PropTypes.number.isRequired,
    startIndex: PropTypes.number.isRequired
  })]),
  /**
   * Disable specific clock time.
   * @param {number} clockValue The value to check.
   * @param {TimeView} view The clock type of the timeValue.
   * @returns {boolean} If `true` the time will be disabled.
   * @deprecated Consider using `shouldDisableTime`.
   */
  shouldDisableClock: PropTypes.func,
  /**
   * Disable specific time.
   * @param {TDate} value The value to check.
   * @param {TimeView} view The clock type of the timeValue.
   * @returns {boolean} If `true` the time will be disabled.
   */
  shouldDisableTime: PropTypes.func,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: PropTypes.object,
  /**
   * Overridable slots.
   * @default {}
   */
  slots: PropTypes.object,
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])), PropTypes.number, PropTypes.object, PropTypes.string]),
  style: PropTypes.object,
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  unstableEndFieldRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  unstableStartFieldRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value: PropTypes.arrayOf(PropTypes.any)
} : void 0;
export { MultiInputTimeRangeField };