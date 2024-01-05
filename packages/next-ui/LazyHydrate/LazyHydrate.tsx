import React, { useState, useRef, useLayoutEffect, startTransition } from 'react'

function LazyHydrateClient(props: LazyHydrateProps) {
  const { hydrated, children } = props
  const rootRef = useRef<HTMLElement>(null)

  const [isHydrated, setIsHydrated] = useState(hydrated || false)
  if (!isHydrated && hydrated) setIsHydrated(true)

  useLayoutEffect(() => {
    // If we are manually hydrating, we watch that value and do not use the IntersectionObserver
    if (isHydrated || !rootRef.current) return undefined
    const wasRenderedServerSide = rootRef.current?.hasAttribute('data-lazy-hydrate')
    if (!wasRenderedServerSide) {
      setIsHydrated(true)
      return undefined
    }

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

  return !isHydrated ? (
    <section
      ref={rootRef}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: '' }}
      suppressHydrationWarning
    />
  ) : (
    <section>{children}</section>
  )
}

function LazyHydrateServer(props: { children: React.ReactNode }) {
  const { children } = props
  return <section data-lazy-hydrate>{children}</section>
}

export type LazyHydrateProps = {
  /**
   * The content is always rendered on the server. And on the client it keeps reference to the server state until the component is hydrated.
   */
  children: React.ReactNode

  /**
   * When a boolean is provided, the IntersectionObserver is disabled and hydrates the component when the value becomes true.
   *
   * For example:
   * - To Skip hydration altogether (when rendering a list of items and you want to skip the hydration for some of them): `<LazyHydrate hydrated={false}>`
   */
  hydrated?: boolean
}

/**
 * The LazyHydrate component is used to delay the hydration of a component until it is visible in the viewport OR until the hydrated prop becomes true.
 *
 * This improved the TBT of the page.
 */
export function LazyHydrate(props: LazyHydrateProps) {
  const { children, hydrated } = props
  return typeof window === 'undefined' ? (
    <LazyHydrateServer>{children}</LazyHydrateServer>
  ) : (
    <LazyHydrateClient hydrated={hydrated}>{children}</LazyHydrateClient>
  )
}
