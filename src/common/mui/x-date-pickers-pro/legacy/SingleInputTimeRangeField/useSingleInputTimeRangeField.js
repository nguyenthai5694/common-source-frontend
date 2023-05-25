import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["value", "defaultValue", "format", "onChange", "readOnly", "onError", "minTime", "maxTime", "minutesStep", "shouldDisableTime", "disableFuture", "disablePast", "selectedSections", "onSelectedSectionsChange", "unstableFieldRef"];
import { useUtils, useField } from '@mui/x-date-pickers/internals';
import { rangeValueManager, rangeFieldValueManager } from '../internal/utils/valueManagers';
import { validateTimeRange } from '../internal/hooks/validation/useTimeRangeValidation';
export var useDefaultizedTimeRangeFieldProps = function useDefaultizedTimeRangeFieldProps(props) {
  var _props$ampm, _props$disablePast, _props$disableFuture, _props$format;
  var utils = useUtils();
  var ampm = (_props$ampm = props.ampm) != null ? _props$ampm : utils.is12HourCycleInCurrentLocale();
  var defaultFormat = ampm ? utils.formats.fullTime12h : utils.formats.fullTime24h;
  return _extends({}, props, {
    disablePast: (_props$disablePast = props.disablePast) != null ? _props$disablePast : false,
    disableFuture: (_props$disableFuture = props.disableFuture) != null ? _props$disableFuture : false,
    format: (_props$format = props.format) != null ? _props$format : defaultFormat
  });
};
export var useSingleInputTimeRangeField = function useSingleInputTimeRangeField(_ref) {
  var props = _ref.props,
    inputRef = _ref.inputRef;
  var _useDefaultizedTimeRa = useDefaultizedTimeRangeFieldProps(props),
    value = _useDefaultizedTimeRa.value,
    defaultValue = _useDefaultizedTimeRa.defaultValue,
    format = _useDefaultizedTimeRa.format,
    onChange = _useDefaultizedTimeRa.onChange,
    readOnly = _useDefaultizedTimeRa.readOnly,
    onError = _useDefaultizedTimeRa.onError,
    minTime = _useDefaultizedTimeRa.minTime,
    maxTime = _useDefaultizedTimeRa.maxTime,
    minutesStep = _useDefaultizedTimeRa.minutesStep,
    shouldDisableTime = _useDefaultizedTimeRa.shouldDisableTime,
    disableFuture = _useDefaultizedTimeRa.disableFuture,
    disablePast = _useDefaultizedTimeRa.disablePast,
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
      minTime: minTime,
      maxTime: maxTime,
      minutesStep: minutesStep,
      shouldDisableTime: shouldDisableTime,
      disableFuture: disableFuture,
      disablePast: disablePast,
      selectedSections: selectedSections,
      onSelectedSectionsChange: onSelectedSectionsChange,
      unstableFieldRef: unstableFieldRef
    },
    valueManager: rangeValueManager,
    fieldValueManager: rangeFieldValueManager,
    validator: validateTimeRange,
    valueType: 'time'
  });
};