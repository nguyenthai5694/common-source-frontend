import React, { MutableRefObject, useEffect, useRef } from 'react'
import { handleAddEventFocusin, handleRemoveEventFocusin } from './handle-tab-keypress.service';
import ModalTemplate from './modal.template';
import { ModalProps } from './modal.type';

export const listModalRef = [];

export default function Modal(props: ModalProps) {
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

      <ModalTemplate
        modalRef={modalRef}
        props={props}
      />

      <div tabIndex={0} className='modal-sentinel-end'></div>
    </>
  )
}
