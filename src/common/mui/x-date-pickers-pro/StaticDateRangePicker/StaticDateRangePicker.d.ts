import * as React from 'react';
import { StaticDateRangePickerProps } from './StaticDateRangePicker.types';
type StaticDateRangePickerComponent = (<TDate>(props: StaticDateRangePickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes?: any;
};
declare const StaticDateRangePicker: StaticDateRangePickerComponent;
export { StaticDateRangePicker };
