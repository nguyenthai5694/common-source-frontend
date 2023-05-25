import * as React from 'react';
import { SingleInputDateRangeFieldProps } from './SingleInputDateRangeField.types';
type DateRangeFieldComponent = (<TDate>(props: SingleInputDateRangeFieldProps<TDate> & React.RefAttributes<HTMLInputElement>) => JSX.Element) & {
    propTypes?: any;
    fieldType?: string;
};
declare const SingleInputDateRangeField: DateRangeFieldComponent;
export { SingleInputDateRangeField };
