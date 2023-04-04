import React, { useState, useCallback } from 'react'
import clsx from 'clsx';
import { FormControlChildProps, ControlStaticType } from 'soumu/form'

export interface CheckboxProps extends FormControlChildProps {
  label?: string;

  value?: string;

  /**
   * If this value is provided, 'checked' state will be controlled by its parent.
   * 
   * Default: undefined
   */
  checked?: boolean;

  /**
   * This property allow client to set initial checked state.
   * 
   * Default: false
   */
  defaultChecked?: boolean;

  className?: string;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox({
  label,
  name,
  value,
  checked,
  defaultChecked = false,
  disabled = false,
  className = '',
  onChange,
  onBlur,
  fmOnChange,
  fmOnBlur,
  status,
}: CheckboxProps) {
  const [innerChecked, setCheckedState] = useState(defaultChecked);

  const handleChange = useCallback(
    (e) => {
      onChange && onChange(e);

      fmOnChange && fmOnChange(e);

      setCheckedState(e.target.checked);
    },
    [onChange, fmOnChange],
  );

  const handleBlur = useCallback(
    (e) => {
      onBlur && onBlur(e);

      fmOnBlur && fmOnBlur(e);
    },
    [onBlur, fmOnBlur],
  );

  const isChecked = checked !== undefined ? checked : innerChecked;

  return (
    <label className={`p-checkbox ${className}`}>
      <input
        value={value}
        name={name}
        className='p-checkbox__input'
        type='checkbox'
        disabled={disabled}
        checked={isChecked}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <span className={clsx('p-checkbox__selectable-input', {
        '-inValid': status === 'inValid',
      })}/>

      {label && (
        <span className='h-ml-8'>{label}</span>
      )}
    </label>
  )
}

Checkbox.staticType = ControlStaticType.CHECKBOX;