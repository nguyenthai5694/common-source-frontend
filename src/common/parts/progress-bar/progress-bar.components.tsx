import React from 'react'

export default function ProgressBar({
  className = '',
  label = 'ダウンロード',
  defaultMessage = '',
  errorMessage = '',
  value = 0,
  defaultStatus = 'valid',
}) {
  return (
    <div className={`p-progress-bar ${className}`}>
      {defaultStatus === 'valid' ? (
        <>
          <p className='p-progress-bar__message'>{defaultMessage}</p>

          <progress
            aria-label={label}
            className='p-progress-bar__control'
            max={100}
            value={value}
          >
            {label}:

            {value}%
          </progress>
        </>
      ) : (
        <>
          <p className='p-progress-bar__message -inValid' role='alert'>
            {errorMessage}
          </p>

          <div className='p-progress-bar__control -inValid' />
        </>
      )}
    </div>
  )
}