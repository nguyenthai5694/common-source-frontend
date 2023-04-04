import React, { useState, useRef } from 'react'
import clsx from 'clsx'
import { calcScrollbarWidth } from 'soumu/blocks/datatable/table/table.config'
import useOnClickOutside from 'app/hooks/use-on-click-outside.hook'
import { placementCalculators } from './placement.service'
import { PopoverProps, PopoverHelper } from './popover.type'

const PIXEL_RIGHT: number = calcScrollbarWidth()

export * from './popover.type'
export const modalBodyClass = 'js-modal-body'
export const modalBodyInnerClass = 'js-modal-body-inner'

export default function Popover(props: PopoverProps) {
  const popoverRef = useRef(null);
  const popoverContentRef = useRef(null);
  const [isOpen, changeIsPopoverOpen] = useState(false);

  useOnClickOutside(popoverRef, (e) => {
    const target = e?.target
    const filterDetailEl = target?.querySelector('#filter_detail')
    const modalBodyInnerEl = target?.querySelector(`.${modalBodyInnerClass}`)

    if (target && isOpen && filterDetailEl && modalBodyInnerEl) {
      const scrollbarWidth = Math.floor(target?.offsetWidth - modalBodyInnerEl?.offsetWidth)
      const className = target?.className
      const rectModalElRight = target?.getBoundingClientRect()?.right
      const clientX = e?.clientX

      if (className && _.includes(className, modalBodyClass)
        && _.isNumber(clientX)
        && _.isNumber(scrollbarWidth)
        && scrollbarWidth > 0
        && clientX < rectModalElRight
        && clientX > rectModalElRight - PIXEL_RIGHT) {
        return
      }
    }

    !props.disableClickOutside && changeIsPopoverOpen(false)
  });

  const popoverContent = calculatePos(popoverRef, popoverContentRef, props);

  const popoverHelper: PopoverHelper = {
    toggle: () => changeIsPopoverOpen(isOpen => !isOpen),
    open: () => changeIsPopoverOpen(() => true),
    close: () => changeIsPopoverOpen(() => false),
    isOpen,
  };

  if (props.innerRef) {
    props.innerRef.current = popoverHelper;
  }

  return (
    <div
      className={clsx(`p-popover -${popoverContent.placement}`, props.className, { '-open': isOpen })}
      aria-expanded={isOpen}
      ref={popoverRef}
    >
      {/* simple case */}

      {props.toggleButton && (
        <span
          onClick={() => !props.hoverTrigger && changeIsPopoverOpen(isOpen => !isOpen)}
          onMouseOver={() => { props.hoverTrigger && changeIsPopoverOpen(true) }}
          onMouseLeave={() => { props.hoverTrigger && changeIsPopoverOpen(false) }}
          onFocus={() => { props.focusTrigger && changeIsPopoverOpen(true) }}
          onBlur={() => { props.focusTrigger && changeIsPopoverOpen(false) }}
        >
          {props.toggleButton}
        </span>
      )}

      {props.toggleButton && (
        <div ref={popoverContentRef} className='p-popover__content' style={popoverContent.style}>
          {props.children(popoverHelper)}
        </div>
      )}

      {/* complex case */}

      {!props.toggleButton && props.children(popoverHelper)}
    </div>
  )
}

function calculatePos(popoverRef, popoverContentRef, props) {
  let popoverContentStyle = {
    zIndex: 3,
    position: 'fixed' as 'fixed',
    top: 'auto', right: 'auto', bottom: 'auto', left: 'auto',
  };

  let placement = props.placement || 'bottom-right';

  if (!popoverRef.current || !popoverContentRef.current) {
    return {
      placement,
      style: popoverContentStyle,
    }
  }

  const popoverRect = popoverRef.current.getClientRects()[0] as DOMRect;
  const popoverContentRect = popoverContentRef.current.getClientRects()[0] as DOMRect;

  if (!popoverRect || !popoverContentRect) {
    return {
      placement,
      style: popoverContentStyle,
    }
  }

  let [ver, hoz] = placement.split('-');

  if (ver === 'middle') {
    const hozWidth = popoverRect.left + popoverRect.width + popoverContentRect.width;

    if (hoz === 'right' && hozWidth > window.innerWidth) {
      hoz = 'left';
    }
  } else if (ver === 'bottom') {
    if (hoz === 'right' && (popoverRect.left - popoverContentRect.width < 0)) {
      hoz = 'left';
    }

    if (window.innerHeight < popoverContentRect.bottom + popoverContentRect.height) {
      ver = 'top';
    }
  }

  placement = `${ver}-${hoz}`;

  return {
    placement,
    style: {
      ...popoverContentStyle,
      ...placementCalculators[placement](popoverRect, popoverContentRect),
    },
  };
}
