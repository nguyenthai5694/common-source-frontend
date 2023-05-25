import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["value", "defaultValue", "format", "onChange", "readOnly", "onError", "shouldDisableDate", "minDate", "maxDate", "disableFuture", "disablePast", "minTime", "maxTime", "minDateTime", "maxDateTime", "minutesStep", "shouldDisableTime", "disableIgnoringDatePartForTimeValidation", "selectedSections", "onSelectedSectionsChange", "unstableFieldRef"];
import { useUtils, useField, applyDefaultDate, useDefaultDates } from '@mui/x-date-pickers/internals';
import { rangeValueManager, rangeFieldValueManager } from '../internal/utils/valueManagers';
import { validateDateTimeRange } from '../internal/hooks/validation/useDateTimeRangeValidation';
export var useDefaultizedTimeRangeFieldProps = function useDefaultizedTimeRangeFieldProps(props) {
  var _props$ampm, _props$disablePast, _props$disableFuture, _props$format, _props$minDateTime, _props$maxDateTime, _props$minDateTime2, _props$maxDateTime2;
  var utils = useUtils();
  var defaultDates = useDefaultDates();
  var ampm = (_props$ampm = props.ampm) != null ? _props$ampm : utils.is12HourCycleInCurrentLocale();
  var defaultFormat = ampm ? utils.formats.keyboardDateTime12h : utils.formats.keyboardDateTime24h;
  return _extends({}, props, {
    disablePast: (_props$disablePast = props.disablePast) != null ? _props$disablePast : false,
    disableFuture: (_props$disableFuture = props.disableFuture) != null ? _props$disableFuture : false,
    format: (_props$format = props.format) != null ? _props$format : defaultFormat,
    minDate: applyDefaultDate(utils, (_props$minDateTime = props.minDateTime) != null ? _props$minDateTime : props.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, (_props$maxDateTime = props.maxDateTime) != null ? _props$maxDateTime : props.maxDate, defaultDates.maxDate),
    minTime: (_props$minDateTime2 = props.minDateTime) != null ? _props$minDateTime2 : props.minTime,
    maxTime: (_props$maxDateTime2 = props.maxDateTime) != null ? _props$maxDateTime2 : props.maxTime,
    disableIgnoringDatePartForTimeValidation: Boolean(props.minDateTime || props.maxDateTime)
  });
};
export var useSingleInputDateTimeRangeField = function useSingleInputDateTimeRangeField(_ref) {
  var props = _ref.props,
    inputRef = _ref.inputRef;
  var _useDefaultizedTimeRa = useDefaultizedTimeRangeFieldProps(props),
    value = _useDefaultizedTimeRa.value,
    defaultValue = _useDefaultizedTimeRa.defaultValue,
    format = _useDefaultizedTimeRa.format,
    onChange = _useDefaultizedTimeRa.onChange,
    readOnly = _useDefaultizedTimeRa.readOnly,
    onError = _useDefaultizedTimeRa.onError,
    shouldDisableDate = _useDefaultizedTimeRa.shouldDisableDate,
    minDate = _useDefaultizedTimeRa.minDate,
    maxDate = _useDefaultizedTimeRa.maxDate,
    disableFuture = _useDefaultizedTimeRa.disableFuture,
    disablePast = _useDefaultizedTimeRa.disablePast,
    minTime = _useDefaultizedTimeRa.minTime,
    maxTime = _useDefaultizedTimeRa.maxTime,
    minDateTime = _useDefaultizedTimeRa.minDateTime,
    maxDateTime = _useDefaultizedTimeRa.maxDateTime,
    minutesStep = _useDefaultizedTimeRa.minutesStep,
    shouldDisableTime = _useDefaultizedTimeRa.shouldDisableTime,
    disableIgnoringDatePartForTimeValidation = _useDefaultizedTimeRa.disableIgnoringDatePartForTimeValidation,
    selectedSections = _useDefaultizedTimeRa.selectedSections,
    onSelectedSectionsChange = _useDefaultizedTimeRa.onSelectedSectionsChange,
    unstableFieldRef = _useDefaultizedTimeRa.unstableFieldRef,
    other = _objectWithoutProperties(_useDefaultizedTimeRa, _excluded);
  return useField({
    inputRef: inputRef,
    forwardedProps: other,
    internalProps: {
      value: value,
      defaultValue: defaultValue,
      format: format,
      onChange: onChange,
      readOnly: readOnly,
      onError: onError,
      shouldDisableDate: shouldDisableDate,
      minDate: minDate,
      maxDate: maxDate,
      disableFuture: disableFuture,
      disablePast: disablePast,
      minTime: minTime,
      maxTime: maxTime,
      minutesStep: minutesStep,
      shouldDisableTime: shouldDisableTime,
      disableIgnoringDatePartForTimeValidation: disableIgnoringDatePartForTimeValidation,
      selectedSections: selectedSections,
      onSelectedSectionsChange: onSelectedSectionsChange,
      unstableFieldRef: unstableFieldRef
    },
    valueManager: rangeValueManager,
    fieldValueManager: rangeFieldValueManager,
    validator: validateDateTimeRange,
    valueType: 'date-time'
  });
};