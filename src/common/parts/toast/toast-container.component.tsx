import React, { useEffect, useState } from 'react'
import Toast, { ToastItem } from 'common/parts/toast/toast.component'
import { removeToast, toast$ } from 'common/parts/toast/toast.service'
import { ToastStatus } from './toast.type'

function FormItemsInvalid({ totalItemsFormError, status }: { totalItemsFormError: number, status: ToastStatus }) {
  if (totalItemsFormError < 2 || status !== 'error') {
    return null;
  }

  return <div>{ }</div>
}

export default function ToastContainer() {
  const [toasts, setToast] = useState([]);

  useEffect(() => {
    toast$.subscribe(data => {
      setToast(data.toasts);
    });
  })

  return (
    <Toast>
      {toasts.map((toast, index) => (
        <ToastItem
          status={toast.status}
          key={toast.id}
          onClose={() => removeToast(toast.id)}
        >
          {toast.html && <>
            <div dangerouslySetInnerHTML={{ __html: sanitize(toast.html) }} />

            <FormItemsInvalid totalItemsFormError={toast.totalItemsFormError} status={toast.status} />
          </>}

          {!toast.html && <>
            {toast.title}

            <FormItemsInvalid totalItemsFormError={toast.totalItemsFormError} status={toast.status} />
          </>}

          {toast.link && toast.linkText && (
            <a className='h-ml-16' href={toast.link}>
              {toast.linkText}
            </a>
          )}
        </ToastItem>
      ))}
    </Toast>
  );
}
