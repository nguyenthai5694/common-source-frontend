import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["value", "defaultValue", "format", "onChange", "readOnly", "onError", "shouldDisableDate", "minDate", "maxDate", "disableFuture", "disablePast", "selectedSections", "onSelectedSectionsChange", "unstableFieldRef"];
import { useUtils, useDefaultDates, applyDefaultDate, useField } from '@mui/x-date-pickers/internals';
import { rangeValueManager, rangeFieldValueManager } from '../internal/utils/valueManagers';
import { validateDateRange } from '../internal/hooks/validation/useDateRangeValidation';
export var useDefaultizedDateRangeFieldProps = function useDefaultizedDateRangeFieldProps(props) {
  var _props$disablePast, _props$disableFuture, _props$format;
  var utils = useUtils();
  var defaultDates = useDefaultDates();
  return _extends({}, props, {
    disablePast: (_props$disablePast = props.disablePast) != null ? _props$disablePast : false,
    disableFuture: (_props$disableFuture = props.disableFuture) != null ? _props$disableFuture : false,
    format: (_props$format = props.format) != null ? _props$format : utils.formats.keyboardDate,
    minDate: applyDefaultDate(utils, props.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, props.maxDate, defaultDates.maxDate)
  });
};
export var useSingleInputDateRangeField = function useSingleInputDateRangeField(_ref) {
  var props = _ref.props,
    inputRef = _ref.inputRef;
  var _useDefaultizedDateRa = useDefaultizedDateRangeFieldProps(props),
    value = _useDefaultizedDateRa.value,
    defaultValue = _useDefaultizedDateRa.defaultValue,
    format = _useDefaultizedDateRa.format,
    onChange = _useDefaultizedDateRa.onChange,
    readOnly = _useDefaultizedDateRa.readOnly,
    onError = _useDefaultizedDateRa.onError,
    shouldDisableDate = _useDefaultizedDateRa.shouldDisableDate,
    minDate = _useDefaultizedDateRa.minDate,
    maxDate = _useDefaultizedDateRa.maxDate,
    disableFuture = _useDefaultizedDateRa.disableFuture,
    disablePast = _useDefaultizedDateRa.disablePast,
    selectedSections = _useDefaultizedDateRa.selectedSections,
    onSelectedSectionsChange = _useDefaultizedDateRa.onSelectedSectionsChange,
    unstableFieldRef = _useDefaultizedDateRa.unstableFieldRef,
    other = _objectWithoutProperties(_useDefaultizedDateRa, _excluded);
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
      selectedSections: selectedSections,
      onSelectedSectionsChange: onSelectedSectionsChange,
      unstableFieldRef: unstableFieldRef
    },
    valueManager: rangeValueManager,
    fieldValueManager: rangeFieldValueManager,
    validator: validateDateRange,
    valueType: 'date'
  });
};