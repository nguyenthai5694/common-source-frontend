/* eslint-disable max-lines */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import clsx from 'clsx';
import { DateRangePicker, LocalizationProvider } from 'common/mui/x-date-pickers-pro';
import { AdapterDayjs } from 'common/mui/x-date-pickers-pro/node/AdapterDayjs';
import { FormControlChildProps } from '../form-control';
import { InputSizes } from '../input/input.component';

export interface PeriodCalendarProps extends FormControlChildProps {
  minDate?: string;

  maxDate?: string;

  defaultStatus?: undefined | 'valid' | 'inValid' | 'warn';

  defaultMessage?: string;

  defaultFromValue?: string;
  defaultToValue?: string;
  require?: boolean;

  width?: number;

  size?: InputSizes;

  /**
   * Use this props when use array field formik
   */
  index?: number,

  /**
   * Use this props when use schema validation of Yup
   * Default false
   */
  validation?: boolean

  disabled?: boolean;
}

export const DATE_INVALID = '日付のフォーマットが異なります。'

// eslint-disable-next-line complexity
export function PeriodCalendar({
  formik,
  size = 's',
  name,
  width = undefined,
  defaultFromValue,
  defaultToValue,
  minDate,
  maxDate,
  defaultStatus,
  defaultMessage,
  require = false,
  onChange = (a) => undefined,
  value,
  status,
  index = undefined,
  validation = false,
  disabled = false,
}: PeriodCalendarProps) {
  return (
    <div
      className={clsx('period-calendar ', {
        '-sizeL': size === 'l',
        '-sizeM': size === 'm',
        '-sizeS': size === 's',
      })}
      style={{ width: width || '100%' }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>

        <DemoContainer components={['DateRangePicker']}>
          <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  )
}
