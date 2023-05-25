/// <reference types="react" />
import { DateOrTimeView } from '@mui/x-date-pickers/models';
import { UseStaticRangePickerParams, UseStaticRangePickerProps } from './useStaticRangePicker.types';
/**
 * Hook managing all the range static pickers:
 * - StaticDateRangePicker
 */
export declare const useStaticRangePicker: <TDate, TView extends DateOrTimeView, TExternalProps extends UseStaticRangePickerProps<TDate, TView, any, TExternalProps>>({ props, valueManager, validator, ref, }: UseStaticRangePickerParams<TDate, TView, TExternalProps>) => {
    renderPicker: () => JSX.Element;
};
