import React, { MutableRefObject } from 'react'
import clsx from 'clsx'
import Button from 'soumu/parts/button/button.component'
import { ModalDialogProps } from './modal.type';

export default function ModalDialogTemplate({ props, modalRef }: {
  props: ModalDialogProps,
  modalRef: MutableRefObject<HTMLDivElement>,
}) {
  const {
    children,
    isOpen = false,
    submitLabel,
    onSubmit,
    submitTheme = 'primary',
    cancelLabel,
    onCancel,
    size = 's',
  } = props;

  const handleKeyDown = (e) => {
    const code = e.keyCode ? e.keyCode : e.which;
    const keyCodeEsc = 27;

    if (code === keyCodeEsc) {
      onCancel && onCancel();
    }
  }

  const handleSubmit = () => {
    onSubmit && onSubmit();
  }

  return (
    <div
      ref={modalRef}
      className={clsx('b-modal -dialog', {
        '-sizeS': size === 's',
        '-sizeS sm': size === 'm',
      })}
      hidden={!isOpen}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      <div className='b-modal__inner' role='dialog'>
        <button className='b-modal__close' type='button' onClick={onCancel}>
          <img src='/public/assets/images/icons/close-primary-36.svg' alt='閉じる' />
        </button>

        <div className='b-modal__body'>
          <div className='b-modal__body__inner'>
            <div className='u-modal-dialog'>
              {submitTheme === 'dangerSolid' && <img
                alt=''
                className='u-modal-dialog__icon'
                src='/public/assets/images/icons/alert-red.svg'
              />}

              <div className='u-modal-dialog__text'>
                {children}
              </div>
            </div>

            <div className='b-modal__body-footer'>
              {cancelLabel && (
                < Button
                  className=''
                  label={cancelLabel}
                  size='l'
                  theme='tertiary'
                  type='button'
                  onClick={onCancel}
                />
              )}

              {submitLabel && (
                <Button
                  className='h-ml-20'
                  label={submitLabel}
                  size='l'
                  theme={submitTheme as any /* Fix later */}
                  type='button'
                  onClick={handleSubmit}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
