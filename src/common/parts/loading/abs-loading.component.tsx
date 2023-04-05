import React from 'react'

export function AbsLoading() {
  return (
    <div className='p-loading -abs'>
      <div className='p-loading__indicator -size-sm'>
        <p className='p-loading__text' role='alert' aria-busy='true'>
          Loading...
        </p>
      </div>
    </div>
  )
}
