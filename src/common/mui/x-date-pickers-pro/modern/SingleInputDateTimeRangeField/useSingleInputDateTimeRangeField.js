import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["value", "defaultValue", "format", "onChange", "readOnly", "onError", "shouldDisableDate", "minDate", "maxDate", "disableFuture", "disablePast", "minTime", "maxTime", "minDateTime", "maxDateTime", "minutesStep", "shouldDisableTime", "disableIgnoringDatePartForTimeValidation", "selectedSections", "onSelectedSectionsChange", "unstableFieldRef"];
import { useUtils, useField, applyDefaultDate, useDefaultDates } from '@mui/x-date-pickers/internals';
import { rangeValueManager, rangeFieldValueManager } from '../internal/utils/valueManagers';
import { validateDateTimeRange } from '../internal/hooks/validation/useDateTimeRangeValidation';
export const useDefaultizedTimeRangeFieldProps = props => {
  const utils = useUtils();
  const defaultDates = useDefaultDates();
  const ampm = props.ampm ?? utils.is12HourCycleInCurrentLocale();
  const defaultFormat = ampm ? utils.formats.keyboardDateTime12h : utils.formats.keyboardDateTime24h;
  return _extends({}, props, {
    disablePast: props.disablePast ?? false,
    disableFuture: props.disableFuture ?? false,
    format: props.format ?? defaultFormat,
    minDate: applyDefaultDate(utils, props.minDateTime ?? props.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, props.maxDateTime ?? props.maxDate, defaultDates.maxDate),
    minTime: props.minDateTime ?? props.minTime,
    maxTime: props.maxDateTime ?? props.maxTime,
    disableIgnoringDatePartForTimeValidation: Boolean(props.minDateTime || props.maxDateTime)
  });
};
export const useSingleInputDateTimeRangeField = ({
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
    other = _objectWithoutPropertiesLoose(_useDefaultizedTimeRa, _excluded);
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
      minTime,
      maxTime,
      minutesStep,
      shouldDisableTime,
      disableIgnoringDatePartForTimeValidation,
      selectedSections,
      onSelectedSectionsChange,
      unstableFieldRef
    },
    valueManager: rangeValueManager,
    fieldValueManager: rangeFieldValueManager,
    validator: validateDateTimeRange,
    valueType: 'date-time'
  });
};