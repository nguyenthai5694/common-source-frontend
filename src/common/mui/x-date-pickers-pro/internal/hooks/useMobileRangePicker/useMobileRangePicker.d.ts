/// <reference types="react" />
import { DateOrTimeView } from '@mui/x-date-pickers/models';
import { UseMobileRangePickerParams, UseMobileRangePickerProps } from './useMobileRangePicker.types';
export declare const useMobileRangePicker: <TDate, TView extends DateOrTimeView, TExternalProps extends UseMobileRangePickerProps<TDate, TView, any, TExternalProps>>({ props, valueManager, validator, }: UseMobileRangePickerParams<TDate, TView, TExternalProps>) => {
    renderPicker: () => JSX.Element;
};
