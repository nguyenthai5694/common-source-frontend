import React, { Component } from 'react';
import clsx from 'clsx';
import { Form, Formik, FieldArray, FormikProps } from 'formik';
import { withRouter, RouteComponentProps } from 'react-router-dom'
import * as Yup from 'yup';
import {
  FormControl, Checkbox, CommonSelect, Input,
  Radio, Textarea, RichTextarea,
  InputTags, displayFormErrors,
} from 'common/form';
import Button from 'common/parts/button/button.component';

class UserForm extends Component<RouteComponentProps> {
  formRef = React.createRef<FormikProps<any>>();

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      isSelecting: false,
      filterText: '',
      selectedValue: '',
    }
  }

  private initialValues = {
    input: '',
    textarea: 'textarea',
    richtext: 'richtext value <font color="#01874b">color</font>',
    checkbox: [
      'val_1',
      'val_2',
    ],
    users: [
      {
        name: 'name 1',
        email: 'email 1',
      },
    ],
    customSelector3: [
      20, 50,
    ],
    customSelector4: [
      20,
    ],
    radio_type1: '所属',
    input_tags: [{ label: 'tag1' }, { label: 'tag2' }, { label: 'tag3' }, { label: 'tag4' }],
  }

  private validationSchema = Yup.object().shape({
    input: Yup.string()
      .min(4, '入力された文字が4文字未満')
      .max(10, '10文字入力されています')
      .required('必須項目です'),
    textarea: Yup.string()
      .max(20, '20文字入力されています')
      .required('必須項目です'),
    customSelector1: Yup.string()
      .required('必須項目です'),
    customSelector2: Yup.string()
      .required('必須項目です'),
    radio_type1: Yup.string()
      .required('必須項目です'),
    checkbox: Yup.string()
      .oneOf(['val_1'], '必須項目です'),
    users: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string()
            .min(4, '入力された文字が4文字未満')
            .required('必須項目です'),
          email: Yup.string()
            .min(4, '入力された文字が4文字未満')
            .required('必須項目です'),
          gender: Yup.string()
            .required('必須項目です'),
          bio: Yup.string()
            .required('必須項目です'),
          intro: Yup.string()
            .required('必須項目です'),
          dob: Yup.string()
            .required('必須項目です'),
          arr_checkbox: Yup.string()
            .required('必須項目です'),
        }),
      )
      .required('Must have users')
      .min(1, 'Minimum of 1 user'),
  })

  private onSubmit = () => {
    displayFormErrors(this.formRef.current);
    // this.props.history.push('/', values);
  };

  render() {
    const range = [
      {
        value: '20',
        label: '20件',
      },
      {
        value: '50',
        label: '50件',
      },
      {
        value: '100',
        label: '100件',
      },
    ]

    return (
      <div>
        <Formik
          innerRef={this.formRef}
          initialValues={this.initialValues}
          validationSchema={this.validationSchema}
          onSubmit={this.onSubmit}
          validateOnMount={true}
          validateOnChange={true}
        >
          {(props) => {
            const { errors, values } = props
            const fieldArrayError = typeof errors['users'] === 'string' ? errors['users'] : undefined;

            return (
              <Form>
                <br></br>

                <br></br><br></br>

                <FieldArray name='users'>
                  {({ remove, push }) => (
                    <div>
                      {values.users.length > 0 &&
                        values.users.map((user, index) => (
                          <div className='row' key={index}>
                            <div className='col'>
                              <button
                                type='button'
                                className='secondary'
                                onClick={() => remove(index)}
                              >
                                X
                              </button>
                            </div>

                            <div className='col'>
                              <label htmlFor={`users.${index}.name`}>Name</label>

                              <FormControl name={`users.${index}.name`}>
                                <Input width={'100%'}
                                  placeholder={'ここにテキストを入力してください'} />
                              </FormControl>
                            </div>

                            <br></br><br></br>

                            <div className='col'>
                              <label htmlFor={`users.${index}.email`}>Email</label>

                              <FormControl name={`users.${index}.email`}>
                                <Input width={'100%'}
                                  placeholder={'ここにテキストを入力してください'} />
                              </FormControl>
                            </div>

                            <br></br><br></br>

                            <div className='col'>
                              <label htmlFor={`users.${index}.gender`}>Gender</label>

                              <FormControl name={`users.${index}.gender`}>
                                <CommonSelect options={range} multi={true} id='' />
                              </FormControl>
                            </div>

                            <br></br><br></br>

                            <div className='col'>
                              <label htmlFor={`users.${index}.bio`}>Bio</label>

                              <FormControl name={`users.${index}.bio`}>
                                <Textarea />
                              </FormControl>
                            </div>

                            <br></br><br></br>

                            <div className='col'>
                              <label htmlFor={`users.${index}.intro`}>intro</label>

                              <FormControl name={`users.${index}.intro`}>
                                <RichTextarea />
                              </FormControl>
                            </div>

                            <br></br><br></br>

                            <div className='col'>
                              <label htmlFor={`users.${index}.dob`}>DOB</label>

                            </div>

                            <br></br><br></br>

                            <div className='col'>
                              <label htmlFor={`users.${index}.arr_checkbox`}>DOB</label>

                              <FormControl name={`users.${index}.arr_checkbox`}>
                                <Checkbox label={'利用規約を読みました 1'} value='val_1' className={'h-mt-10'} />

                                <Checkbox label={'利用規約を読みました 2'} value='val_2' className={'h-mt-10'} />

                                <Checkbox label={'利用規約を読みました 3'} value='val_3' className={'h-mt-10'} />
                              </FormControl>
                            </div>
                          </div>
                        ))}

                      <button
                        type='button'
                        className='secondary'
                        onClick={() => push({ name: '', email: '' })}
                      >
                        Add User
                      </button>
                    </div>
                  )}
                </FieldArray>

                <div
                  className={'p-input -sizeL'}
                  style={{ width: 520 }}
                >
                  {fieldArrayError ? (
                    <div className={'p-input__message -inValid'}>{fieldArrayError}</div>
                  ) : null}
                </div>

                <br></br>

                <label>Input:</label>

                <div className={clsx('form-control', { 'error': errors.input })}>
                  <FormControl name='input'>
                    <Input width={'100%'} placeholder={'ここにテキストを入力してください'} />
                  </FormControl>
                </div>

                <br></br><br></br>

                <label>Textarea:</label>

                <div className={clsx('form-control', { 'error': errors.textarea })}>
                  <FormControl name='textarea'>
                    <Textarea placeholder={'ここにテキストを入力してください'} />
                  </FormControl>
                </div>

                <br></br><br></br>

                <label>Rich text:</label>

                <div className={clsx('form-control', { 'error': errors.textarea })}>
                  <FormControl name='richtext'>
                    <RichTextarea />
                  </FormControl>
                </div>

                <br></br><br></br>

                <label>Multi Select:</label>

                <div className={clsx('form-control', { 'error': errors.customSelector })}>
                  <FormControl name='customSelector3'>
                    <CommonSelect options={range} multi={true} id='' />
                  </FormControl>
                </div>

                <br></br><br></br>

                <label>Select:</label>

                <div className={clsx('form-control', { 'error': errors.customSelector })}>
                  <FormControl name='customSelector4'>
                    <CommonSelect options={range} id='' />
                  </FormControl>
                </div>

                <br></br><br></br>

                <label>Checkbox:</label>

                <div className={clsx('form-control')}>
                  <FormControl name='checkbox'>
                    <Checkbox label={'利用規約を読みました 1'} value='val_1' className={'h-mt-10'} />

                    <Checkbox label={'利用規約を読みました 2'} value='val_2' className={'h-mt-10'} />

                    <Checkbox label={'利用規約を読みました 3'} value='val_3' className={'h-mt-10'} />
                  </FormControl>
                </div>

                <br></br>

                <label>Radio:</label>

                <div className={clsx('form-control')}>
                  <FormControl name='radio_type1'>
                    <Radio value={'個人'} label={'個人'} />

                    <Radio value={'所属'} label={'所属'} />

                    <Radio value={'役職'} label={'役職'} />
                  </FormControl>
                </div>

                <br></br>

                <label>InputTags:</label>

                <div className={clsx('form-control')}>
                  <FormControl name='input_tags' onChange={(values) => { }}>
                    <InputTags
                    // onChange={(values) => { console.log('input tag', values) }}
                    />
                  </FormControl>
                </div>

                <br></br>

                <Button
                  label='Send'
                  size='l'
                  onClick={this.onSubmit}
                />
              </Form>
            )
          }}
        </Formik>
      </div>
    )
  }
}

export default withRouter(UserForm);
