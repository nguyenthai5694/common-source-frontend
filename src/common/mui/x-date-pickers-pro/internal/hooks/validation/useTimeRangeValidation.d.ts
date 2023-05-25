import { Validator, BaseTimeValidationProps, ValidationProps } from '@mui/x-date-pickers/internals';
import { TimeValidationError } from '@mui/x-date-pickers/models';
import { DateRange } from '../../models/range';
export interface TimeRangeComponentValidationProps extends Required<BaseTimeValidationProps> {
}
export declare const validateTimeRange: Validator<DateRange<any>, any, TimeRangeValidationError, TimeRangeComponentValidationProps>;
type TimeRangeValidationErrorValue = TimeValidationError | 'invalidRange' | null;
export type TimeRangeValidationError = [
    TimeRangeValidationErrorValue,
    TimeRangeValidationErrorValue
];
export declare const useDateRangeValidation: <TDate>(props: ValidationProps<TimeRangeValidationError, DateRange<TDate>, TimeRangeComponentValidationProps>) => TimeRangeValidationError;
export {};
