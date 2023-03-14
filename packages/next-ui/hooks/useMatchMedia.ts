import { Breakpoint, useTheme } from '@mui/material/styles'
import { useMemo } from 'react'

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
