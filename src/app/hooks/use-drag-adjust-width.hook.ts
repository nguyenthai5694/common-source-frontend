import { useCallback } from 'react';

export default function useDragAdjustWidth(
  el: HTMLDivElement,
  mouseMoveCallback?: any,
  mouseUpCallback?: any,
  touchMoveCallback?: any,
  touchEndCallback?: any,
) {
  return useCallback(() => {
    if (!el) {
      return;
    }

    const leftPadding = el.getBoundingClientRect().left

    const handleDrag = (e) => {
      const pageX = e.touches && e.touches[0] ? (e.touches[0].clientX || e.pageX) : e.pageX;
      const newWidth = pageX - leftPadding;

      el.setAttribute('style', `width: ${newWidth}px`);
    }

    const onMouseMove = (e) => {
      handleDrag(e)
      mouseMoveCallback && mouseMoveCallback()
    }

    const onTouchMove = e => {
      handleDrag(e)
      touchMoveCallback && touchMoveCallback()
    };

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('touchmove', onTouchMove)
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMouseMove)
      mouseUpCallback && mouseUpCallback()
    })
    document.addEventListener('touchend', () => {
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('mousemove', onMouseMove)
      touchEndCallback && touchEndCallback()
    })
  }, [el, mouseMoveCallback, mouseUpCallback, touchMoveCallback, touchEndCallback])
}
