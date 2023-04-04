import React, { useState, useRef } from 'react'
import clsx from 'clsx'
import { ToastItemProps } from './toast.type'

export function ToastItem({ status, children, onClose }: ToastItemProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const toastRef = useRef<HTMLDivElement>();
  const removeToast = () => {
    setIsRemoving(true);

    const toastHeight = toastRef.current.getBoundingClientRect().height;

    toastRef.current.style.marginBottom = `-${toastHeight}px`;

    setTimeout(onClose, 200);
  }

  return (
    <div
      ref={toastRef}
      className={clsx('p-toast__item', {
        '-valid': status === 'valid',
        '-inValid': status === 'inValid',
        '-warn': status === 'warn',
        '-removing': isRemoving,
      })}
    >
      <div className='p-toast__body'>{children}</div>

      <button
        className='p-toast__btn-close'
        type='button'
        onClick={removeToast}
        aria-label='閉じる'
      ></button>
    </div>
  )
}

export default function Toast({ children }) {
  return (
    <div className='p-toast' role='alert'>
      {children}
    </div>
  )
}
