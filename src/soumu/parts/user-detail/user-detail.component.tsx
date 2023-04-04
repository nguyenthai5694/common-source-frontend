import React, { useState, useCallback, useRef } from 'react'
import clsx from 'clsx'

export default function UserDetail({ userItem, className = '' }) {
  const [isOpen, changeIsOpen] = useState(false)
  const ref = useRef(null)

  // ポジションを調整
  const changePosition = () => {
    const target = ref.current

    if (!target || !target.previousSibling) return

    const rect = target.previousSibling.getBoundingClientRect()

    target.style.top = rect.top + rect.height + 8 + 'px'
    target.style.left = rect.left - 2 + 'px'
  }

  // 閉じる設定
  const close = useCallback(() => {
    changeIsOpen(false)
    window.removeEventListener('scroll', changePosition, true)
  }, [])

  /**
   * 開く設定
   */
  const open = useCallback(() => {
    changeIsOpen(true)

    window.addEventListener('scroll', changePosition, true)
    changePosition()
  }, [])

  return (
    <i className={clsx(`p-user-detail ${className}`)}>
      <img
        className='p-user-detail__icon'
        src='/public/assets/images/icons/user-primary-36.svg'
        alt='属性確認'
        tabIndex={-1}
        onMouseEnter={open}
        onMouseLeave={close}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            e.preventDefault();

            return false;
          }
        }}
      />

      <span
        className={clsx('p-user-detail__list', {
          '-hide': !isOpen,
        })}
        ref={ref}
      >
        {userItem.map(
          (item, index) =>
          (
            <span key={index} className='p-user-detail__list-item'>
              <span id={item.itemId} className='p-user-detail__list-key h-width-52'>{item.key}</span>

              <span className='p-user-detail__list-value'>{item.value}</span>
            </span>
          ),
        )}
      </span>
    </i>
  )
}
