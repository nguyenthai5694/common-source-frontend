import React from 'react'
import clsx from 'clsx'

export default function StarRating({
  score = 0,
  maxScore = 3,
  className = '',
}) {
  return (
    <span className={clsx(`p-star-rating ${className}`, {})}>
      {Array.from(Array(maxScore).keys()).map((_, i) => {
        return (
          <span
            className={clsx('p-star-rating__label', {
              '-active': i < score,
            })}
            key={i}
          >
            ★
          </span>
        )
      })}
    </span>
  )
}
