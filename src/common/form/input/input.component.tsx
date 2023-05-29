/* eslint-disable max-lines */
/* eslint-disable max-len */
/* eslint-disable complexity */
// TODO: separate code into smaller file
import React, { useCallback, useEffect, useRef, useState, MutableRefObject } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import clsx from 'clsx';
import { FormikContextType } from 'formik'
import _ from 'lodash'
import { FormControlChildProps, ControlStaticType } from 'common/form'

export type InputSizes = 'l' | 'm' | 's';

export interface InputProps extends FormControlChildProps {
  id?: string;

  /**
   * Default: ''
   */
  placeholder?: string;

  formik?: FormikContextType<any>;

  /**
   * Default: ''
   */
  value?: string;

  /**
   * Default: ''
   */
  defaultValue?: string;

  /**
   * Default: 'l'
   */
  size?: InputSizes

  /**
   * Default: 520
   */
  width?: number | string;

  /**
   * Default: undefined
   */
  defaultStatus?: undefined | 'valid' | 'inValid' | 'warn';

  /**
   * Default: ''
   */
  defaultMessage?: string | any;

  /**
   * Default: 1000
   */
  maxLength?: number;

  maxWords?: number;

  /**
   * Default: false
   */
  require?: boolean;

  /**
   * Default: false
   */
  isCalendar?: boolean;

  /**
   * Default: false
   */
  isCalendarOpen?: boolean;

  /**
   * Default: false
   */
  readonly?: boolean;

  /**
   * Default: 'text'
   */
  type?: string;

  onFocus?: (e?: any) => void;

  onKeyDown?: (e?: any) => void;

  onClick?: (e?: any) => void;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  onError?: () => void;

  shouldValidate?: boolean;

  className?: string;

  disableAutoComplete?: boolean

  note?: string;

  linkInput?: boolean;

  /**
   * Default: true
   */
  autoTrim?: boolean;

  customInvalidCharacters?: string[];

  invalidCharactersMessageKey?: Codes

  shouldShowError?: boolean;

  /**
   * Whether number of remain character should be displayed.
   * Note: if `disabled` = true or `maxLength` is not provided, this feature will not work.
   *
   * Default: false.
   */
  showRemainChar?: boolean;

  /**
   * Default: false
   */
  allowOnlyNumbersAndSpace?: boolean;

  /**
   * Default: false
   */
  allowOnlyNumber?: boolean;

  inputRef?: MutableRefObject<HTMLInputElement>;

  maxBytes?: number;

  /**
   * Default: false
   */

  allowValidateSpace?: boolean;

  /**
   * Label
   */
  label?: string;

  /**
   * variant
   */
  variant?: 'filled' | 'outlined' | 'standard'

  /**
   * add Icon search for Input
   * isSearch: true | false
   */
  isSearch?: boolean;

  helperText?: string;
}

const InputSize = {
  m: 'medium',
  s: 'small',
}

export function Input({
  id,
  formik,
  placeholder = '',
  disabled = false,
  value = '',
  name,
  fieldName = '',
  defaultValue,
  size = 's',
  width = undefined,
  defaultStatus = undefined, // undefined or valid or inValid or warn
  maxLength = 1000,
  maxWords = undefined,
  onFocus = () => undefined,
  onKeyDown = () => undefined,
  onClick = () => undefined,
  onChange,
  onBlur,
  fmOnChange,
  fmOnBlur,
  isCalendar = false,
  isCalendarOpen = false,
  readonly = false,
  type = 'text',
  status,
  shouldValidate = false,
  className = '',
  disableAutoComplete = false,
  allowOnlyNumbersAndSpace = false,
  allowOnlyNumber = false,
  autoTrim = true,
  customInvalidCharacters = undefined,
  shouldShowError = true,
  showRemainChar = false,
  inputRef,
  label = '',
  variant = 'outlined',
  isSearch = false,
  helperText = '',
}: InputProps) {
  const [txValue, setTxValue] = useState(value || defaultValue)
  const [_status, changeStatus] = useState(status || defaultStatus)
  const [isError, setError] = useState(false)
  const [isInputChanged, setInputChangeStatus] = useState(false)
  const inputTimeout = useRef(null);
  // const preventAddTextRef = useRef(false)

  useEffect(() => {
    // if (formik && !formik.getFieldMeta(name).value) {
    //   formik.touched = _.set(formik.touched, name, false);
    // }

    // formik.setFieldTouched(name, true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    changeStatus(status);
  }, [status])

  useEffect(() => {
    if (formik && !formik.isValid && formik.errors[`${name}`]) {
      setError(true)
    } else setError(false)
  }, [formik, name])

  useEffect(() => {
    setTxValue(value || '');
  }, [value])

  useEffect(() => {
    if (disabled) {
      setInputChangeStatus(false)
    }
  }, [disabled])

  const handleChange = useCallback(
    (e) => {
      onChange && onChange(e);

      clearTimeout(inputTimeout.current);

      fmOnChange && fmOnChange(e);

      setTimeout(() => {
        if (formik) formik.setFieldTouched(name, true);
      });

      setTxValue(e.currentTarget.value)

      if (formik) {
        setInputChangeStatus(true)
      }
    },
    [onChange, formik, fmOnChange, name],
  );

  const handleBlur = useCallback(
    (e) => {
      if (e.currentTarget.value.length > maxLength) {
        e.target.value = e.target.value.slice(0, maxLength);
        e.currentTarget.value = e.currentTarget.value.slice(0, maxLength);
      }

      onBlur && onBlur(e);

      fmOnBlur && fmOnBlur(e);

      if (txValue.length > maxLength) {
        setTxValue(e.target.value);
        formik && _.set(formik.values, name, e.target.value);
      }

      const rawValue = e.target.value || '';
      const newValue = rawValue.trim();

      if (autoTrim && newValue !== rawValue) {
        e.target.value = newValue;
        fmOnChange && fmOnChange(e);
      }

      if (formik) {
        setInputChangeStatus(true)
      }
    },
    [onBlur, formik, fmOnBlur, autoTrim, fmOnChange, maxLength, name, txValue],
  );

  // die hard with IME mode.
  const handleClickItself = useCallback((e) => {
    onClick(e);

    if (txValue.length > maxLength) {
      setTxValue(txValue.slice(0, maxLength));
      formik && _.set(formik.values, name, txValue.slice(0, maxLength));
    }
  }, [onClick, formik, maxLength, name, txValue]);

  // refactor
  const shouldShowFormikErrorMessage =
    (isCalendar && !isCalendarOpen && formik?.getFieldMeta(name).touched) &&
    isInputChanged && formik && formik.getFieldMeta(name).error;

  const isShowRemainChar = showRemainChar && !disabled && maxLength

  return (
    <div
      className={clsx(`p-input ${className}`, {
        '-sizeL': size === 'l',
        '-sizeM': size === 'm',
        '-sizeS': size === 's',
        '-calendar': isCalendar,
        '-inValid': !isCalendarOpen && (_status === 'inValid' || shouldShowFormikErrorMessage) && shouldShowError && !isShowRemainChar,
      })}
      style={{ width: width || '100%' }}
    >

      <TextField
        id={id}
        type={type}
        placeholder={placeholder}
        fullWidth
        label={label}
        name={name}
        onClick={handleClickItself}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
        value={txValue || ''}
        variant={variant || 'outlined'}
        size={InputSize[size] || 'medium'}
        InputProps={isSearch ? {
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        } : {}}
        // helperText={helperText}
        error={isError}
        inputProps={{
          maxLength,
        }}
      />

    </div>
  )
}

Input.staticType = ControlStaticType.INPUT;
