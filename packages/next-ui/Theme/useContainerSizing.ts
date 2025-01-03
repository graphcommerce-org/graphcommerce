import type { Theme } from '@mui/material'
import { useTheme } from '@mui/material'

function containerSizing(variant: ContainerSizingVariant, theme: Theme) {
  const breakpoint =
    variant === 'shell'
      ? theme.appShell.containerSizingShell
      : theme.appShell.containerSizingContent

  return {
    breakpoint,
    value: breakpoint ? `${theme.breakpoints.values[breakpoint]}px` : '100%',
  }
}

export type ContainerSizingVariant = 'shell' | 'content'
export function useContainerSizing(variant: ContainerSizingVariant) {
  const theme = useTheme()
  return containerSizing(variant, theme)
}
