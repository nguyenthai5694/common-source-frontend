import React from 'react'
import clsx from 'clsx'

export function StatusItem({ status = 'warn', label = null, value }) {
  return (
    <div
      className={clsx('p-status__item', {
        '-warn': status === 'warn',
      })}
    >
      {label && <dt className='p-status__key'>{label}</dt>}

      <dd className='p-status__value h-text-white-space -pre-wrap'>{value}</dd>
    </div>
  )
}

export default function Status({ className = '', children }) {
  return (
    <dl className={`p-status ${className}`} role='alert'>
      {children}
    </dl>
  )
}
