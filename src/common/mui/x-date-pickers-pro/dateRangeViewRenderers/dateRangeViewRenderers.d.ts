/// <reference types="react" />
import { DateOrTimeView } from '@mui/x-date-pickers/models';
import { DateRangeCalendarProps } from '../DateRangeCalendar';
export interface DateRangeViewRendererProps<TDate, TView extends DateOrTimeView> extends DateRangeCalendarProps<TDate> {
    view: TView;
    onViewChange?: (view: TView) => void;
    views: readonly TView[];
}
/**
 * We don't pass all the props down to `DateRangeCalendar`,
 * because otherwise some unwanted props would be passed to the HTML element.
 */
export declare const renderDateRangeViewCalendar: <TDate extends unknown>({ value, defaultValue, onChange, className, classes, disableFuture, disablePast, minDate, maxDate, shouldDisableDate, reduceAnimations, onMonthChange, defaultCalendarMonth, rangePosition, defaultRangePosition, onRangePositionChange, calendars, components, componentsProps, slots, slotProps, loading, renderLoading, disableHighlightToday, readOnly, disabled, showDaysOutsideCurrentMonth, dayOfWeekFormatter, disableAutoMonthSwitching, sx, autoFocus, fixedWeekNumber, disableDragEditing, displayWeekNumber, }: DateRangeViewRendererProps<TDate, any>) => JSX.Element;
