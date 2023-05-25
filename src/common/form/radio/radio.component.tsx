import React, { useCallback, useState, useEffect } from 'react'
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { FormControlChildProps, ControlStaticType, SelectOptions } from 'common/form'

export interface RadioProps extends FormControlChildProps {
  options: SelectOptions;

  labelId?: string;

  label?: string;

  /**
   * Default: ''
   */
  value?: string | number;

  /**
   * Default: ''
   */
  className?: string;

  text?: string;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CommonRadio({
  formik,
  options = [],
  id,
  labelId = undefined,
  label,
  name,
  value = '',
  className = '',
  text = '',
  onChange,
  onBlur,
  fmOnChange,
  fmOnBlur,
  status,
}: RadioProps) {
  const [selected, setSelected] = useState('')

  useEffect(() => {
    return () => {
      formik && setSelected(formik.values[`${name}`])
    }
  }, [formik, name])

  const handleChange = useCallback(
    (e) => {
      onChange && onChange(e);

      fmOnChange && fmOnChange(e);
    },
    [onChange, fmOnChange],
  );

  return (
    <>

      <RadioGroup
        row
        aria-labelledby='demo-radio-buttons-group-label'
        defaultValue='female'
        name={name}
      >
        <FormLabel sx={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>{label}: </FormLabel>

        {options && options.map((item) => {
          const isCheck = selected === item.value

          return (<FormControlLabel key={item.value} control={
            <Radio
              checked={isCheck}
              value={item.value}
              onChange={handleChange}
              name={name}
            />
          }
            label={item.label} />)
        })}

      </RadioGroup>
    </>
  )
}

CommonRadio.staticType = ControlStaticType.RADIO;
