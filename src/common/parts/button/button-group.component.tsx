import React, { useState, useRef, useCallback, useLayoutEffect } from 'react';
import clsx from 'clsx';
import useOnClickOutside from 'app/hooks/use-on-click-outside.hook';
import { ButtonSubmit } from './button-submit.component'
import Button, { ButtonProps } from './button.component';

/**
 * Buttonコンポーネントに必要なpropsを指定しただけのコンポーネント
 */
export function ButtonGroupItem(props: ButtonProps) {
  return (
    <Button
      theme='none'
      size='l'
      {...props}
      className={`p-button-group__menu-button ${props.className}`}
    />
  )
}

/**
 * TODO: rename this function.
 */
export function ButtonSubmitGroupItem(props: ButtonProps) {
  return (
    <ButtonSubmit
      theme='none'
      size='l'
      {...props}
      className={`p-button-group__menu-button ${props.className}`}
    />
  )
}

interface ButtonGroupProps {
  id?: string;
  className?: string;
  children?: any;
  label?: string;
  theme: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'dangerSolid' | 'dark';

  size?: 's' | 'm' | 'l';

  direction?: 'toTop' | 'toBottom';

  /**
   * Default: false
   */
  disabled?: boolean;

  name?: string;
  subClass?: string;
  displayMenuOpen?: boolean;
}

export function ButtonGroup({
  id = undefined,
  className = '',
  children,
  label,
  theme = 'primary',
  disabled = false,
  name,
  size = 'l',
  direction = 'toTop',
  subClass,
  displayMenuOpen = false,
}: ButtonGroupProps) {
  // メニューの開閉
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
  const [isMenuOpen, changeIsMenuOpen] = useState(false)
  const ENTER_KEY_CODE = 13
  const SPACE_KEY_CODE = 32

  useOnClickOutside(menuRef, () => changeIsMenuOpen(false)) // ボックス外クリックで閉じる

  const listener = useCallback((event) => {
    if (
      (event.keyCode === ENTER_KEY_CODE || event.keyCode === SPACE_KEY_CODE)
      && menuRef.current && !menuRef.current.contains(event.target)
    ) {
      setTimeout(() => {
        changeIsMenuOpen(false);
        buttonRef.current?.focus();
      }, 200);
    }
  }, [])

  useLayoutEffect(() => {
    if (!isMenuOpen) return;

    document.addEventListener('keydown', listener)

    return () => document.removeEventListener('keydown', listener)
  }, [isMenuOpen, listener])

  return (
    <div
      className={clsx(
        `p-button-group ${className}`, {
        '-top': direction === 'toTop',
        '-bottom': direction === 'toBottom',
      })}
      ref={menuRef}
    >
      <Button
        id={id}
        label={label}
        theme={theme}
        size={size}
        className={clsx(`p-button-group__opener ${subClass}`)}
        onClick={() => changeIsMenuOpen((isMenuOpen) => !isMenuOpen)}
        disabled={disabled}
        name={name}
        buttonRef={buttonRef}
      />

      {!displayMenuOpen && isMenuOpen && <div className='p-button-group__menu'>{children}</div>}
    </div>
  )
}

/**
 * @deprecated remove this export later.
 */
export default ButtonGroup;