import React, { useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { FormControlChildProps, ControlStaticType } from 'common/form'
import { isIE } from 'app/services/navigator'

export interface TextareaProps extends FormControlChildProps {
  value?: string

  placeholder?: string

  defaultValue?: string

  defaultStatus?: undefined | 'valid' | 'inValid' | 'warn'

  defaultMessage?: string

  invalidCharactersMessageKey?: Codes

  /**
   * Default: 1000
   */
  maxLength?: number

  /**
   * Default: false
   */
  require?: boolean

  onFocus?: (e?: any) => void

  className?: string

  width?: number

  idRemainText?: string

  /**
   * Default: true
   */
  autoTrim?: boolean;

  /**
   * default : 4
   */
  rowsNumber?: number
  /**
   * default : 78
   */
  defaultHeightIE?: number;
}

export function Textarea({
  id = undefined,
  name,
  value = '',
  status,
  placeholder,
  disabled = false,
  defaultValue,
  defaultStatus = undefined, // undefined or valid or inValid or warn
  defaultMessage,
  maxLength = 20,
  require = false,
  onFocus = () => undefined,
  onChange,
  onBlur,
  fmOnChange,
  fmOnBlur,
  formik,
  className = '',
  width = 520,
  idRemainText = '',
  autoTrim = true,
  rowsNumber = 4,
  defaultHeightIE = 78,
}: TextareaProps) {
  const [txaValue, setTxaValue] = useState(value || '');
  const [statusCode, changeStatusCode] = useState(defaultStatus)
  const [message, changeMessage] = useState(defaultMessage)
  const [isInputChanged, setInputChangeStatus] = useState(false)
  // IE11の場合のみリサイズを独自に実装する
  const defaultHeight = 78;
  const [height, changeHeight] = useState(defaultHeightIE)
  const inputTimeout = useRef(null)
  const specialStringRef = useRef(null);
  // const preventAddTextRef = useRef(false)

  useEffect(() => {
    if (formik) formik.touched = _.set(formik.touched, name, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!formik) return;
  })

  useEffect(() => {
    setTxaValue(value || '');
  }, [value])

  useEffect(() => {
    if (disabled) {
      setInputChangeStatus(false)
    }
  }, [disabled])

  useEffect(() => {
    changeStatusCode(status)
  }, [status])

  const remainingCharacter = maxLength - (txaValue ? txaValue.length : 0)

  const validate = useCallback(
    (value) => {
      if (status) {
        changeStatusCode(status)
        changeMessage(defaultMessage)

        return
      }

      if (maxLength && value.length > maxLength) {
        // changeStatusCode('inValid')
        // formik && formik.setFieldError(name, `${maxLength}文字入力されています`)
        changeMessage(`${maxLength}文字入力されています`)
      } else if (require && value.length === 0) {
        changeStatusCode('inValid')
        changeMessage('必須項目です')
      } else {
        changeStatusCode('valid')
        changeMessage('valid')
      }
    },
    [status, maxLength, require, defaultMessage],
  )

  const handleChange = useCallback(
    (e) => {
      /* if (preventAddTextRef.current) {
        preventAddTextRef.current = false;

        if (e.currentTarget.value.length < maxLength) return;
      } */

      let currentValue = e.currentTarget.value;

      if (!!specialStringRef.current) {
        specialStringRef.current = null;
      }

      onChange && onChange(e)

      clearTimeout(inputTimeout.current)

      e && e.persist()
      inputTimeout.current = setTimeout(() => {
        fmOnChange && fmOnChange(e)

        if (formik) formik.setFieldTouched(name, true);
      }, 100)

      // Set value directly into formik here because fmOnChange
      // will wait for 100ms(for performance purpose) before running.
      formik && formik.setFieldValue(name, (currentValue || '').slice(0, maxLength));
      validate(currentValue)

      setTxaValue(currentValue)

      if (formik) {
        setInputChangeStatus(true)
      }
    },
    [onChange, validate, maxLength, formik, fmOnChange, name],
  )

  const handleClickItself = useCallback(() => {
    if (txaValue.length > maxLength) {
      setTxaValue(txaValue.slice(0, maxLength));
      formik && _.set(formik.values, name, txaValue.slice(0, maxLength));
    }
  }, [formik, maxLength, name, txaValue]);

  useEffect(() => {
    handleClickItself()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txaValue, maxLength])

  const handleBlur = useCallback(
    (e) => {
      if (e.currentTarget.value.length > maxLength) {
        e.target.value = e.target.value.slice(0, maxLength);
        e.currentTarget.value = e.currentTarget.value.slice(0, maxLength);
      }

      onBlur && onBlur(e)

      fmOnBlur && fmOnBlur(e)

      // cry on IME
      if (txaValue.length > maxLength) {
        setTxaValue(e.target.value);
        formik && _.set(formik.values, name, e.target.value);
      }

      const rawValue = e.target.value || '';
      const value = rawValue.trim();

      if (autoTrim && value !== rawValue) {
        e.target.value = value;
        fmOnChange && fmOnChange(e);
      }

      if (formik) {
        setInputChangeStatus(true)
      }
    },
    [onBlur, formik, autoTrim, fmOnBlur, fmOnChange, maxLength, name, txaValue],
  )

  const shouldShowFormikErrorMessage =
    formik?.getFieldMeta(name).touched &&
    isInputChanged && formik?.getFieldMeta(name).error;

  // IE11の場合のみリサイズを独自に実装する
  const heightChanger = useCallback(
    (e) => {
      const startPageY = e.pageY

      const handleDrag = (e) => {
        const _height = height + e.pageY - startPageY

        changeHeight(defaultHeight < _height ? _height : defaultHeight)
      }
      const handleDragEnd = () => {
        document.removeEventListener('mousemove', handleDrag)
        document.removeEventListener('mouseup', handleDragEnd)
      }

      document.addEventListener('mousemove', handleDrag)
      document.addEventListener('mouseup', handleDragEnd)
    },
    [height],
  )

  // [backspace, left arrow, up arrow, right arrow, down arrow, delete]
  /* const allowedKeyCodes = [8, 37, 38, 39, 40, 46];
  // [a, c, v, x, z]
  const allowedKeyCodesCtrl = [65, 67, 86, 88, 90];
  const handleKeyDown = useCallback(
    (e) => {
      const isAllowed = allowedKeyCodes.includes(e.keyCode)
      const isShortcut = e.ctrlKey && allowedKeyCodesCtrl.includes(e.keyCode)

      preventAddTextRef.current = false;

      if (!isAllowed && !isShortcut && txaValue && maxLength && txaValue.length >= maxLength) {
        preventAddTextRef.current = true;
      }
    },
    [allowedKeyCodes, allowedKeyCodesCtrl, maxLength, txaValue],
  ); */

  return (
    <div
      className={clsx(`p-textarea ${className}`)}
      style={{ width: width + 'px' }}
    >
      <div
        className='p-textarea_wrap'
        style={{ height: isIE ? height + 'px' : 'auto' }}
      >
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={txaValue}
          disabled={disabled}
          className={clsx('p-textarea__field', {
            '-inValid': statusCode === 'inValid' || shouldShowFormikErrorMessage,
            '-warn': statusCode === 'warn',
          })}
          onFocus={onFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onClick={handleClickItself}
          // onKeyDown={handleKeyDown}
          maxLength={maxLength}
          rows={rowsNumber}
        />

        {/*
         IE11の場合のみリサイズを独自に実装する
        */}

        {isIE && (
          <button
            onMouseDown={heightChanger}
            type='button'
            tabIndex={-1}
            className='p-textarea_resize'
          />
        )}
      </div>

      <div className='h-d_flex -justify-between'>
        <div className='h-w-100'>
          {
            (statusCode === 'inValid' || statusCode === 'warn' || shouldShowFormikErrorMessage) ? (
              <div
                className={clsx('p-textarea__message', {
                  '-inValid': statusCode === 'inValid' || shouldShowFormikErrorMessage,
                  '-warn': statusCode === 'warn',
                })}
              >
                {formik ? formik.getFieldMeta(name).error : message}
              </div>
            ) : null}
        </div>

        <div className='p-textarea__counter-wrapper'>
          {!disabled && maxLength && (
            <p
              id={idRemainText}
              className={clsx('p-textarea__counter', {
                '-inValid': txaValue.length > maxLength,
              })}
            >
              残り {remainingCharacter.toLocaleString()} 文字
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

Textarea.staticType = ControlStaticType.TEXTAREA
