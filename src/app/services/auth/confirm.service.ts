
import { protectedStatusSubject } from 'common/blocks/prompt';
import { ModalService } from 'app/services/modal';

export function onConfirmBeforeLeave(callback) {
  const dialogParams = {
    cancelLabel: text('BTN_CANCEL'),
    submitLabel: text('BTN_DISCARD_INPUT'),
  }
  const isConfirmBeforeLogout = protectedStatusSubject.getValue();

  if (isConfirmBeforeLogout) {
    const modal = new ModalService();

    modal.openDialog({
      ...dialogParams,
      submitTheme: 'dangerSolid',
      size: 's',
      children: text('DAESE543'),
      onCancel: () => {
        modal.close();
      },
      onSubmit: () => {
        modal.close();
        callback();
      },
    })
  } else {
    callback();
  }
}