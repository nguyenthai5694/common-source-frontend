import React from 'react'
import clsx from 'clsx';

export default function MessageBar({ status, label, color = '', message1 = '', message2 = '' }) {
  return (
    <div
      className={clsx('p-message-bar h-d_flex', {
        '-valid': status === 'valid',
        '-inValid': status === 'inValid',
        '-warn': status === 'warn',
      })}
    >
      <p className='p-message-bar__label'>{label}</p>

      <div
        className={clsx('p-message-bar__body', {
          '-black': color === 'black',
        })}
      >
        <div>{message1}</div>

        <div className='h-mt-10'>{message2}</div>
      </div>
    </div>
  )
}
