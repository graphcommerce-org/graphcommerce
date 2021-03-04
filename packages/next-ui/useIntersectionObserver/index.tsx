import { useState, RefObject, useEffect } from 'react'

export type UseIntersectionObserverOptions = {
  ref: RefObject<Element> | null
  rootRef?: RefObject<Element> | null
} & Pick<IntersectionObserverInit, 'rootMargin' | 'threshold'>

export default function useIntersectionObserver({
  ref,
  rootRef,
  rootMargin,
  threshold,
}: UseIntersectionObserverOptions) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | undefined>()

  const tresholdJson = JSON.stringify(threshold)
  useEffect(() => {
    if (typeof window === 'undefined' || !ref?.current) return () => {}

    const observer = new IntersectionObserver((entries) => setEntry(entries[entries.length - 1]), {
      root: rootRef?.current,
      rootMargin,
      threshold: JSON.parse(tresholdJson) as IntersectionObserverInit['threshold'],
    })

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, rootMargin, rootRef, tresholdJson])

  return entry
}
