import React, { useCallback, useState, useRef } from 'react'
import clsx from 'clsx';
import { FormControlChildProps, ControlStaticType } from 'soumu/form'

export interface RadioProps extends FormControlChildProps {
  labelId?: string;

  label?: string;

  /**
   * Default: ''
   */
  value?: string | number;

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

  /**
   * Default: ''
   */
  className?: string;

  text?: string;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Radio({
  id,
  labelId = undefined,
  label,
  name,
  value = '',
  disabled = false,
  className = '',
  checked,
  defaultChecked = false,
  text = '',
  onChange,
  onBlur,
  fmOnChange,
  fmOnBlur,
  status,
}: RadioProps) {
  const radioRef = useRef<HTMLInputElement>(null);
  const [innerChecked, setCheckedState] = useState(defaultChecked);
  let isChecked = checked !== undefined ? checked : innerChecked;

  if (radioRef.current && checked === undefined) {
    isChecked = radioRef.current.checked;
  }

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

  // Support for modal
  const handleKeyDown = (e) => {
    const code = e.keyCode ? e.keyCode : e.which;
    const keyCodeEnter = 13;

    if (code === keyCodeEnter) {
      radioRef.current?.click();
    }
  }

  return (
    <label className={`p-radio ${className}`} onKeyDown={handleKeyDown}>
      <input
        id={id}
        ref={radioRef}
        className='p-radio__radio'
        type='radio'
        name={name}
        value={value}
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <span id={labelId} className={clsx('p-radio__text', {
        '-inValid': status === 'inValid',
      })}>{label}</span>

      {text && <span className={clsx('p-radio__aux', {
        '-inValid': status === 'inValid',
      })}>{text}</span>}
    </label>
  )
}

Radio.staticType = ControlStaticType.RADIO;
