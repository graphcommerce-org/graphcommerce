import { useState, RefObject, useEffect } from 'react'

export type UseIntersectionObserverOptions = {
  ref: RefObject<Element> | null
  options?: IntersectionObserverInit
}

export default function useIntersectionObserver({ ref, options }: UseIntersectionObserverOptions) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | undefined>()

  useEffect(() => {
    if (typeof window === 'undefined' || !ref?.current) return () => {}

    const observer = new IntersectionObserver(
      (entries) => setEntry(entries[entries.length - 1]),
      options,
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [options, ref])

  return entry
}
