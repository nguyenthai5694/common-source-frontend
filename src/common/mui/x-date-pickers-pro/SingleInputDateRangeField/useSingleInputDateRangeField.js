/* eslint-disable max-len */
import { useUtils, useDefaultDates, applyDefaultDate, useField } from '@mui/x-date-pickers/internals';
import _extends from '@babel/runtime/helpers/esm/extends';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose';
import { validateDateRange } from '../internal/hooks/validation/useDateRangeValidation';
import { rangeValueManager, rangeFieldValueManager } from '../internal/utils/valueManagers';

const _excluded = ['value', 'defaultValue', 'format', 'onChange', 'readOnly', 'onError', 'shouldDisableDate', 'minDate', 'maxDate', 'disableFuture', 'disablePast', 'selectedSections', 'onSelectedSectionsChange', 'unstableFieldRef'];

export const useDefaultizedDateRangeFieldProps = props => {
  var _props$disablePast, _props$disableFuture, _props$format;
  const utils = useUtils();
  const defaultDates = useDefaultDates();

  return _extends({}, props, {
    disablePast: (_props$disablePast = props.disablePast) != null ? _props$disablePast : false,
    disableFuture: (_props$disableFuture = props.disableFuture) != null ? _props$disableFuture : false,
    format: (_props$format = props.format) != null ? _props$format : utils.formats.keyboardDate,
    minDate: applyDefaultDate(utils, props.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, props.maxDate, defaultDates.maxDate),
  });
};
export const useSingleInputDateRangeField = ({
  props,
  inputRef,
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
      unstableFieldRef,
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
      unstableFieldRef,
    },
    valueManager: rangeValueManager,
    fieldValueManager: rangeFieldValueManager,
    validator: validateDateRange,
    valueType: 'date',
  });
};