/* eslint-disable max-len */
import { useUtils, useField } from '@mui/x-date-pickers/internals';
import _extends from '@babel/runtime/helpers/esm/extends';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose';
import { validateTimeRange } from '../internal/hooks/validation/useTimeRangeValidation';
import { rangeValueManager, rangeFieldValueManager } from '../internal/utils/valueManagers';

const _excluded = ['value', 'defaultValue', 'format', 'onChange', 'readOnly', 'onError', 'minTime', 'maxTime', 'minutesStep', 'shouldDisableTime', 'disableFuture', 'disablePast', 'selectedSections', 'onSelectedSectionsChange', 'unstableFieldRef'];

export const useDefaultizedTimeRangeFieldProps = props => {
  var _props$ampm, _props$disablePast, _props$disableFuture, _props$format;
  const utils = useUtils();
  const ampm = (_props$ampm = props.ampm) != null ? _props$ampm : utils.is12HourCycleInCurrentLocale();
  const defaultFormat = ampm ? utils.formats.fullTime12h : utils.formats.fullTime24h;

  return _extends({}, props, {
    disablePast: (_props$disablePast = props.disablePast) != null ? _props$disablePast : false,
    disableFuture: (_props$disableFuture = props.disableFuture) != null ? _props$disableFuture : false,
    format: (_props$format = props.format) != null ? _props$format : defaultFormat,
  });
};
export const useSingleInputTimeRangeField = ({
  props,
  inputRef,
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
      unstableFieldRef,
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
      unstableFieldRef,
    },
    valueManager: rangeValueManager,
    fieldValueManager: rangeFieldValueManager,
    validator: validateTimeRange,
    valueType: 'time',
  });
};