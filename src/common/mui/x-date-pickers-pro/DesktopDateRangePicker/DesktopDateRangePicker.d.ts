import * as React from 'react';
import { DesktopDateRangePickerProps } from './DesktopDateRangePicker.types';
type DesktopDateRangePickerComponent = (<TDate>(props: DesktopDateRangePickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes?: any;
};
declare const DesktopDateRangePicker: DesktopDateRangePickerComponent;
export { DesktopDateRangePicker };
