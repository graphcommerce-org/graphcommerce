import { useMotionValue } from 'framer-motion'
import React, { useEffect } from 'react'

/** When an element is dragged it will still register clicks. */
export function useHandleClickNotDrag(elementRef: React.MutableRefObject<any>) {
  const movement = useMotionValue<'click' | 'drag' | null>(null)

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (elementRef.current && elementRef.current.contains(e.target)) {
        movement.set('click')
      }
    }

    const onMouseUp = () => {
      if (movement) {
        setTimeout(() => movement.set(null), 100)
      }
    }

    const onMouseMove = () => {
      if (movement.get() === 'click') movement.set('drag')
    }

    document.addEventListener('mouseup', onMouseUp, { passive: true })
    document.addEventListener('mousedown', onMouseDown, { passive: true })
    document.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => {
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [elementRef, movement])

  return movement
}
