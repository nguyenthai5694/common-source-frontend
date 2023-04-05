import React from 'react'
import clsx from 'clsx'

interface HelpProps {
  text: string;
  className?: string;

  /**
   * Default: 'bottom-right
   */
  placement?: string;

  /**
   * Default: 0 - active
   */
  tabIndex?: number;
}

export default function Help({ text, className = '', placement = 'bottom-right', tabIndex = -1 }: HelpProps) {
  return (
    <i id='stopTabButton' className={`p-help ${className}`}>
      <img
        className='p-help__icon'
        src='/public/assets/images/icons/help-circle-line-primary-36.svg'
        alt='補足説明'
        tabIndex={tabIndex}
      />

      <span
        role='tooltip'
        className={clsx('p-help__text', {
          '-top-right': placement === 'top-right',
          '-top-left': placement === 'top-left',
          '-bottom-right': placement === 'bottom-right',
          '-bottom-left': placement === 'bottom-left',
        })}
      >
        {text}
      </span>
    </i>
  )
}
