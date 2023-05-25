import * as React from 'react';
import { SingleInputDateTimeRangeFieldProps } from './SingleInputDateTimeRangeField.types';
type DateRangeFieldComponent = (<TDate>(props: SingleInputDateTimeRangeFieldProps<TDate> & React.RefAttributes<HTMLInputElement>) => JSX.Element) & {
    propTypes?: any;
    fieldType?: string;
};
declare const SingleInputDateTimeRangeField: DateRangeFieldComponent;
export { SingleInputDateTimeRangeField };
