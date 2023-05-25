import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["value", "defaultValue", "format", "onChange", "readOnly", "onError", "shouldDisableDate", "minDate", "maxDate", "disableFuture", "disablePast", "selectedSections", "onSelectedSectionsChange", "unstableFieldRef"];
import { useUtils, useDefaultDates, applyDefaultDate, useField } from '@mui/x-date-pickers/internals';
import { rangeValueManager, rangeFieldValueManager } from '../internal/utils/valueManagers';
import { validateDateRange } from '../internal/hooks/validation/useDateRangeValidation';
export const useDefaultizedDateRangeFieldProps = props => {
  const utils = useUtils();
  const defaultDates = useDefaultDates();
  return _extends({}, props, {
    disablePast: props.disablePast ?? false,
    disableFuture: props.disableFuture ?? false,
    format: props.format ?? utils.formats.keyboardDate,
    minDate: applyDefaultDate(utils, props.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, props.maxDate, defaultDates.maxDate)
  });
};
export const useSingleInputDateRangeField = ({
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
    other = _objectWithoutPropertiesLoose(_useDefaultizedDateRa, _excluded);
  return useField({
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
    valueManager: rangeValueManager,
    fieldValueManager: rangeFieldValueManager,
    validator: validateDateRange,
    valueType: 'date'
  });
};