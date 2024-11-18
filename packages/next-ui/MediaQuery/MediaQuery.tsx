import { Box, BoxProps, Theme, useTheme } from '@mui/material'
import { useState, useEffect, useMemo } from 'react'

type MediaQueryProps = BoxProps<'div'> & {
  query: string | ((theme: Theme) => string)
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
export function MediaQuery(props: MediaQueryProps) {
  const { query, sx, children, ...elementProps } = props

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
    { display: 'none' },
    { [queryString]: { display: 'contents' } },
    ...(Array.isArray(sx) ? sx : [sx]),
  ]

  if (typeof window === 'undefined' || matches) {
    return (
      <Box data-media-query {...elementProps} sx={sxVal}>
        {children}
      </Box>
    )
  }

  return (
    <Box
      data-media-query
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: '' }}
      suppressHydrationWarning
      {...elementProps}
      sx={sxVal}
    />
  )
}
