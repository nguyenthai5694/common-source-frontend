/// <reference types="react" />
import { DateOrTimeView } from '@mui/x-date-pickers/models';
import { UseDesktopRangePickerParams, UseDesktopRangePickerProps } from './useDesktopRangePicker.types';
export declare const useDesktopRangePicker: <TDate, TView extends DateOrTimeView, TExternalProps extends UseDesktopRangePickerProps<TDate, TView, any, TExternalProps>>({ props, valueManager, validator, }: UseDesktopRangePickerParams<TDate, TView, TExternalProps>) => {
    renderPicker: () => JSX.Element;
};
