import React, { useEffect, useMemo } from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom';
import { Subscription } from 'rxjs';
import Tag from 'common/parts/tag/tag.component'
import { checkAccessSystemNoticeValid } from 'app/services/auth/notice.guard';

interface NoticeComponentProps {
  changeOpenNotice: (arg: boolean) => void;
  adminNotices: any;
  systemNotices: any;
  showLinkAdmin: boolean;
  showLinkSystem: boolean;
  isOnlySystem: boolean;
  isLoading: boolean;
}

export default function Notice({
  changeOpenNotice,
  adminNotices,
  systemNotices,
  showLinkAdmin,
  showLinkSystem,
  isOnlySystem,
  isLoading,
}: NoticeComponentProps) {
  let history = useHistory();

  const subscription = useMemo(() => new Subscription(), [])

  const showDetail = (notice) => () => {

  }

  useEffect(() => {
    return () => subscription.unsubscribe()
  }, [subscription])

  const handleClickSeeAll = () => {
    changeOpenNotice(false);

    if (isOnlySystem) {
      history.push({
        pathname: '/usp/oshirase-user',
        state: {
          noticeType: '',
        },
      })
    } else {
      history.push('/usp/oshirase-user');
    }
  }

  const handleClickAdminOshirase = () => {
    changeOpenNotice(false);
    history.push({
      pathname: '/usp/header/oshirase/admin',
      state: {
        referer: 'header',
      },
    })
  }

  const handleClickSystemOshirase = () => {
    changeOpenNotice(false);
    history.push({
      pathname: '/usp/header/oshirase/system',
      state: {
        referer: 'header',
      },
    })
  }

  const renderSystemNotice = () => {
    return (
      <section className={clsx('b-header-notice__section',
        { 'b-header-notice__section-empty': !systemNotices?.length })}>
        <h3 className='b-header-notice__section-title'>システムからのお知らせ</h3>

        <ul className='b-header-notice__list'>
          {systemNotices.map((notice, index) => (
            <li className='b-header-notice__list-item'
              key={index} onClick={notice.noticeMessage ? showDetail(notice) : undefined}>
              <time className='b-header-notice__time'>
                {notice.noticePublishStart}
              </time>

              {notice.noticeMessage ? (
                <button className='b-header-notice__link' type='button'>
                  {notice.noticeFixed === 1 && (
                    <img src='/public/assets/images/icons/pin-blue.svg' alt='固定' />
                  )}

                  {notice.noticeImportant === 1 && (
                    <Tag label='重要' theme='outline-red' />
                  )}

                  <span className='b-header-notice__text'>
                    {notice.noticeSubject}
                  </span>
                </button>
              ) : (
                <span className='b-header-notice__link'>
                  {notice.noticeFixed === 1 && (
                    <img src='/public/assets/images/icons/pin-blue.svg' alt='固定' />
                  )}

                  {notice.noticeImportant === 1 && (
                    <Tag label='重要' theme='outline-red' />
                  )}

                  <span className='b-header-notice__text'>
                    {notice.noticeSubject}
                  </span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>
    )
  }

  const renderAdminNotice = () => {
    return (
      <section className={clsx('b-header-notice__section',
        { 'b-header-notice__section-empty': !adminNotices?.length || !checkAccessSystemNoticeValid() })}>
        <h3 className='b-header-notice__section-title'>
          組織内管理者からのお知らせ
        </h3>

        {checkAccessSystemNoticeValid() &&
          <ul className='b-header-notice__list'>
            {adminNotices.map((notice, index) => (
              <li className='b-header-notice__list-item'
                key={index} onClick={notice.noticeMessage ? showDetail(notice) : undefined}>
                <time className='b-header-notice__time'>
                  {notice.noticePublishStart}
                </time>

                {notice.noticeMessage ? (
                  <button className='b-header-notice__link' type='button'>
                    {notice.noticeFixed === 1 && (
                      <img src='/public/assets/images/icons/pin-blue.svg' alt='固定' />
                    )}

                    {notice.noticeImportant === 1 && (
                      <Tag label='重要' theme='outline-red' />
                    )}

                    <span className='b-header-notice__text'>
                      {notice.noticeSubject}
                    </span>
                  </button>
                ) : (
                  <span className='b-header-notice__link'>
                    {notice.noticeFixed === 1 && (
                      <img src='/public/assets/images/icons/pin-blue.svg' alt='固定' />
                    )}

                    {notice.noticeImportant === 1 && (
                      <Tag label='重要' theme='outline-red' />
                    )}

                    <span className='b-header-notice__text'>
                      {notice.noticeSubject}
                    </span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        }
      </section>
    )
  }

  return (
    <section className='b-header-notice'>
      <h2 className='b-header-notice__title'>お知らせ</h2>

      {isLoading ? (
        <section className='b-header-notice__section -loading'>
          <h3 className='b-header-notice__section-title'>Loading...</h3>
        </section>
      ) : (
        <div className='b-header-notice__scroll-area'>
          <section className={clsx('b-header-notice__section',
            { 'b-header-notice__section-empty': !showLinkAdmin && !showLinkSystem })}>
            <h3 className='b-header-notice__section-title'>組織内管理者メニュー</h3>

            <ul className='b-header-notice__list -manager'>
              {showLinkAdmin && (
                <li className='b-header-notice__list-item'>
                  <button type='button' className='b-header-notice__link' onClick={() => handleClickAdminOshirase()}>
                    <span className='b-header-notice__text'>組織内管理者からのお知らせ投稿一覧</span>
                  </button>
                </li>
              )}

              {showLinkSystem && (
                <li className='b-header-notice__list-item'>
                  <button type='button' className='b-header-notice__link' onClick={() => handleClickSystemOshirase()}>
                    <span className='b-header-notice__text'>システムからのお知らせ投稿一覧</span>
                  </button>
                </li>
              )}
            </ul>
          </section>

          {renderAdminNotice()}

          {renderSystemNotice()}

          <div className='b-header-notice__all '>
            <button className='b-header-notice__link' onClick={() => handleClickSeeAll()}>
              <span className='b-header-notice__hidden-text'>お知らせを</span>
              すべて見る
            </button>
          </div>
        </div>
      )}

    </section>
  )
}
