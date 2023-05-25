import React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { FormControlChildProps } from 'common/form'

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
  defaultValue,
  value,
  onChange = () => { },
  disabled = false,
  status,
  position,
  overflow = false,
  label = '',
}: SingleCalendarProps) {
  const handChange = (value) => {
    formik.setFieldValue(`${name}`, dayjs(value).format('YYYY/MM/DD'))
  }

  return (
    <div className='single-calendar'>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DatePicker onChange={handChange} label={label} />
      </LocalizationProvider>
    </div>

  )
}
