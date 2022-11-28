import { useState, useCallback, useEffect } from 'react'

export function useMouseEvents(elementRef: React.MutableRefObject<any>) {
  const [movement, setMovement] = useState<'click' | 'drag' | null>(null)

  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      if (elementRef.current && elementRef.current?.contains(e.target)) {
        setMovement('click')
      }
    },
    [elementRef],
  )

  const onMouseUp = useCallback(() => {
    if (movement) {
      setTimeout(() => setMovement(null), 100)
    }
  }, [movement])

  const onMouseMove = useCallback(() => {
    if (movement === 'click') {
      setMovement('drag')
    }
  }, [movement])

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mousemove', onMouseMove)
    return () => {
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [onMouseMove, onMouseDown, onMouseUp])

  return {
    movement,
  }
}
