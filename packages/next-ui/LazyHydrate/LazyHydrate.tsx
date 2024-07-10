import { Box, BoxProps } from '@mui/material'
import React, {
  useState,
  useRef,
  startTransition,
  useLayoutEffect,
  useEffect,
  CSSProperties,
} from 'react'

// Make sure the server doesn't choke on the useLayoutEffect
export const useLayoutEffect2 = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export type LazyHydrateProps = BoxProps<'div'> & {
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

  /**
   * By default LazyHydrate does not defer the rendering of components when they are rendered client
   * side, because using an IntersectionObserver on an element with no height, will cause all siblings to render at once.
   *
   * By proving a height, we can use the IntersectionObserver on the client as well.
   */
  height?: CSSProperties['height']
}

/**
 * LazyHydrate can defer the hydration of a component until it becomes visible.
 * OR manually by using the hydrated prop.
 * This can be a way to improve the TBT of a page.
 */
export function LazyHydrate(props: LazyHydrateProps) {
  const { hydrated, children, height, ...elementProps } = props
  const rootRef = useRef<HTMLDivElement>(null)

  const [isHydrated, setIsHydrated] = useState(hydrated || false)
  if (!isHydrated && hydrated) setIsHydrated(true)

  useLayoutEffect2(() => {
    // If we are manually hydrating, we watch that value and do not use the IntersectionObserver
    if (isHydrated || !rootRef.current) return undefined

    // If the element wasn't rendered on the server, we hydrate it immediately
    if (!height && !rootRef.current?.hasAttribute('data-lazy-hydrate')) {
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
      dangerouslySetInnerHTML={{ __html: '' }}
      suppressHydrationWarning
      {...elementProps}
      style={{ ...elementProps.style, height }}
    />
  )
}
