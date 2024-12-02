import { useTheme } from '@mui/material'

export function useMaxWidth() {
  const theme = useTheme()
  const breakpoint = theme.appShell.maxWidth
  const maxWidth = breakpoint ? `${theme.breakpoints.values[breakpoint]}px` : false
  return { breakpoint, maxWidth }
}

export function useMaxWidthContent() {
  const theme = useTheme()
  const breakpoint = theme.appShell.maxWidthContent
  const maxWidth = breakpoint ? `${theme.breakpoints.values[breakpoint]}px` : false
  return { breakpoint, maxWidth }
}

export const layoutConfig = import.meta.graphCommerce.layout ?? {}
