import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

interface RoundButtonProps {
  label?: string
  icon?: string
  hash?: string
  id?: string
  disable?: boolean,
  className?: string,
}

export function RoundButton({
  label = 'ページの先頭に戻る',
  icon = 'anchor',
  hash = '#root',
  disable = false,
  className = '',
  id,
}: RoundButtonProps) {
  const [hasModal, setHasModal] = useState(false)
  // this state only correct with modal size L

  useEffect(() => {
    const modalEl: HTMLElement = document.querySelector('.b-modal');
    const isModal = !modalEl?.hidden && !!modalEl;

    setHasModal(isModal)
  }, [])

  return (
    !disable &&
    <a
      id={id}
      className={clsx('p-round-button', className, {
        '-anchor': icon === 'anchor',
        '-has-modal': hasModal,
      })}
      href={hash}
      data-smooth-scroll
    >
      <span className='p-round-button__hidden-text'>{label}</span>
    </a>
  )
}

/**
 * @deprecated remove this export later.
 */
export default RoundButton;