import React, { ReactNode } from 'react'
import clsx from 'clsx'

export interface ButtonProps {
  id?: string;

  label?: string;

  /**
   * Default: 'button'
   */
  type?: 'button' | 'submit';

  /**
   * Default: 's'
   */
  size?: 's' | 'm' | 'l';

  /**
   * Default: 'primary'
   */
  theme?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'dangerSolid' | 'dark' | 'none';

  /**
   * Default: false
   */
  disabled?: boolean;

  icon?: any; // TODO: need more info

  iconName?: any; // TODO: need more info

  className?: string;

  onClick?: () => void;

  children?: ReactNode,

  // TODO: refactor

  component?: any;
  href?: string;
  target?: string;
  to?: string;
  name?: string;
  onMouseDown?: any;
  buttonRef?: any
}

export function Button({
  id,
  label,
  type = 'button',
  size = 's',
  theme = 'primary',
  disabled = false,
  icon,
  className = '',
  component = 'button',
  href = '',
  target = '_self',
  to = '',
  name,
  onClick = () => { },
  onMouseDown = () => { },
  children,
  buttonRef,
}: ButtonProps) {
  const cx = clsx(`p-button ${className}`, {
    '-small': size === 's',
    '-medium': size === 'm',
    '-large': size === 'l',
    '-primary': theme === 'primary',
    '-secondary': theme === 'secondary',
    '-tertiary': theme === 'tertiary',
    '-danger': theme === 'danger',
    '-danger-solid': theme === 'dangerSolid',
    '-dark': theme === 'dark',
    '-icon -plus': icon === 'plus',
    '-icon -edit': icon === 'edit',
    '-icon -download': icon === 'download',
    '-icon -search': icon === 'search',
    '-icon -blank': icon === 'blank',
    '-icon -draft': icon === 'draft',
    '-icon -change': icon === 'change',
    '-icon -trash': icon === 'trash',
    '-icon -change-light': icon === 'changeLight',
    '-disabled': disabled === true,
    '-icon -draft-light': icon === 'document',
  })

  return React.createElement(
    component,
    {
      id,
      type,
      disabled,
      className: cx,
      onClick,
      onMouseDown,
      href,
      target,
      to,
      name,
      children: children || label,
      formNoValidate: true,
      ref: buttonRef,
    },
  )
}

/**
 * @deprecated remove this export later.
 */
export default Button;