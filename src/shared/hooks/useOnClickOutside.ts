import type { RefObject } from 'react'

import { useEffect } from 'react'

type EventType = 'mousedown' | 'mouseup' | 'touchstart' | 'touchend'

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null> | Array<RefObject<T | null>>,
  handler: (event: MouseEvent | TouchEvent) => void,
  eventType: EventType = 'mousedown'
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node
      if (!target || !target.isConnected) {
        return
      }

      const refs = Array.isArray(ref) ? ref : [ref]
      const isOutside = refs.every(
        (r) => r.current && !r.current.contains(target)
      )

      if (isOutside) {
        handler(event)
      }
    }

    document.addEventListener(eventType, listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener(eventType, listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler, eventType])
}
