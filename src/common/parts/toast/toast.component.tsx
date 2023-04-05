import React, { useState, useEffect, useRef } from 'react'
import { Alert, Snackbar, SnackbarOrigin } from '@mui/material';
import { ToastItemProps } from './toast.type'

interface State extends SnackbarOrigin {
  open: boolean;
}
export function ToastItem({ status, children, onClose }: ToastItemProps) {
  const toastRef = useRef<HTMLDivElement>();
  const removeToast = () => {
    const toastHeight = toastRef.current.getBoundingClientRect().height;

    toastRef.current.style.marginBottom = `-${toastHeight}px`;

    setTimeout(onClose, 5000);
  }

  const [state] = useState<State>({
    open: true,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal } = state;

  useEffect(() => {
    removeToast()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    // <div
    //   ref={toastRef}
    //   className={clsx('p-toast__item', {
    //     '-valid': status === 'valid',
    //     '-inValid': status === 'inValid',
    //     '-warn': status === 'warn',
    //     '-removing': isRemoving,
    //   })}
    // >
    //   <div className='p-toast__body'>{children}</div>

    //   <button
    //     className='p-toast__btn-close'
    //     type='button'
    //     onClick={removeToast}
    //     aria-label='閉じる'
    //   ></button>
    // </div>
    <div ref={toastRef}>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={true}
        onClose={onClose}
        message={children}
        key={vertical + horizontal}
      >
        <Alert onClose={onClose} severity={status} sx={{ width: '100%' }}>
          {children}
        </Alert>
      </Snackbar>
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
