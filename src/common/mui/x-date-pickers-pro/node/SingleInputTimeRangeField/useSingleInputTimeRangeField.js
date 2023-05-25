"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSingleInputTimeRangeField = exports.useDefaultizedTimeRangeFieldProps = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _internals = require("@mui/x-date-pickers/internals");
var _valueManagers = require("../internal/utils/valueManagers");
var _useTimeRangeValidation = require("../internal/hooks/validation/useTimeRangeValidation");
const _excluded = ["value", "defaultValue", "format", "onChange", "readOnly", "onError", "minTime", "maxTime", "minutesStep", "shouldDisableTime", "disableFuture", "disablePast", "selectedSections", "onSelectedSectionsChange", "unstableFieldRef"];
const useDefaultizedTimeRangeFieldProps = props => {
  const utils = (0, _internals.useUtils)();
  const ampm = props.ampm ?? utils.is12HourCycleInCurrentLocale();
  const defaultFormat = ampm ? utils.formats.fullTime12h : utils.formats.fullTime24h;
  return (0, _extends2.default)({}, props, {
    disablePast: props.disablePast ?? false,
    disableFuture: props.disableFuture ?? false,
    format: props.format ?? defaultFormat
  });
};
exports.useDefaultizedTimeRangeFieldProps = useDefaultizedTimeRangeFieldProps;
const useSingleInputTimeRangeField = ({
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
      minTime,
      maxTime,
      minutesStep,
      shouldDisableTime,
      disableFuture,
      disablePast,
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
      minTime,
      maxTime,
      minutesStep,
      shouldDisableTime,
      disableFuture,
      disablePast,
      selectedSections,
      onSelectedSectionsChange,
      unstableFieldRef
    },
    valueManager: _valueManagers.rangeValueManager,
    fieldValueManager: _valueManagers.rangeFieldValueManager,
    validator: _useTimeRangeValidation.validateTimeRange,
    valueType: 'time'
  });
};
exports.useSingleInputTimeRangeField = useSingleInputTimeRangeField;