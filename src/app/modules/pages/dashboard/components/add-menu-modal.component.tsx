import React, { useRef } from 'react'
import { Form, Formik, FormikContextType } from 'formik';
import * as Yup from 'yup';
import Modal from 'common/blocks/modal/modal.component'
import { displayFormErrors, FormControl, Input } from 'common/form';
import { ModalService, PortalDialogProps } from 'app/services/modal';

interface PortalDialogPropsParams {

}

export default function AddMenuModal(props: PortalDialogProps<PortalDialogPropsParams>) {
  // Create formik
  const formikRef = useRef<FormikContextType<any>>();

  const confirmDialog = new ModalService();

  // Validation
  const validationSchema = Yup.object().shape({
    id: Yup.string()
      .trim()
      .max(3, 'ID nhập tối đa 3 ký tự'),

    name: Yup.string()
      .trim()
      .max(50, 'Tên Menu nhập tối đa 50 ký tự'),

    path: Yup.string()
      .trim()
      .max(50, 'Path nhập tối đa 50 ký tự'),

  }, []);

  const handSubmit = () => {
    //Validate
    if (!formikRef.current.isValid) {
      displayFormErrors(formikRef.current);

      return
    }

    confirmDialog.openDialog({
      children: (
        <strong>
          Bạn có muốn tạo Menu?
        </strong>
      ),

      cancelLabel: 'Đóng',
      submitLabel: 'Đồng ý',
      submitTheme: 'primary',
      onSubmit: () => {
        props.portalDialogRef.close({ data: formikRef.current.values });
        confirmDialog.close()
      },
      onCancel: () => {
        confirmDialog.close()
      },
    })
  }

  return (
    <Modal
      size='f'
      title={'Thêm Menu'}
      cancelId='btnClose'
      cancelLabel='Close'
      submitLabel='Submit'
      onSubmit={() => {
        handSubmit()
      }}
      isOpen
      onCancel={props.portalDialogRef.close}
    >
      <Formik
        innerRef={formikRef}
        initialValues={{
          id: '',
          name: '',
          path: '',
        }}
        validationSchema={validationSchema}
        onSubmit={() => { }}
      >
        {() => (
          <Form>
            <div className='u-forms__item'>
              <dt className='u-forms__key' style={{ width: '140px' }}>
                Id Menu
              </dt>

              <dd className='u-forms__value'>
                <FormControl name='id'>
                  <Input />
                </FormControl>
              </dd>
            </div>

            <div className='u-forms__item'>
              <dt className='u-forms__key' style={{ width: '140px' }}>
                Tên Menu
              </dt>

              <dd className='u-forms__value'>
                <FormControl name='name'>
                  <Input />
                </FormControl>
              </dd>
            </div>

            <div className='u-forms__item'>
              <dt className='u-forms__key' style={{ width: '140px' }}>
                Path
              </dt>

              <dd className='u-forms__value'>
                <FormControl name='path'>
                  <Input />
                </FormControl>
              </dd>
            </div>
          </Form>
        )}
      </Formik>
    </Modal >
  )
}
