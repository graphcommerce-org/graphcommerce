import { RefObject, useState, useRef, useEffect } from 'react'

type IntersectionObserverHookProps<T = HTMLElement> = {
  ref: RefObject<T>
} & IntersectionObserverInit

export const useIntersectionObserver = <T extends HTMLElement>({
  ref,
  ...options
}: IntersectionObserverHookProps<T>): IntersectionObserverEntry | undefined => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | undefined>(undefined)
  const observer = useRef<IntersectionObserver>()

  useEffect(() => {
    if (!ref.current) return undefined
    if (!observer.current) {
      observer.current = new IntersectionObserver(([observerEntry]) => {
        setEntry(observerEntry)
      }, options)
      observer.current.observe(ref.current)
    }

    return () => {
      if (observer.current) observer.current.disconnect()
    }
  }, [ref, options])

  return entry
}
