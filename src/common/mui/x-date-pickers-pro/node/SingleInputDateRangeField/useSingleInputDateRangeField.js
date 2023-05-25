"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSingleInputDateRangeField = exports.useDefaultizedDateRangeFieldProps = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _internals = require("@mui/x-date-pickers/internals");
var _valueManagers = require("../internal/utils/valueManagers");
var _useDateRangeValidation = require("../internal/hooks/validation/useDateRangeValidation");
const _excluded = ["value", "defaultValue", "format", "onChange", "readOnly", "onError", "shouldDisableDate", "minDate", "maxDate", "disableFuture", "disablePast", "selectedSections", "onSelectedSectionsChange", "unstableFieldRef"];
const useDefaultizedDateRangeFieldProps = props => {
  const utils = (0, _internals.useUtils)();
  const defaultDates = (0, _internals.useDefaultDates)();
  return (0, _extends2.default)({}, props, {
    disablePast: props.disablePast ?? false,
    disableFuture: props.disableFuture ?? false,
    format: props.format ?? utils.formats.keyboardDate,
    minDate: (0, _internals.applyDefaultDate)(utils, props.minDate, defaultDates.minDate),
    maxDate: (0, _internals.applyDefaultDate)(utils, props.maxDate, defaultDates.maxDate)
  });
};
exports.useDefaultizedDateRangeFieldProps = useDefaultizedDateRangeFieldProps;
const useSingleInputDateRangeField = ({
  props,
  inputRef
}) => {
  const _useDefaultizedDateRa = useDefaultizedDateRangeFieldProps(props),
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
      selectedSections,
      onSelectedSectionsChange,
      unstableFieldRef
    } = _useDefaultizedDateRa,
    other = (0, _objectWithoutPropertiesLoose2.default)(_useDefaultizedDateRa, _excluded);
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
      selectedSections,
      onSelectedSectionsChange,
      unstableFieldRef
    },
    valueManager: _valueManagers.rangeValueManager,
    fieldValueManager: _valueManagers.rangeFieldValueManager,
    validator: _useDateRangeValidation.validateDateRange,
    valueType: 'date'
  });
};
exports.useSingleInputDateRangeField = useSingleInputDateRangeField;