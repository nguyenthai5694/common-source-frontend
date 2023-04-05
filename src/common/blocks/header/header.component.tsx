/* eslint-disable max-lines */
import React, { useState, useRef, useEffect } from 'react'
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom'
import { Loading } from 'common/parts/loading';
import { useLogout } from 'app/hooks/use-logout.hook'
import useOnClickOutside from 'app/hooks/use-on-click-outside.hook'
import { getCurrentRouteId, getRoute } from 'app/services/route';

enum TopMenu {
  CONFIRM_RS = '/adm/rskakunintopmenu',
  CONFIRM_CANCEL = '/adm/haikikyogitopmenu',
  TRANSFER = '/adm/ikanjyuryotopmenu',
}

export default function Header() {
  // メニューの開閉
  const menuRef = useRef(null)
  const [isMenuOpen, changeIsMenuOpen] = useState(false)

  useOnClickOutside(menuRef, () => changeIsMenuOpen(false)) // ボックス外クリックで閉じる

  // お知らせの開閉
  const noticeRef = useRef(null)
  const [isNoticeOpen, changeIsNoticeOpen] = useState(false)

  const [isActiveIcon, chanegIsActiveIcon] = useState(false)

  useOnClickOutside(noticeRef, () => changeIsNoticeOpen(false)) // ボックス外クリックで閉じる

  const location = useLocation()

  useEffect(() => {
    chanegIsActiveIcon(false);

    if (location.pathname === '/usp/oshirase-user') {
      chanegIsActiveIcon(true);
    }
  }, [location])

  const handleClickOpenNotice = () => {
    if (isNoticeOpen) {
      changeIsNoticeOpen(false);

      return;
    }

    changeIsNoticeOpen(true);
  }

  const handleClickOpenManyuaru = () => {
    if (isManualOpen) {
      changeIsManualOpen(false);

      return;
    }

    changeIsManualOpen(true);
  }

  // マニュアルの開閉
  const manualRef = useRef(null)
  const [isManualOpen, changeIsManualOpen] = useState(false)

  // FAQチャットの開閉

  const [showTimeTable, setShowTimeTable] = useState(true);
  const [showTopBar, setShowTopBar] = useState(false);

  useEffect(() => {
    const data = getRoute(getCurrentRouteId())?.data;

    if (data && data?.checkShowTopbar) {
      setShowTopBar(true);

      return;
    }

    setShowTopBar(false);
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname === TopMenu.TRANSFER
      || location.pathname === TopMenu.CONFIRM_RS
      || location.pathname === TopMenu.CONFIRM_CANCEL
    ) {
      setShowTimeTable(false);

      return;
    }

    setShowTimeTable(true);
  }, [location.pathname])

  useOnClickOutside(manualRef, () => changeIsManualOpen(false)) // ボックス外クリックで閉じる

  const { isLoggingOut, logout } = useLogout();

  const showSwitchDepartment = (e) => {
    e.preventDefault();
  }

  return (
    <nav className='b-header' aria-label='アカウント' data-header=''>
      {(isLoggingOut) && <Loading />}

      <div
        className='b-header__account'
        aria-expanded={isMenuOpen}
        ref={menuRef}
      >
        <button
          className='b-header__account-button'
          type='button'
          aria-haspopup='menu'
          onClick={() => changeIsMenuOpen((isOpen) => !isOpen)}
        >

          <span className='b-header__account-second-line'>
            <img
              src='/public/assets/images/icons/user-primary-36.svg'
              alt=''
              width='18'
              height='18'
            />

            <img
              src='/public/assets/images/icons/arrow-primary-36.svg'
              alt=''
              width='18'
              height='18'
            />
          </span>
        </button>

        <div className='b-header__account-menu' aria-hidden={!isMenuOpen}>
          <ul className='b-header__account-menu-list'>
            <li className='b-header__account-menu-item'>
              <Link className='b-header__account-menu-button' to='_TBD_' onClick={showSwitchDepartment}>
                所属切替え
              </Link>
            </li>

            <li className='b-header__account-menu-item'>
              <form>
                <button
                  disabled={isLoggingOut}
                  className='b-header__account-menu-button'
                  type='button'
                  onClick={logout}
                >
                  ログアウト
                </button>
              </form>
            </li>
          </ul>
        </div>
      </div>

      {showTimeTable &&
        <ul className='b-header__list'>
          <li className='b-header__list-item'>
            <div
              className='b-header__dropdown'
              aria-expanded={isNoticeOpen}
              ref={noticeRef}
            >
              <button
                className={clsx('b-header__list-button', {
                  '-active': isActiveIcon,
                })}
                type='button'
                aria-haspopup='listbox'
                onClick={() => handleClickOpenNotice()}
              >
                <img
                  className='b-header__list-icon'
                  src={!isActiveIcon ? '/public/assets/images/icons/bell-primary-36.svg'
                    : '/public/assets/images/icons/bell-blue.svg'}
                  alt=''
                  width='18'
                  height='18'
                />
                お知らせ
              </button>

              <div
                className='b-header__dropdown-body'
                aria-hidden={!isNoticeOpen}
              >

              </div>
            </div>
          </li>

          {!showTopBar &&
            <li className='b-header__list-item'>
              <div
                className='b-header__dropdown'
                aria-expanded={isManualOpen}
                ref={manualRef}
              >
                <button
                  className='b-header__list-button'
                  type='button'
                  aria-haspopup='listbox'
                  onClick={() => handleClickOpenManyuaru()}
                >
                  <img
                    className='b-header__list-icon'
                    src='/public/assets/images/icons/help-circle-primary-36.svg'
                    alt=''
                    width='18'
                    height='18'
                  />
                  マニュアル
                </button>

                <div
                  className='b-header__dropdown-body'
                  aria-hidden={!isManualOpen}
                >
                  <ul className='b-header__manual-list'>

                  </ul>
                </div>
              </div>
            </li>
          }

        </ul >
      }
    </nav >
  )
}
