import React from 'react';
import Button from 'common/parts/button/button.component';

export default function Sessiontimeout({ isOpen = false, handleClose }) {
  return ((
    <div className={isOpen ? 't-logout  t-modal' : ''}>
      <div
        className='t-modal -sizeM'
        hidden={!isOpen}
      >

        <div className='b-modal__inner'>
          <h2 className='t-modal__header'>セッションタイムアウト</h2>

          <button className='b-modal__close' type='button' onClick={handleClose}>
            <img src='/public/assets/images/icons/close-primary-36.svg' alt='閉じる' />
          </button>

          <div className='t-modal__body'>
            <div className='b-modal__body__inner'>
              <div className='h-d_flex -justify-center'>
                <label>一定時間操作がされなかったため、自動的にログアウトしました。「再ログイン」ボタンをクリックしてください。』</label>
              </div>
            </div>
          </div>

          <div className='t-modal__footer'>
            <div className='t-position__button'>
              <Button
                className='t-button'
                id='btnReLogin'
                label='再ログイン'
                size='l'
                theme='primary'
                type='button'
                onClick={() => { }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ))
}
