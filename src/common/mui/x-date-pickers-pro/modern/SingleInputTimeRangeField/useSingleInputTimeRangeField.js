import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["value", "defaultValue", "format", "onChange", "readOnly", "onError", "minTime", "maxTime", "minutesStep", "shouldDisableTime", "disableFuture", "disablePast", "selectedSections", "onSelectedSectionsChange", "unstableFieldRef"];
import { useUtils, useField } from '@mui/x-date-pickers/internals';
import { rangeValueManager, rangeFieldValueManager } from '../internal/utils/valueManagers';
import { validateTimeRange } from '../internal/hooks/validation/useTimeRangeValidation';
export const useDefaultizedTimeRangeFieldProps = props => {
  const utils = useUtils();
  const ampm = props.ampm ?? utils.is12HourCycleInCurrentLocale();
  const defaultFormat = ampm ? utils.formats.fullTime12h : utils.formats.fullTime24h;
  return _extends({}, props, {
    disablePast: props.disablePast ?? false,
    disableFuture: props.disableFuture ?? false,
    format: props.format ?? defaultFormat
  });
};
export const useSingleInputTimeRangeField = ({
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
    valueManager: rangeValueManager,
    fieldValueManager: rangeFieldValueManager,
    validator: validateTimeRange,
    valueType: 'time'
  });
};