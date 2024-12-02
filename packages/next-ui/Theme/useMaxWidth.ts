import type { Theme } from '@mui/material'
import { useTheme } from '@mui/material'

export function layoutMaxWidth(): boolean {
  return import.meta.graphCommerce.layoutMaxWidth === 'CONTAINED'
}

export function layoutMaxWidthContent(): boolean {
  return (
    import.meta.graphCommerce.layoutMaxWidth === 'CONTENT_ONLY' ||
    import.meta.graphCommerce.layoutMaxWidth === 'CONTAINED'
  )
}

export function maxWidth(theme: Theme) {
  const breakpoint = theme.appShell.maxWidth
  return {
    breakpoint,
    pixels: breakpoint ? `${theme.breakpoints.values[breakpoint]}px` : undefined,
  }
}

export function maxWidthContent(theme: Theme) {
  const breakpoint = theme.appShell.maxWidthContent
  return {
    breakpoint,
    pixels: breakpoint ? `${theme.breakpoints.values[breakpoint]}px` : undefined,
  }
}

export function useMaxWidth() {
  return maxWidth(useTheme())
}

export function useMaxWidthContent() {
  return maxWidthContent(useTheme())
}
