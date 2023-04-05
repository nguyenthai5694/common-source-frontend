import React, { useState, useRef } from 'react'
import clsx from 'clsx'
import useOnClickOutside from 'app/hooks/use-on-click-outside.hook'

/**
 * _Square button may be renamed to download button_
 */
interface SquareButtonProps {
  label?: string;

  className?: string;

  /**
   * Default: 'button'
   */
  type?: 'button' | 'submit';

  /**
   * Default: false
   */
  disabled?: boolean;

  icon?: any; // TODO: need more info

  href?: string;

  /**
   * Default: false
   */
  multi?: boolean;

  /**
   * Use when multi = true
   */
  items?: { label: string, href?: string, disabled?: boolean, onClick?: () => void }[];

  /**
   * Callback
   */
  onClick?: (e?: any) => void;

  /*
   * Default: left
   */
  textAlign?: 'left' | 'right'
}

export function SquareButton({
  className = '',
  label = 'ダウンロード',
  type = 'button',
  disabled = false,
  icon = 'download',
  textAlign = 'left',
  items,
  onClick = null,
}: SquareButtonProps) {
  // メニューの開閉
  const menuRef = useRef(null)
  const [isMenuOpen, changeIsMenuOpen] = useState(false)

  useOnClickOutside(menuRef, () => changeIsMenuOpen(false)) // ボックス外クリックで閉じる

  const handleClickButton = (e) => {
    if (items && items.length) {
      changeIsMenuOpen((isOpen) => !isOpen);

      return;
    }

    onClick && onClick(e);
  }

  return (
    <div
      className={`p-square-button ${className}`}
      aria-expanded={isMenuOpen}
      ref={menuRef}
    >
      <button
        type={type}
        disabled={disabled}
        className={clsx('p-square-button__button', {
          '-download': icon === 'download',
        })}
        aria-label={label}
        aria-haspopup='menu'
        onClick={handleClickButton}
      ></button>

      {items && items.length &&
        <div className='p-square-button__dropdown'>
          <ul className='p-square-button__list'>
            {items?.map((item, index) => (
              <li className='p-square-button__item' key={index}>
                {item.href && (
                  <a className='p-square-button__link' href={item.href} download>
                    {item.label}
                  </a>
                )}

                {item.onClick && (
                  <button disabled={item.disabled} type='button' className={clsx('p-square-button__link', {
                    '-disabled': item.disabled,
                    'h-text-left': textAlign === 'left',
                    'h-text-right': textAlign === 'right',
                  })} onClick={item.onClick}>
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  )
}

/**
 * @deprecated remove this export later.
 */
export default SquareButton;