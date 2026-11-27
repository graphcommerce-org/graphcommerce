import { useIsomorphicLayoutEffect } from '@graphcommerce/framer-utils'
import type { BoxProps } from '@mui/material'
import { Box } from '@mui/material'
import { cancelIdleCallback, requestIdleCallback } from 'next/dist/client/request-idle-callback'
import type { CSSProperties } from 'react'
import React, { startTransition, useRef, useState } from 'react'

export type LazyHydrateProps = BoxProps<'div'> & {
  /**
   * The content is always rendered on the server and on the client it uses the server rendered HTML
   * until it is hydrated.
   */
  children: React.ReactNode

  /**
   * When a boolean is provided, the IntersectionObserver is disabled and hydrates the component
   * when the value becomes true.
   *
   * For example:
   *
   * - Disable the hydration functionality completely: `<LazyHydrate hydrated={true}>`
   * - Hydrate the component on some state `<LazyHydrate hydrated={someState}>` where someState
   *   initially is false and later becomes true.
   */
  hydrated?: boolean

  /**
   * By default LazyHydrate does not defer the rendering of components when they are rendered client
   * side, because using an IntersectionObserver on an element with no height, will cause all
   * siblings to render at once.
   *
   * By proving a height, we can use the IntersectionObserver on the client as well. The content
   * still renders when the browser is idle, so find-in-page finds it.
   */
  height?: CSSProperties['height']
}

// React sets innerHTML again when this object changes, which removes the server-rendered HTML
const keepServerHtml = { __html: '' }

/**
 * LazyHydrate can defer the hydration of a component until it becomes visible. OR manually by using
 * the hydrated prop. This can be a way to improve the TBT of a page.
 */
export function LazyHydrate(props: LazyHydrateProps) {
  const { hydrated, children, height, ...elementProps } = props
  const rootRef = useRef<HTMLDivElement>(null)

  const [isHydrated, setIsHydrated] = useState(hydrated || false)
  if (!isHydrated && hydrated) setIsHydrated(true)

  useIsomorphicLayoutEffect(() => {
    // If we are manually hydrating, we watch that value and do not use the IntersectionObserver
    if (isHydrated || !rootRef.current) return undefined

    const serverRendered = rootRef.current.hasAttribute('data-lazy-hydrate')

    // If the element wasn't rendered on the server, we hydrate it immediately
    if (!height && !serverRendered) {
      setIsHydrated(true)
      return undefined
    }

    // The user has opted to manually hydrate the component
    if (hydrated !== undefined) return undefined

    const hydrate = () => startTransition(() => setIsHydrated(true))

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) hydrate()
      },
      { rootMargin: '200px' },
    )
    observer.observe(rootRef.current)

    // A client-rendered element stays empty until it renders, so render it when the browser is idle
    const idle = serverRendered ? undefined : requestIdleCallback(hydrate)

    return () => {
      observer.disconnect()
      if (idle !== undefined) cancelIdleCallback(idle)
    }
  }, [height, hydrated, isHydrated])

  if (isHydrated) {
    return <Box {...elementProps}>{children}</Box>
  }

  if (typeof window === 'undefined') {
    return (
      <Box data-lazy-hydrate {...elementProps}>
        {children}
      </Box>
    )
  }

  return (
    <Box
      ref={rootRef}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={keepServerHtml}
      suppressHydrationWarning
      {...elementProps}
      style={{ ...elementProps.style, height }}
    />
  )
}
