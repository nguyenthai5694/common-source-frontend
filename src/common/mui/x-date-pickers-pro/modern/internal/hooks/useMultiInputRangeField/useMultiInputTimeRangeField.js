import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import useEventCallback from '@mui/utils/useEventCallback';
import { unstable_useTimeField as useTimeField } from '@mui/x-date-pickers/TimeField';
import { useLocalizationContext, useUtils, useValidation } from '@mui/x-date-pickers/internals';
import useControlled from '@mui/utils/useControlled';
import { validateTimeRange } from '../validation/useTimeRangeValidation';
import { rangeValueManager } from '../../utils/valueManagers';
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
export const useMultiInputTimeRangeField = ({
  sharedProps: inSharedProps,
  startTextFieldProps,
  startInputRef,
  unstableStartFieldRef,
  endTextFieldProps,
  endInputRef,
  unstableEndFieldRef
}) => {
  const sharedProps = useDefaultizedTimeRangeFieldProps(inSharedProps);
  const adapter = useLocalizationContext();
  const {
    value: valueProp,
    defaultValue,
    format,
    onChange,
    disabled,
    readOnly
  } = sharedProps;
  const firstDefaultValue = React.useRef(defaultValue);
  const [value, setValue] = useControlled({
    name: 'useMultiInputTimeRangeField',
    state: 'value',
    controlled: valueProp,
    default: firstDefaultValue.current ?? rangeValueManager.emptyValue
  });

  // TODO: Maybe export utility from `useField` instead of copy/pasting the logic
  const buildChangeHandler = index => {
    return (newDate, rawContext) => {
      const newDateRange = index === 0 ? [newDate, value[1]] : [value[0], newDate];
      setValue(newDateRange);
      const context = _extends({}, rawContext, {
        validationError: validateTimeRange({
          adapter,
          value: newDateRange,
          props: sharedProps
        })
      });
      onChange?.(newDateRange, context);
    };
  };
  const handleStartDateChange = useEventCallback(buildChangeHandler(0));
  const handleEndDateChange = useEventCallback(buildChangeHandler(1));
  const validationError = useValidation(_extends({}, sharedProps, {
    value
  }), validateTimeRange, rangeValueManager.isSameError, rangeValueManager.defaultErrorState);
  const startFieldProps = _extends({
    error: !!validationError[0]
  }, startTextFieldProps, {
    format,
    disabled,
    readOnly,
    unstableFieldRef: unstableStartFieldRef,
    value: valueProp === undefined ? undefined : valueProp[0],
    defaultValue: defaultValue === undefined ? undefined : defaultValue[0],
    onChange: handleStartDateChange
  });
  const endFieldProps = _extends({
    error: !!validationError[1]
  }, endTextFieldProps, {
    format,
    disabled,
    readOnly,
    unstableFieldRef: unstableEndFieldRef,
    value: valueProp === undefined ? undefined : valueProp[1],
    defaultValue: defaultValue === undefined ? undefined : defaultValue[1],
    onChange: handleEndDateChange
  });
  const startDateResponse = useTimeField({
    props: startFieldProps,
    inputRef: startInputRef
  });
  const endDateResponse = useTimeField({
    props: endFieldProps,
    inputRef: endInputRef
  });
  return {
    startDate: startDateResponse,
    endDate: endDateResponse
  };
};