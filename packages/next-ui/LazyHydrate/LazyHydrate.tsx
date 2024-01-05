import React, { useState, useRef, startTransition, useLayoutEffect, useEffect } from 'react'

// Make sure the server doesn't choke on the useLayoutEffect
export const useLayoutEffect2 = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export type LazyHydrateProps = {
  /**
   * The content is always rendered on the server and on the client it uses the server rendered HTML until it is hydrated.
   */
  children: React.ReactNode

  /**
   * When a boolean is provided, the IntersectionObserver is disabled and hydrates the component when the value becomes true.
   *
   * For example:
   * - Disable the hydration functionality completely: `<LazyHydrate hydrated={true}>`
   * - Hydrate the component on some state `<LazyHydrate hydrated={someState}>` where someState initially is false and later becomes true.
   */
  hydrated?: boolean
}

/**
 * LazyHydrate can defer the hydration of a component until it becomes visible.
 * OR manually by using the hydrated prop.
 * This can be a way to improve the TBT of a page.
 */
export function LazyHydrate(props: LazyHydrateProps) {
  const { hydrated, children } = props
  const rootRef = useRef<HTMLElement>(null)

  const [isHydrated, setIsHydrated] = useState(hydrated || false)
  if (!isHydrated && hydrated) setIsHydrated(true)

  useLayoutEffect2(() => {
    // If we are manually hydrating, we watch that value and do not use the IntersectionObserver
    if (isHydrated || !rootRef.current) return undefined

    // If the element wasn't rendered on the server, we hydrate it immediately
    if (!rootRef.current?.hasAttribute('data-lazy-hydrate')) {
      setIsHydrated(true)
      return undefined
    }

    // The user has opted to manually hydrate the component
    if (hydrated !== undefined) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          startTransition(() => setIsHydrated(true))
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(rootRef.current)

    return () => observer.disconnect()
  }, [hydrated, isHydrated])

  if (typeof window === 'undefined') {
    return <section data-lazy-hydrate>{children}</section>
  }

  if (!isHydrated) {
    return (
      // eslint-disable-next-line react/no-danger
      <section ref={rootRef} dangerouslySetInnerHTML={{ __html: '' }} suppressHydrationWarning />
    )
  }

  return <section suppressHydrationWarning>{children}</section>
}
