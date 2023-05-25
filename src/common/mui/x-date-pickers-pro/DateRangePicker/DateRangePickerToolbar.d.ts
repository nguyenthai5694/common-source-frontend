/* eslint-disable max-len */
import * as React from 'react';
import { BaseToolbarProps, ExportedBaseToolbarProps } from '@mui/x-date-pickers/internals';
import { UseRangePositionResponse } from '../internal/hooks/useRangePosition';
import { DateRange } from '../internal/models';
import { DateRangePickerToolbarClasses } from './dateRangePickerToolbarClasses';

export interface DateRangePickerToolbarProps<TDate> extends Omit<BaseToolbarProps<DateRange<TDate>, 'day'>, 'views' | 'view' | 'onViewChange' | 'onChange' | 'isLandscape'>, Pick<UseRangePositionResponse, 'rangePosition' | 'onRangePositionChange'> {
    classes?: Partial<DateRangePickerToolbarClasses>;
}
export interface ExportedDateRangePickerToolbarProps extends ExportedBaseToolbarProps {
}
declare const DateRangePickerToolbar: React.ForwardRefExoticComponent<DateRangePickerToolbarProps<unknown> & React.RefAttributes<HTMLDivElement>>;
export { DateRangePickerToolbar };
