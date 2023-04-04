import React, { MutableRefObject, useCallback } from 'react'
import clsx from 'clsx'
import Button from 'soumu/parts/button/button.component'
import RoundButton from 'soumu/parts/button/round-button.component'
import { modalBodyClass, modalBodyInnerClass } from 'soumu/parts/popover/popover.component'
import { ModalProps } from './modal.type'

export default function ModalTemplate({ props, modalRef }: {
  props: ModalProps,
  modalRef: MutableRefObject<HTMLDivElement>,
}) {
  const {
    children,
    title,
    isOpen = false,
    submitLabel,
    submitSecondLabel = '',
    submitSecondId = undefined,
    onSubmitSecond,
    disableSubmitSecond = false,
    onSubmit,
    cancelLabel,
    onCancel,
    onDelete,
    deleteLabel,
    deleteId,
    deleteDisabled = false,
    deleteTheme = 'danger',
    size = 'l',
    submitId = undefined,
    cancelId = undefined,
    disabledSubmitButton = false,
    downloadBtnId = undefined,
    downloadBtnLabel = '',
    handleDownload,
    footerText = '',
    modalInnerClassName = '',
    modalBodyClassName = '',
    submitTheme = '',
    submitSecondTheme = '',
    isFlexFooter = '',
    isDisplayCancelBtnOnLeft = false,
    displayBackToTopButton = false,
    modalScrollElement = '',
    disabledDownloadButton = false,
    typeButtonSubmit = 'button',
    isDisplaySubmitBtn = true,
    headerTheme = '', // primary
    isShowCloseHidden = true,
    hasRoundButton = false,
    roundButtonClass = '',
  } = props;

  const isOnlyDisplayBtnCancelFooter = (!!cancelLabel && !submitLabel && !submitSecondLabel && !deleteLabel);

  const handleCancel = useCallback(() => {
    onCancel && onCancel();
  }, [onCancel]);

  const handleKeyDown = (e) => {
    const code = e.keyCode ? e.keyCode : e.which;
    const keyCodeEsc = 27;

    if (code === keyCodeEsc) {
      handleCancel();
    }
  }

  const handleClickSubmit = () => {
    onSubmit && onSubmit();
  }

  // ok second
  const handleClickSubmitSecond = () => {
    onSubmitSecond && onSubmitSecond();
  }

  const handleClickDelete = () => {
    onDelete && onDelete();
  }

  return (
    <div
      ref={modalRef}
      className={clsx('b-modal', {
        '-sizeF': size === 'f',
        '-sizeML': size === 'ml',
        '-sizeM': size === 'm',
        '-sizeS': size === 's',
        '-sizeXs': size === 'xs',
        '-sizeAuto': size === 'auto',
      })}
      hidden={!isOpen}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      data-modal-root
    >
      <div className={`b-modal__inner ${modalInnerClassName}`}>
        <h2 className={`b-modal__header -${headerTheme}`} data-modal-header>{title}</h2>

        {downloadBtnLabel && <Button
          id={downloadBtnId}
          className='h-mt-12 p-download-button p-button__download'
          label={downloadBtnLabel}
          onClick={handleDownload}
          size='s'
          theme='secondary'
          disabled={disabledDownloadButton}
          icon='download' />
        }

        {isShowCloseHidden &&
          <button className='b-modal__close' type='button' onClick={handleCancel}>
            <img src='/public/assets/images/icons/close-primary-36.svg' alt='閉じる' />
          </button>
        }

        <div className={`b-modal__body ${modalBodyClassName} ${modalBodyClass}`} data-modal-body>
          <div className={`b-modal__body__inner ${modalBodyInnerClass}`} data-modal-body-inner>{children}</div>
        </div>

        {displayBackToTopButton && (<a
          className='p-round-button -anchor'
          href={modalScrollElement}
          data-smooth-scroll
          data-scroll-in-modal
        >
          <span className='p-round-button__hidden-text'>ページの先頭に戻る</span>
        </a>
        )}

        <div className={clsx('b-modal__footer',
          {
            'h-d_flex -justify-around': isFlexFooter === 'around',
            'h-d_flex -justify-between': isFlexFooter === 'between',
          })} data-modal-footer>
          {cancelLabel && <Button
            id={cancelId}
            className={clsx('b-modal__footer-cancel',
              {
                '-center': isDisplayCancelBtnOnLeft ? false : isOnlyDisplayBtnCancelFooter,
                '-special': isFlexFooter,
              })}
            label={cancelLabel}
            size='l'
            theme='tertiary'
            type='button'
            onClick={handleCancel}
          />}

          {footerText && (
            <p
              className='b-modal__footer-text'
              dangerouslySetInnerHTML={{
                __html: sanitize(footerText),
              }}
            />
          )}

          <React.Fragment>
            {submitLabel && isDisplaySubmitBtn && <Button
              id={submitId}
              label={submitLabel}
              className={clsx({ 'h-mr-4': !!submitSecondLabel })}
              size='l'
              theme={submitTheme || 'primary'}
              type={typeButtonSubmit}
              onClick={handleClickSubmit}
              disabled={disabledSubmitButton}
            />}

            {submitSecondLabel && <Button
              id={submitSecondId}
              label={submitSecondLabel}
              className={clsx({ 'h-ml-4': !!submitSecondLabel })}
              size='l'
              theme={submitSecondTheme || 'primary'}
              type={typeButtonSubmit}
              onClick={handleClickSubmitSecond}
              disabled={disableSubmitSecond}
            />}
          </React.Fragment>

          {deleteLabel && (
            <Button
              id={deleteId}
              className='b-modal__footer-delete'
              label={deleteLabel}
              disabled={deleteDisabled}
              size='l'
              theme={deleteTheme}
              type='button'
              onClick={handleClickDelete}
            />
          )}
        </div>

        {hasRoundButton &&
          <RoundButton className={
            roundButtonClass ? `${roundButtonClass} -in-modal` : '-in-modal'
          } />
        }
      </div>
    </div>
  )
}
