/* eslint-disable max-len */
import * as React from 'react';
import { DateRangeCalendarProps } from './DateRangeCalendar.types';

type DateRangeCalendarComponent = (<TDate>(props: DateRangeCalendarProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes?: any;
};
declare const DateRangeCalendar: DateRangeCalendarComponent;
export { DateRangeCalendar };
