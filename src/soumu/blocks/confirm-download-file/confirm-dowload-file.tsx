import React from 'react'
import { ModalService } from 'app/services/modal';

export const handleConfirmDownloadFile = (callback, msg?, handleChangeDisableButton?) => {
  const modalService = new ModalService();

  modalService.openDialog({
    cancelLabel: 'いいえ',
    submitLabel: 'はい',
    submitTheme: 'primary',
    onSubmit: () => {
      handleChangeDisableButton && handleChangeDisableButton(true)
      callback && callback()

      if (handleChangeDisableButton) {
        setTimeout(() => {
          handleChangeDisableButton(false)
        }, 1500)
      }

      modalService.close()
    },
    onCancel: modalService.close,
    children: !!msg ? msg : (
      <strong>
        ダウンロードします。
        <br />
        よろしいですか？
      </strong>
    ),
  });
}