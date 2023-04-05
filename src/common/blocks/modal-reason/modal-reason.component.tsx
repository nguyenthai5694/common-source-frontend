import React, { useCallback, useRef } from 'react';
import { FormikContextType } from 'formik';
import * as Yup from 'yup';
import Modal from 'common/blocks/modal/modal.component';
import { FormControl, FormWrapper, Textarea, displayFormErrors } from 'common/form';
import Tag from 'common/parts/tag/tag.component';
import { PortalDialogProps } from 'app/services/modal';

export interface ModalReasonData {
  modalTitle?: string;
  label?: string;
  submitLabel?: string;
  cancelLabel?: string;
  defaultValue?: string;
  maxLength?: number;
  className?: string;
  /**
   * Default: false.
   */
  reasonRequired?: boolean;
}

export interface ModalReasonReturnData {
  reason: string;
}

export default function ModalReason({ portalDialogRef, portaldata }: PortalDialogProps<ModalReasonData>) {
  const {
    modalTitle = '紙処理変更理由',
    label = '理由',
    submitLabel = '紙処理へ変更',
    cancelLabel = 'キャンセル',
    defaultValue = '',
    maxLength = 480,
    className = '',
    reasonRequired = false,
  } = portaldata || {};
  const formikRef = useRef<FormikContextType<ModalReasonReturnData>>();

  const validationSchema =
    reasonRequired
      ? Yup.object().shape({
        reason: Yup.string().required(text('DAECE200', label)),
      })
      : null;

  const onSubmit = useCallback(() => {
    if (displayFormErrors(formikRef.current)) return;

    portalDialogRef.close(formikRef.current.values)
  }, [portalDialogRef, formikRef])

  return (
    <Modal
      isOpen
      size='m'
      title={modalTitle}
      cancelLabel={cancelLabel}
      onSubmit={onSubmit}
      onCancel={portalDialogRef.close}
      submitLabel={submitLabel}
    >
      <FormWrapper
        innerRef={formikRef}
        initialValues={{ reason: defaultValue }}
        validateOnMount={true}
        validationSchema={validationSchema}
      >
        <div className='u-forms__inner-modal'>
          <div className='u-forms__item'>
            <dt className={`u-forms__key ${className}`}>
              {label}

              {reasonRequired && <Tag label='必須' theme='orange' />}
            </dt>

            <dd className='u-forms__value' >
              <FormControl name='reason'>
                <Textarea maxLength={maxLength} />
              </FormControl>
            </dd>
          </div>
        </div>
      </FormWrapper>
    </Modal >
  )
}
