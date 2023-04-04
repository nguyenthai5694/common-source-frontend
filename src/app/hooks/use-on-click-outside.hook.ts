import { useEffect, useRef } from 'react'
import { isIE } from 'app/services/navigator';

/**
 * ref の外側クリックを検知する hooks
 * @param ref - RefObject
 * @param handler - 外側クリック時に実行されるコールバック
 */
export default function useOnClickOutside(ref, handler) {
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    const listener = (event) => {
      if (isIE && event.target.tagName.toLowerCase() === 'input') {
        setTimeout(() => {
          event?.target.focus()
        })
      }

      if (!ref.current || ref.current.contains(event.target)) {
        return
      }

      handlerRef.current(event)
    }

    document.addEventListener('mousedown', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [ref])
}
