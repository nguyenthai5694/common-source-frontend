import React, { MutableRefObject, useEffect, useRef } from 'react'
import { handleAddEventFocusin, handleRemoveEventFocusin } from './handle-tab-keypress.service';
import ModalDialogTemplate from './modal-dialog.template';
import { listModalRef } from './modal.component'
import { ModalDialogProps } from './modal.type';

export default function ModalDialog(props: ModalDialogProps) {
  const modalRef: MutableRefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const focusinEventListener = handleAddEventFocusin(listModalRef, modalRef);

    return () => {
      handleRemoveEventFocusin(listModalRef, focusinEventListener);
    };
  }, []);

  return (
    <>
      <div tabIndex={0} className='modal-sentinel-start'></div>

      <ModalDialogTemplate
        modalRef={modalRef}
        props={props}
      />

      <div tabIndex={0} className='modal-sentinel-end'></div>
    </>
  )
}
