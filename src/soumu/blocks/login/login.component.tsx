/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { Input } from 'soumu/form';
import Button from 'soumu/parts/button/button.component';

export default function Login({ isOpen = false, handleClose, type }) {
  const [value, setValue] = useState('')
  const handleSubmit = () => {
    console.log(value);
    setValue('')
  }

  return (
    <div className={isOpen ? 't-password-change  t-modal' : ''}>
      <div
        className='t-modal -sizeM'
        hidden={!isOpen}
      >

        <div className='b-modal__inner'>
          <h2 className='t-modal__header'>文書管理システム</h2>

          <button className='b-modal__close' type='button' onClick={handleClose}>
            <img src='/public/assets/images/icons/close-primary-36.svg' alt='閉じる' />
          </button>

          {
            (type === 1 && <h3 className='t-modal__notification'>国立公文書館 移管受領</h3>) || (type === 2 && <h3 className='t-modal__notification'>レコードスケジュール（RS）確認・廃棄協議</h3>) || (type === 3 && <h3 className='t-modal__notification h-d_none' >パスワード変更</h3>)
          }

          <div className='t-modal__body'>
            <div className='b-modal__body__inner'>
              <div className='t-position__label '>
                <label>ユーザID</label>
              </div>

              <div className='h-d_flex -justify-center h-mt-6 h-mb-6'>
                <Input
                  value={value}
                  id='txbUserID'
                  size='l'
                  width={320}
                  onChange={e => setValue(e.target.value)}
                />
              </div>

              <div className='t-position__label '>
                <label>パスワード</label>
              </div>

              <div className='h-d_flex -justify-center h-mt-6 h-mb-6'>
                <Input
                  value={value}
                  id='txbPassword'
                  size='l'
                  width={320}
                  onChange={e => setValue(e.target.value)}
                />
              </div>

            </div>
          </div>

          <div className='t-modal__footer'>
            <div className='t-position__button'>
              <Button
                className='t-right-button'
                id='btnLogin'
                label='ログイン'
                size='l'
                theme='primary'
                type='button'
                onClick={handleSubmit}
              />
            </div>

          </div>

          <div className='t-button__change'> <button id='lnkChangePassword' className='t-button__color'>パスワード変更</button></div>

        </div>
      </div>
    </div>
  )
}
