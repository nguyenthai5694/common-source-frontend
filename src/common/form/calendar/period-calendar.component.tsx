/* eslint-disable max-lines */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react'
import { DateRangePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/node/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { FORMAT_DATE } from 'app/const/common.const';
import { FormControlChildProps } from '../form-control';
import { InputSizes } from '../input/input.component';

export interface PeriodCalendarProps extends FormControlChildProps {
  minDate?: string;

  maxDate?: string;

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

  localText?: string[]
}

export function PeriodCalendar({
  formik,
  size = 's',
  name,
  width = undefined,
  minDate,
  maxDate,
  require = false,
  onChange = (a) => undefined,
  status,
  index = undefined,
  validation = false,
  disabled = false,
  localText,
}: PeriodCalendarProps) {
  /**
   * Event change
   */
  const handleChange = useCallback(
    (e) => {
      onChange && onChange(e);

      //Set Touched
      formik && formik.setFieldTouched(name, true)

      //Set Value
      formik && formik.setFieldValue(name, [
        dayjs(e[0]).format(FORMAT_DATE),
        dayjs(e[1]).format(FORMAT_DATE),
      ])
    },
    [onChange, formik, name],
  );

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
          <DateRangePicker
            localeText={{ start: localText ? localText[0] : undefined, end: localText ? localText[1] : undefined }}
            onChange={handleChange}
            value={formik.values[`${name}`] ?
              [dayjs(formik.values[`${name}`][0]), dayjs(formik.values[`${name}`][1])] : undefined}
            format={FORMAT_DATE}
            minDate={minDate ? dayjs(minDate) : undefined}
            maxDate={maxDate ? dayjs(maxDate) : undefined}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  )
}
