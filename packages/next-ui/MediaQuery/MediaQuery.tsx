import type { BoxProps, Theme } from '@mui/material'
import { Box, useTheme } from '@mui/material'
import type { CSSProperties } from 'react'
import { useEffect, useMemo, useState } from 'react'

type MediaQueryProps<C extends React.ElementType = 'div'> = BoxProps<C> & {
  /**
   * The media query to match.
   */
  query: string | ((theme: Theme) => string)
  /**
   * The display style to apply when the media query matches.
   *
   * @default 'contents'
   */
  display?: CSSProperties['display']
  /**
   * The content to render when the media query matches.
   *
   * It doesn't matter if the children are actual compontents or if they are forwarded from some other location.
   */
  children: React.ReactNode
}

/**
 * MediaQuery: Render (and hydrate) a Component based on a media query given.
 *
 * Example:
 *
 * ```tsx
 * <MediaQuery query={(theme) => theme.breakpoints.up('md')}>
 *   <MyExpensiveDesktopComponent>Only visisble on desktop</MyExpensiveDesktopComponent>
 * </MediaQuery>
 * ```
 *
 * Forwarded props also work:
 *
 * ```tsx
 * function MyComponent(props: { children: React.ReactNode }) {
 *   const { children } = props
 *   return <MediaQuery query={(theme) => theme.breakpoints.up('md')}>{children}</MediaQuery>
 * }
 * ```
 *
 * When to use:
 *
 * 1. useMediaQuery: When you are now using useMediaQuery to conditionally render content for mobile or desktop.
 *    a. Is very slow as it has to wait for the JS to initialize on pageload.
 *    b. Can cause CLS problems if the useMediaQuery is used to render elements in the viewport.
 *    c. Can cause LCP issues if useMediaQuery is used to render the LCP element.
 *    d. Causes TBT problems as a component always needs to be rerendered. (And bad TBT can cause INP problems)
 *    e. HTML isn't present in the DOM, which can cause SEO issues.
 *
 * 2. CSS Media query: When you are using CSS to show or hide content based on media queries.
 *    a. Causes TBT problems as both code paths need to be rendered. (And bad TBT can cause INP problems)
 *
 * How does it work?
 * It wraps the component in a div that has 'display: contents;' when shown and 'display: none;' when hidden so it should not interfere with other styling.
 * It conditionally hydrates the component if the query matches. If it doesn't match, it will NOT render the component (and thus not execute the JS).
 */
export function MediaQuery<Component extends React.ElementType = 'div'>(
  props: MediaQueryProps<Component>,
) {
  const { query, sx, children, display = 'contents', ...elementProps } = props

  const theme = useTheme()
  const queryString = typeof query === 'function' ? query(theme) : query

  const matchMedia = useMemo(
    () => globalThis.matchMedia?.(queryString.replace(/^@media( ?)/m, '')),
    [queryString],
  )

  const [matches, setMatches] = useState(matchMedia?.matches || false)

  useEffect(() => {
    if (matchMedia.matches) setMatches(true)

    const controller = new AbortController()
    matchMedia.addEventListener(
      'change',
      (e) => {
        if (e.matches) setMatches(true)
      },
      { signal: controller.signal, once: true },
    )
    return () => controller.abort()
  }, [matchMedia])

  const sxVal = [
    { display: 'none', [queryString]: { display } },
    ...(Array.isArray(sx) ? sx : [sx]),
  ]

  if (typeof window === 'undefined' || matches) {
    return (
      <Box {...elementProps} sx={sxVal}>
        {children}
      </Box>
    )
  }

  return (
    <Box
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: '' }}
      suppressHydrationWarning
      {...elementProps}
      sx={sxVal}
    />
  )
}
