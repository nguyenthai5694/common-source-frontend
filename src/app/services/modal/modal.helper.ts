import { ComponentType } from 'react';
import { PortalDialogRef } from 'common/blocks/modal/modal.type';
import { ModalService, ExtractPortalDataFromComponent } from './';

export function openPortalDialog<T = ComponentType>(
  Component: T,
  portalData?: ExtractPortalDataFromComponent<T>,
): PortalDialogRef {
  return (new ModalService()).openPortalDialog(Component, portalData);
}

export const openDialog = ({
  size,
  submitTheme,
  cancelLabel,
  children = '',
  submitLabel = '',
  onSubmit = () => { },
}) => {
  const modalService = new ModalService()

  return modalService.openDialog({
    children,
    size,
    submitLabel,
    submitTheme,
    cancelLabel,
    onSubmit: () => {
      onSubmit()
      modalService.close()
    },
    onCancel: modalService.close,
  })
}
