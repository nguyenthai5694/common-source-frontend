import React from 'react'
import clsx from 'clsx';
import Modal from 'common/blocks/modal/modal.component'
import { PortalDialogProps } from 'app/services/modal'
import Tag from '../../parts/tag/tag.component';

export interface PortalData {
  changeOpen: (arg: boolean) => void;
  notice: any;
}

export default function NoticeDetail({ portalDialogRef, portaldata }: PortalDialogProps<PortalData>) {
  return (
    <Modal
      size='s'
      isOpen
      title='お知らせ'
      cancelLabel='閉じる'
      cancelId='btnCancel'
      isDisplayCancelBtnOnLeft={true}
      onCancel={portalDialogRef.close}
    >
      <div className='u-modal-news'>
        <p className='u-modal-news__date'>
          {portaldata.notice.noticeFixed === 1 && (
            <img src='/public/assets/images/icons/pin-blue.svg' alt='固定' className={clsx({
              'h-mr-12': portaldata.notice.noticeImportant !== 1,
            })} />
          )}

          {portaldata.notice.noticeImportant === 1 && (
            <Tag label='重要' theme='outline-red' className={clsx('h-mr-12', {
              '-no-margin-left': portaldata.notice.noticeFixed !== 1,
            })} />
          )}

          <span>{portaldata.notice?.noticePublishStart}</span>
        </p>

        <p className='u-modal-news__title'>{portaldata.notice?.noticeSubject}</p>

        <p
          className='u-modal-news__text'
          dangerouslySetInnerHTML={{ __html: sanitize(portaldata.notice?.noticeMessage) }}
        ></p>
      </div>
    </Modal>
  )
}
