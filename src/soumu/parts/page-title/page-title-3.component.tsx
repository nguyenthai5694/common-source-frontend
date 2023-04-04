import React from 'react'
import clsx from 'clsx'

export default function PageTitle3({ label, styleLevel = 3 }) {
  return (
    <h3
      className={clsx('p-page-title', {
        '-level2': styleLevel === 2,
        '-level3': styleLevel === 3,
        '-level4': styleLevel === 4,
      })}
    >
      {label}
    </h3>
  )
}

