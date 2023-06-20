import React, { useCallback, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { FormControlChildProps } from 'common/form'
import { FORMAT_DATE } from 'app/const/common.const';

interface SingleCalendarProps extends FormControlChildProps {
  minDate?: string;

  maxDate?: string;

  /**
   * @deprecated It will be removed later.
   */
  defaultStatus?: undefined | 'valid' | 'inValid' | 'warn';

  defaultValue?: string;

  id?: string;

  disabled?: boolean;

  //default position : 'bottom' so don't need define
  position?: undefined | 'top' | 'right' | 'left';

  overflow?: boolean;

  label?: string
}

export function SingleCalendar({
  id = undefined,
  formik,
  name,
  minDate,
  maxDate,
  value,
  onChange = () => { },
  disabled = false,
  label = '',
}: SingleCalendarProps) {
  const [defaultValue] = useState(formik?.values[name] ? true : false)
  /**
   * Event change
   */
  const handleChange = useCallback(
    (e) => {
      onChange && onChange(e);

      //Set Touched
      formik && formik.setFieldTouched(name, true)

      //Set Value
      formik && formik.setFieldValue(name, dayjs(e).format(FORMAT_DATE))
      // console.log(e);
    },
    [onChange, formik, name],
  );

  /**
   * DatePicker Props config
   */
  const datePickerProps = {
    onChange: handleChange,
    label,
    format: FORMAT_DATE,
    minDate: minDate ? dayjs(minDate) : undefined,
    maxDate: maxDate ? dayjs(maxDate) : undefined,
  } as any

  // Add field value if has defaultValue
  if (defaultValue) datePickerProps.value = dayjs(formik.values[`${name}`])

  return (
    <div className='single-calendar'>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DatePicker
          {...datePickerProps}
        />
      </LocalizationProvider>
    </div>

  )
}
