import { useEffect, useRef } from 'react'

/**
 * ref の外側クリックを検知する hooks
 * @param ref - RefObject
 * @param handler - 外側クリック時に実行されるコールバック
 */
export default function useOnFocusOutside(ref, handler) {
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }

      handlerRef.current(event)
    }

    document.addEventListener('focusout', listener)

    return () => {
      document.removeEventListener('focusout', listener)
    }
  }, [ref])
}
