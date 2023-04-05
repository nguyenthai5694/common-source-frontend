import React from 'react'
import clsx from 'clsx'

interface TagProps {
  id?: string;

  label: string;

  /**
   * Default: 'primary'
   */
  theme?: string;

  /**
   * Default: ''
   */
  className?: string;
}

export default function Tag({ id = undefined, label, theme = 'primary', className = '' }: TagProps) {
  return (
    <i
      id={id}
      className={clsx(`p-tag ${className}`, {
        '-primary': theme === 'primary',
        '-primary-60': theme === 'primary-60',
        '-orange': theme === 'orange',
        '-outline-red': theme === 'outline-red',
        '-outline-primary': theme === 'outline-primary',
        '-outline-primary-60': theme === 'outline-primary-60',
        '-outline-green': theme === 'outline-green',
        '-outline-orange': theme === 'outline-orange',
      })}
    >
      {label}
    </i>
  )
}
