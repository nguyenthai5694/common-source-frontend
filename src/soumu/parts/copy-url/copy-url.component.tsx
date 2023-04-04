import React from 'react'
import clsx from 'clsx'

export default function CopyUrl({ id = undefined, className = '', url = '' }) {
  return (
    <button
      id={id}
      className={clsx(`p-copy-url ${className}`)}
      type='button'
      onClick={() => {
        const input = document.createElement('input')

        input.setAttribute('id', 'copyinput')
        document.body.appendChild(input)
        input.value = url
        input.select()
        document.execCommand('copy')
        document.body.removeChild(input)
      }}
    >
      <span className='p-copy-url__text'>
        クリックするとURLがクリップボードにコピーされます
      </span>

      <img
        className='p-copy-url__icon'
        src='/public/assets/images/icons/link-blue.svg'
        alt=''
      />
    </button>
  )
}
