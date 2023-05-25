/* eslint-disable max-len */
import * as React from 'react';
import { DateRangePickerProps } from './DateRangePicker.types';

type DatePickerComponent = (<TDate>(props: DateRangePickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes?: any;
};
declare const DateRangePicker: DatePickerComponent;
export { DateRangePicker };
