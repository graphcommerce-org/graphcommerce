import { useEffect, useState } from 'react'

export function useResizeObserver(ref: React.RefObject<HTMLElement>) {
  const [resizeObserverObject, setResizeObserverObject] = useState<
    ResizeObserverEntry | undefined
  >()

  useEffect(() => {
    if (!ref.current || ref.current === null) return () => {}
    const ro = new ResizeObserver(([entry]) => {
      console.log('entry', entry)
      setResizeObserverObject(entry)
    })
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [ref])

  return resizeObserverObject
}
