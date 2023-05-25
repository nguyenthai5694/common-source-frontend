import React, { useState, useCallback, useEffect } from 'react'
import { Checkbox, FormControlLabel } from '@mui/material';
import { FormControlChildProps, ControlStaticType, SelectOptions } from 'common/form'

export interface CheckboxProps extends FormControlChildProps {
  options: SelectOptions;

  label?: string;

  value?: string;

  className?: string;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CommonCheckbox({
  formik,
  options = [],
  label,
  name,
  disabled = false,
  className = '',
  onChange,
  onBlur,
}: CheckboxProps) {
  const [values, setValues] = useState([])

  useEffect(() => {
    return () => {
      formik && setValues(formik.values[`${name}`])
    }
  }, [formik, name])

  const handleChange = useCallback(
    (e) => {
      let newValue = values
      const currentValue = e.target.value
      const currentChecked = e.target.checked

      if (currentChecked && !values.includes(currentValue)) {
        newValue.push(currentValue)
      } else if (!currentChecked && values.includes(currentValue)) {
        newValue = newValue.filter(item => item !== currentValue)
      }

      formik && formik.setFieldValue(name, newValue)

      setValues(newValue)

      // onChange && onChange(e);

      // fmOnChange && fmOnChange(e);

      // setCheckedState(e.target.checked);
    },
    [formik, name, values],
  );

  // const handleBlur = useCallback(
  //   (e) => {
  //     onBlur && onBlur(e);

  //     fmOnBlur && fmOnBlur(e);
  //   },
  //   [onBlur, fmOnBlur],
  // );

  return (
    <>
      <label style={{ marginRight: 15 }}>{label}:</label>

      {options && options.map((item) => {
        const isCheck = values.includes(item.value)

        return (<FormControlLabel key={item.value} control={
          <Checkbox
            checked={isCheck}
            value={item.value}
            onChange={handleChange}
            name={name}
          />
        }
          label={item.label} />)
      })}

    </>
  )
}

CommonCheckbox.staticType = ControlStaticType.CHECKBOX;