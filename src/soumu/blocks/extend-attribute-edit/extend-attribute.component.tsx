import React, { useRef } from 'react';
import { FieldArray, Form, Formik, FormikProps } from 'formik';
import Modal from 'soumu/blocks/modal/modal.component';
import { FormControl, Input, Textarea } from 'soumu/form';
import Button from 'soumu/parts/button/button.component';
import { addToast } from 'soumu/parts/toast/toast.service';
import { PortalDialogProps } from 'app/services/modal';

export interface ExtendAttributeDataItem {
  title: string;
  content: string;
}

export interface ExtendAttributeData {
  data?: ExtendAttributeDataItem[],
  isShowInvalidCharacters?: boolean,
}

export default function ExtendAttribute(props: PortalDialogProps<ExtendAttributeData>) {
  const { data, isShowInvalidCharacters } = props.portaldata;
  const initialValues = {
    attributes: data?.length > 0 ? data : [
      {
        title: '',
        content: '',
      },
    ],
  }
  const formRef = useRef<FormikProps<any>>(null);

  const handleSubmitAttribute = () => {
    const values = formRef.current.values.attributes;

    if (formRef.current.errors.attributes) {
      const errors = formRef.current.errors.attributes as any as ExtendAttributeDataItem[]
      const error = _.find(errors, obj => {
        if (obj?.title || obj?.content) {
          return true
        }

        return false
      })

      isShowInvalidCharacters && addToast({ title: error.title || error.content, status: 'inValid' })

      return;
    }

    if (values.length && values.filter(e => !e.title).length > 0) {
      addToast({ title: text('COMSE040'), status: 'inValid' })

      return
    }

    props.portalDialogRef.close(values.filter(e => e.title || e.content));
  }

  return (
    <div className='t-modal-edit '>
      <Modal
        size='f'
        isOpen
        title='拡張属性編集'
        cancelId='btnClose'
        submitId='btnRegistation'
        cancelLabel='キャンセル'
        submitLabel='編集完了'
        onSubmit={handleSubmitAttribute}
        onCancel={props.portalDialogRef.close}
      >
        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          onSubmit={() => { }}
          validateOnChange
        >{({ values }) => (
          <Form>
            <FieldArray name='attributes'>
              {({ remove, push }) => (
                <div>
                  {values?.attributes && values.attributes?.map((inputValue, index) =>
                    <div className='t-forms__item' id='item' key={index}>
                      <div className='t-form__key h-mr-30'>
                        <FormControl name={`attributes.${index}.title`}>
                          <Input
                            size='l'
                            width={215}
                            placeholder='項目名を入力してください'
                            value={inputValue.title}
                            maxLength={50}
                            className='-error-white-space-wrap'
                          />
                        </FormControl>
                      </div>

                      <div className='u-forms__value'>
                        <FormControl name={`attributes.${index}.content`}>
                          <Textarea
                            className='h-ml-52'
                            width={420}
                            placeholder='内容を入力してください'
                            value={inputValue.content}
                            maxLength={100}
                          />
                        </FormControl>
                      </div>

                      <div>
                        <button type='button' className='t-button -trash'
                          onClick={() => remove(index)}>削除</button>
                      </div>
                    </div>,
                  )}

                  <div className='t-forms__item'>
                    <div className='t-form__key'>
                      <Button
                        id='btnDocumentReception'
                        label='拡張属性追加'
                        icon='plus'
                        size='m'
                        theme='secondary'
                        onClick={() => push({ title: '', content: '' })}
                      />
                    </div>
                  </div>
                </div>
              )}
            </FieldArray>
          </Form>
        )}
        </Formik>
      </Modal >
    </div>
  )
}
