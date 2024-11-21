import { Theme, useTheme } from '@mui/material'

export function layoutMaxWidths(theme: Theme) {
  const { layoutMaxWidth: appLayoutMaxWidth, contentMaxWidth: appContentMaxWidth } = theme.appShell
  const maxWidthSetting = import.meta.graphCommerce.layout?.maxWidth

  const layoutMaxWidth =
    maxWidthSetting === 'CONTAINED'
      ? {
          breakpoint: appLayoutMaxWidth,
          value: appLayoutMaxWidth && `${theme.breakpoints.values[appLayoutMaxWidth]}px`,
        }
      : false

  const contentMaxWidth =
    maxWidthSetting === 'CONTENT_ONLY' || maxWidthSetting === 'CONTAINED'
      ? {
          breakpoint: appContentMaxWidth,
          value: appContentMaxWidth && `${theme.breakpoints.values[appContentMaxWidth]}px`,
        }
      : false

  return { layoutMaxWidth, contentMaxWidth }
}

export const layoutConfig = import.meta.graphCommerce.layout ?? {}

export const useLayoutMaxWidths = () => {
  const theme = useTheme()
  return layoutMaxWidths(theme)
}
