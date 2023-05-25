"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSingleInputDateTimeRangeField = exports.useDefaultizedTimeRangeFieldProps = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _internals = require("@mui/x-date-pickers/internals");
var _valueManagers = require("../internal/utils/valueManagers");
var _useDateTimeRangeValidation = require("../internal/hooks/validation/useDateTimeRangeValidation");
const _excluded = ["value", "defaultValue", "format", "onChange", "readOnly", "onError", "shouldDisableDate", "minDate", "maxDate", "disableFuture", "disablePast", "minTime", "maxTime", "minDateTime", "maxDateTime", "minutesStep", "shouldDisableTime", "disableIgnoringDatePartForTimeValidation", "selectedSections", "onSelectedSectionsChange", "unstableFieldRef"];
const useDefaultizedTimeRangeFieldProps = props => {
  const utils = (0, _internals.useUtils)();
  const defaultDates = (0, _internals.useDefaultDates)();
  const ampm = props.ampm ?? utils.is12HourCycleInCurrentLocale();
  const defaultFormat = ampm ? utils.formats.keyboardDateTime12h : utils.formats.keyboardDateTime24h;
  return (0, _extends2.default)({}, props, {
    disablePast: props.disablePast ?? false,
    disableFuture: props.disableFuture ?? false,
    format: props.format ?? defaultFormat,
    minDate: (0, _internals.applyDefaultDate)(utils, props.minDateTime ?? props.minDate, defaultDates.minDate),
    maxDate: (0, _internals.applyDefaultDate)(utils, props.maxDateTime ?? props.maxDate, defaultDates.maxDate),
    minTime: props.minDateTime ?? props.minTime,
    maxTime: props.maxDateTime ?? props.maxTime,
    disableIgnoringDatePartForTimeValidation: Boolean(props.minDateTime || props.maxDateTime)
  });
};
exports.useDefaultizedTimeRangeFieldProps = useDefaultizedTimeRangeFieldProps;
const useSingleInputDateTimeRangeField = ({
  props,
  inputRef
}) => {
  const _useDefaultizedTimeRa = useDefaultizedTimeRangeFieldProps(props),
    {
      value,
      defaultValue,
      format,
      onChange,
      readOnly,
      onError,
      shouldDisableDate,
      minDate,
      maxDate,
      disableFuture,
      disablePast,
      minTime,
      maxTime,
      minutesStep,
      shouldDisableTime,
      disableIgnoringDatePartForTimeValidation,
      selectedSections,
      onSelectedSectionsChange,
      unstableFieldRef
    } = _useDefaultizedTimeRa,
    other = (0, _objectWithoutPropertiesLoose2.default)(_useDefaultizedTimeRa, _excluded);
  return (0, _internals.useField)({
    inputRef,
    forwardedProps: other,
    internalProps: {
      value,
      defaultValue,
      format,
      onChange,
      readOnly,
      onError,
      shouldDisableDate,
      minDate,
      maxDate,
      disableFuture,
      disablePast,
      minTime,
      maxTime,
      minutesStep,
      shouldDisableTime,
      disableIgnoringDatePartForTimeValidation,
      selectedSections,
      onSelectedSectionsChange,
      unstableFieldRef
    },
    valueManager: _valueManagers.rangeValueManager,
    fieldValueManager: _valueManagers.rangeFieldValueManager,
    validator: _useDateTimeRangeValidation.validateDateTimeRange,
    valueType: 'date-time'
  });
};
exports.useSingleInputDateTimeRangeField = useSingleInputDateTimeRangeField;