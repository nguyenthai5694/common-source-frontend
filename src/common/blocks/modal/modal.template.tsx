import React, { MutableRefObject, useCallback } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import clsx from 'clsx'
import RoundButton from 'common/parts/button/round-button.component'
import { modalBodyClass, modalBodyInnerClass } from 'common/parts/popover/popover.component'
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
    onSubmitSecond,
    onSubmit,
    cancelLabel,
    onCancel,
    onDelete,
    deleteLabel,
    size = 'l',
    downloadBtnLabel = '',
    handleDownload,
    footerText = '',
    modalInnerClassName = '',
    modalBodyClassName = '',

    isFlexFooter = '',
    displayBackToTopButton = false,
    modalScrollElement = '',
    headerTheme = '', // primary
    isShowCloseHidden = true,
    hasRoundButton = false,
    roundButtonClass = '',
  } = props;

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

        {/* {downloadBtnLabel && <Button
          id={downloadBtnId}
          className='h-mt-12 p-download-button p-button__download'
          label={downloadBtnLabel}
          onClick={handleDownload}
          theme='secondary'
          disabled={disabledDownloadButton}
          icon='download' />
        } */}
        {downloadBtnLabel && <Button variant='contained' endIcon={<CloseIcon />} onClick={handleDownload}></Button>}

        {isShowCloseHidden &&
          <button className='b-modal__close' type='button' onClick={handleCancel}>
            <CloseIcon />
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
          {/* {cancelLabel && <Button
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
          />} */}

          {cancelLabel &&
            <Button variant='contained' color='error' onClick={handleCancel}>
              {cancelLabel}
            </Button>
          }

          {footerText && (
            <p
              className='b-modal__footer-text'
              dangerouslySetInnerHTML={{
                __html: sanitize(footerText),
              }}
            />
          )}

          <React.Fragment>
            {/* {submitLabel && isDisplaySubmitBtn && <Button
              id={submitId}
              label={submitLabel}
              className={clsx({ 'h-mr-4': !!submitSecondLabel })}
              size='l'
              theme={submitTheme || 'primary'}
              type={typeButtonSubmit}
              onClick={handleClickSubmit}
              disabled={disabledSubmitButton}
            />} */}

            {submitLabel && <Button variant='contained' onClick={handleClickSubmit}>{submitLabel}</Button>}

            {/* {submitSecondLabel && <Button
              id={submitSecondId}
              label={submitSecondLabel}
              className={clsx({ 'h-ml-4': !!submitSecondLabel })}
              size='l'
              theme={submitSecondTheme || 'primary'}
              type={typeButtonSubmit}
              onClick={handleClickSubmitSecond}
              disabled={disableSubmitSecond}
            />} */}

            {submitSecondLabel && <Button variant='contained' endIcon={<CloseIcon />} onClick={handleClickSubmitSecond}>
              {submitSecondLabel}
            </Button>}
          </React.Fragment>

          {/* {deleteLabel && (
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
          )} */}

          {deleteLabel && <Button variant='contained' endIcon={<CloseIcon />} onClick={handleClickDelete}></Button>}
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
