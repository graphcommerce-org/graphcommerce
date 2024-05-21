import { Breakpoint, useTheme } from '@mui/material'
import { useMotionValue } from 'framer-motion'
import { useEffect, useMemo } from 'react'

export function useMatchMediaMotionValue(
  direction: 'up' | 'down',
  breakpointKey: number | Breakpoint,
) {
  const matchValue = useMotionValue(false)
  const theme = useTheme()
  const query = theme.breakpoints[direction](breakpointKey).replace(/^@media( ?)/m, '')

  useEffect(() => {
    const mql = globalThis?.matchMedia(query)
    const matcher = (e: MediaQueryListEvent) => matchValue.set(e.matches)
    mql.addEventListener('change', matcher)
    return () => mql.removeEventListener('change', matcher)
  }, [matchValue, query])

  return matchValue
}

export function useMatchMedia() {
  const theme = useTheme()

  return useMemo(() => {
    const callback = (direction: 'up' | 'down', breakpointKey: number | Breakpoint) =>
      window.matchMedia(theme.breakpoints[direction](breakpointKey).replace(/^@media( ?)/m, ''))
        .matches

    return {
      down: (key: number | Breakpoint) => callback('down', key),
      up: (key: number | Breakpoint) => callback('up', key),
    }
  }, [theme.breakpoints])
}
