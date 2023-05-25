/* eslint-disable max-len */
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { styled, useThemeProps } from '@mui/material/styles';
import MuiTextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { uncapitalizeObjectKeys } from '@mui/x-date-pickers/internals';
import { jsx as _jsx } from 'react/jsx-runtime';
import { jsxs as _jsxs } from 'react/jsx-runtime';
import _extends from '@babel/runtime/helpers/esm/extends';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose';
import { useSlotProps } from '@mui/base/utils';
import PropTypes from 'prop-types';
import { useMultiInputDateTimeRangeField } from '../internal/hooks/useMultiInputRangeField/useMultiInputDateTimeRangeField';

const _excluded = ['slots', 'slotProps', 'components', 'componentsProps', 'value', 'defaultValue', 'format', 'onChange', 'readOnly', 'disabled', 'onError', 'shouldDisableDate', 'minDate', 'maxDate', 'minTime', 'maxTime', 'minDateTime', 'maxDateTime', 'minutesStep', 'shouldDisableClock', 'shouldDisableTime', 'disableFuture', 'disablePast', 'selectedSections', 'onSelectedSectionsChange', 'unstableStartFieldRef', 'unstableEndFieldRef', 'autoFocus'],
  _excluded2 = ['onKeyDown', 'ref', 'readOnly', 'inputMode'],
  _excluded3 = ['onKeyDown', 'ref', 'readOnly', 'inputMode'];

const MultiInputDateTimeRangeFieldRoot = styled( /*#__PURE__*/React.forwardRef((props, ref) => /*#__PURE__*/_jsx(Stack, _extends({
  ref,
  spacing: 2,
  direction: 'row',
  alignItems: 'baseline',
}, props))), {
  name: 'MuiMultiInputDateTimeRangeField',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({});
const MultiInputDateTimeRangeFieldSeparator = styled(props => {
  var _props$children;

  return /*#__PURE__*/_jsx(Typography, _extends({}, props, {
    children: (_props$children = props.children) != null ? _props$children : ' — ',
  }));
}, {
  name: 'MuiMultiInputDateTimeRangeField',
  slot: 'Separator',
  overridesResolver: (props, styles) => styles.separator,
})({});
const MultiInputDateTimeRangeField = /*#__PURE__*/React.forwardRef(function MultiInputDateTimeRangeField(inProps, ref) {
  var _slots$root, _slots$textField, _slots$separator;
  const themeProps = useThemeProps({
    props: inProps,
    name: 'MuiMultiInputDateTimeRangeField',
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
    minTime,
    maxTime,
    minDateTime,
    maxDateTime,
    minutesStep,
    shouldDisableClock,
    shouldDisableTime,
    disableFuture,
    disablePast,
    selectedSections,
    onSelectedSectionsChange,
    unstableStartFieldRef,
    unstableEndFieldRef,
    autoFocus,
  } = themeProps,
    other = _objectWithoutPropertiesLoose(themeProps, _excluded);
  const slots = innerSlots != null ? innerSlots : uncapitalizeObjectKeys(components);
  const slotProps = innerSlotProps != null ? innerSlotProps : componentsProps;
  const ownerState = themeProps;
  const Root = (_slots$root = slots == null ? void 0 : slots.root) != null ? _slots$root : MultiInputDateTimeRangeFieldRoot;
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps == null ? void 0 : slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref,
    },
    ownerState,
  });
  const TextField = (_slots$textField = slots == null ? void 0 : slots.textField) != null ? _slots$textField : MuiTextField;
  const startTextFieldProps = useSlotProps({
    elementType: TextField,
    externalSlotProps: slotProps == null ? void 0 : slotProps.textField,
    additionalProps: {
      autoFocus,
    },
    ownerState: _extends({}, ownerState, {
      position: 'start',
    }),
  });
  const endTextFieldProps = useSlotProps({
    elementType: TextField,
    externalSlotProps: slotProps == null ? void 0 : slotProps.textField,
    ownerState: _extends({}, ownerState, {
      position: 'end',
    }),
  });
  const Separator = (_slots$separator = slots == null ? void 0 : slots.separator) != null ? _slots$separator : MultiInputDateTimeRangeFieldSeparator;
  const separatorProps = useSlotProps({
    elementType: Separator,
    externalSlotProps: slotProps == null ? void 0 : slotProps.separator,
    ownerState,
  });
  const _useMultiInputDateTim = useMultiInputDateTimeRangeField({
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
      minTime,
      maxTime,
      minDateTime,
      maxDateTime,
      minutesStep,
      shouldDisableClock,
      shouldDisableTime,
      disableFuture,
      disablePast,
      selectedSections,
      onSelectedSectionsChange,
    },
    startTextFieldProps,
    endTextFieldProps,
    startInputRef: startTextFieldProps.inputRef,
    unstableStartFieldRef,
    endInputRef: endTextFieldProps.inputRef,
    unstableEndFieldRef,
  }),
    {
      startDate: {
        onKeyDown: onStartInputKeyDown,
        ref: startInputRef,
        readOnly: startReadOnly,
        inputMode: startInputMode,
      },
      endDate: {
        onKeyDown: onEndInputKeyDown,
        ref: endInputRef,
        readOnly: endReadOnly,
        inputMode: endInputMode,
      },
    } = _useMultiInputDateTim,
    startDateProps = _objectWithoutPropertiesLoose(_useMultiInputDateTim.startDate, _excluded3),
    endDateProps = _objectWithoutPropertiesLoose(_useMultiInputDateTim.endDate, _excluded2);

  return /*#__PURE__*/_jsxs(Root, _extends({}, rootProps, {
    children: [/*#__PURE__*/_jsx(TextField, _extends({
      fullWidth: true,
    }, startDateProps, {
      inputProps: _extends({}, startDateProps.inputProps, {
        ref: startInputRef,
        readOnly: startReadOnly,
        inputMode: startInputMode,
        onKeyDown: onStartInputKeyDown,
      }),
    })), /*#__PURE__*/_jsx(Separator, _extends({}, separatorProps)), /*#__PURE__*/_jsx(TextField, _extends({
      fullWidth: true,
    }, endDateProps, {
      inputProps: _extends({}, endDateProps.inputProps, {
        ref: endInputRef,
        readOnly: endReadOnly,
        inputMode: endInputMode,
        onKeyDown: onEndInputKeyDown,
      }),
    }))],
  }));
});

process.env.NODE_ENV !== 'production' ? MultiInputDateTimeRangeField.propTypes = {
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
   * Maximal selectable date.
   */
  maxDate: PropTypes.any,
  /**
   * Maximal selectable moment of time with binding to date, to set max time in each day use `maxTime`.
   */
  maxDateTime: PropTypes.any,
  /**
   * Maximal selectable time.
   * The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
   */
  maxTime: PropTypes.any,
  /**
   * Minimal selectable date.
   */
  minDate: PropTypes.any,
  /**
   * Minimal selectable moment of time with binding to date, to set min time in each day use `minTime`.
   */
  minDateTime: PropTypes.any,
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
    startIndex: PropTypes.number.isRequired,
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
   * Disable specific date.
   * @template TDate
   * @param {TDate} day The date to test.
   * @param {string} position The date to test, 'start' or 'end'.
   * @returns {boolean} Returns `true` if the date should be disabled.
   */
  shouldDisableDate: PropTypes.func,
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
   * Overridable component slots.
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
  value: PropTypes.arrayOf(PropTypes.any),
} : void 0;
export { MultiInputDateTimeRangeField };