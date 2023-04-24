/* eslint-disable complexity */
import React, { useEffect, useRef, useState } from 'react';
import { FormikProps } from 'formik';
import * as Yup from 'yup';
import Modal from 'common/blocks/modal/modal.component';
import { displayFormErrors, FormControl, FormWrapper, Input } from 'common/form';
import Loading from 'common/parts/loading/loading.component';
import { ModalService, PortalDialogProps } from 'app/services/modal';

interface ChangePasswordProps {
  seimuShokuinNo: string;
  changePassSuccessProcess: () => void;
}

export default function ChangePassword(props: PortalDialogProps<ChangePasswordProps>) {
  const initialValues = {
    oldPass: '',
    newPass: '',
    confirmPass: '',
    seimuShokuinNo: props.portaldata.seimuShokuinNo,
  }
  const formRef = useRef<FormikProps<any>>(null);
  const [rules] = useState({} as any)
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(initialValues);
  const validationSchema = Yup.object().shape({
    oldPass: Yup.string().required('oldPass'),
    newPass: Yup.string().required('newPass')
      .min(rules?.minNumChar, 'newPass'),
    confirmPass: Yup.string().required('newPass')
      .oneOf([Yup.ref('newPass'), null], 'newPass')
      .min(rules?.minNumChar, 'newPass'),
  })

  useEffect(() => {
    setLoading(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = () => {
    if (displayFormErrors(formRef.current)) {
      return;
    }

    const modal = new ModalService();

    modal.openDialog({
      children: <span>{ }</span>,
      size: 's',
      submitLabel: 'はい',
      cancelLabel: 'いいえ',
      onCancel: modal.close,
      onSubmit: () => {

      },
    })
  }

  return (
    <Modal
      size='m'
      isOpen
      title='政務認証用パスワード変更'
      cancelId='btnClose'
      submitId='btnRegistation'
      cancelLabel='キャンセル'
      submitLabel={'パスワード変更'}
      onSubmit={handleSubmit}
      onCancel={props.portalDialogRef.close}
      disabledSubmitButton={!inputValue.oldPass ||
        !inputValue.newPass ||
        !inputValue.confirmPass}
      modalBodyClassName='t-change-password'
    >
      <FormWrapper
        innerRef={formRef}
        initialValues={initialValues}
        onSubmit={() => { }}
        validationSchema={validationSchema}
        validateOnChange
        enableReinitialize
        validateOnMount
      >
        {loading && <Loading />}

        <section className='u-forms' id='sub-form'>
          <div className='h-ml-16'>※電子決裁システムのログインパスワードは変更されません。</div>

          <div className='u-forms__item'>
            <dt className='u-forms__key'>現在のパスワード
              <i className='p-tag  -orange -right'>必須</i>
            </dt>

            <dd className='u-forms__value'>
              <FormControl name='oldPass'>
                <Input
                  size='m'
                  width={536}
                  type='password'
                  onChange={(e) => setInputValue({
                    ...inputValue,
                    oldPass: e.target.value,
                  })}
                  maxLength={40}
                  autoTrim={false}
                />
              </FormControl>
            </dd>
          </div>

          <div className='u-forms__item'>
            <dt className='u-forms__key'>新しいパスワード
              <i className='p-tag  -orange -right'>必須</i>
            </dt>

            <dd className='u-forms__value'>
              <FormControl name='newPass'>
                <Input
                  size='m'
                  width={536}
                  type='password'
                  maxLength={parseInt(rules?.maxNumChar) || 40}
                  onChange={(e) => setInputValue({
                    ...inputValue,
                    newPass: e.target.value,
                  })}
                  autoTrim={false}
                  allowValidateSpace={!rules?.blankUseFlg}
                  fieldName='新しいパスワード'
                />
              </FormControl>
            </dd>
          </div>

          <div className='u-forms__item'>
            <dt className='u-forms__key u-forms__word-break-all'>新しいパスワード（再入力）
              <i className='p-tag  -orange -right'>必須</i>
            </dt>

            <dd className='u-forms__value'>
              <FormControl name='confirmPass'>
                <Input
                  size='m'
                  width={536}
                  type='password'
                  maxLength={parseInt(rules?.maxNumChar) || 40}
                  onChange={(e) => setInputValue({
                    ...inputValue,
                    confirmPass: e.target.value,
                  })}
                  autoTrim={false}
                  allowValidateSpace={!rules?.blankUseFlg}
                  fieldName='新しいパスワード（再入力）'
                />
              </FormControl>
            </dd>
          </div>

          <div className='u-forms__item'>
            <dt className='u-forms__key -padding'>前回の変更日時
            </dt>

            <dd className='u-forms__value'>
              <label>{rules?.updTime && rules?.updTime.replaceAll('-', '/')}</label>
            </dd>
          </div>

          <div className='u-forms__item'>
            <dt className='u-forms__key'>
            </dt>

            <dd className='u-forms__value u-forms__rule'>
              <ul>
                <li>文字数 ： {rules?.minNumChar} 文字以上,

                  {rules?.maxNumChar || 40} 文字以下</li>

                <li>使用可能な文字 ： {
                  rules?.eishoMojiUseFlg ?
                    ((!rules?.eidaiMojiUseFlg
                      && !rules?.numUseFlg
                      && !rules?.kigoUseFlg
                      && !rules?.blankUseFlg) ? '英小文字' : '英小文字,') : ''}

                  {rules?.eidaiMojiUseFlg ?
                    ((!rules?.numUseFlg
                      && !rules?.kigoUseFlg
                      && !rules?.blankUseFlg) ? '英大文字' : '英大文字,') : ''}

                  {rules?.numUseFlg ?
                    ((!rules?.kigoUseFlg
                      && !rules?.blankUseFlg) ? '数字' : '数字,') : ''}

                  {rules?.kigoUseFlg ? (!rules?.blankUseFlg ? '記号' : '記号,') : ''}

                  {rules?.blankUseFlg && '空白'} ※すべて半角</li>

                {(rules?.eishoMojiUseFlg
                  || rules?.eidaiMojiUseFlg
                  || rules?.kigoUseFlg
                  || rules?.numUseFlg) &&
                  <li className='h-d_flex'>使用文字に関する制限 ：
                    <ul>
                      {rules?.eishoMojiUseFlg && <li>英小文字 {rules?.eishoMojiMinUseNum} 文字以上</li>}

                      {rules?.eidaiMojiUseFlg && <li>英大文字 {rules?.eidaiMojiMinUseNum} 文字以上</li>}

                      {rules?.kigoUseFlg && <li>記号 {rules?.kigoMinUseMojiNum} 文字以上</li>}

                      {rules?.numUseFlg && <li>数字 {rules?.numMinUseMoji} 文字以上</li>}
                    </ul>
                  </li>
                }

                {rules?.pasUpdTimeFlg && <li>定期的な更新 ： {rules?.pasUpdKikan} 日</li>}

                {rules?.pasHistHozonFlg &&
                  <li className='h-d_flex'>その他の制限 ：
                    <ul>
                      <li>{rules?.oldPasCheHisNum} 回以内の履歴（以前のパスワード）と同じものは不可</li>

                      <li>{rules?.yukoKigen} 日以内の履歴（以前のパスワード）と同じものは不可</li>

                      <li>{rules?.uniSetFlg && 'ユーザIDとの同一は不可'}</li>
                    </ul>
                  </li>
                }

                {rules?.kigoUseFlg &&
                  <li className='h-d_flex'>使用可能な記号：
                    <ul>
                      <li>「!」「"」「#」「$」「%」「&」「'」「(」</li>

                      <li>「)」「-」「=」「~」「^」「\」「|」「`」</li>

                      <li>「@」「[」「]」「{'{'}」

                        「{'}'}」「;」「:」「+」</li>

                      <li>「*」「,」「.」「{'<'}」

                        「{'>'}」「/」「?」「_」</li>
                    </ul>
                  </li>
                }
              </ul>
            </dd>
          </div>
        </section>
      </FormWrapper>
    </Modal>
  )
}