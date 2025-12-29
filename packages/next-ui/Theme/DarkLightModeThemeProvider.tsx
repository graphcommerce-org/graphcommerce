import { Trans } from '@lingui/react/macro'
import type { FabProps, ListItemButtonProps } from '@mui/material'
import { Fab, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useColorScheme } from '@mui/material/styles'
import { iconMoon, iconSun } from '../icons'
import { IconSvg } from '../IconSvg'

type Mode = 'dark' | 'light'

/**
 * Hook to get and set the color mode. Uses MUI's useColorScheme() when CSS variables are enabled.
 *
 * @public
 */
export function useColorMode() {
  const colorScheme = useColorScheme()

  if (!colorScheme.mode) {
    // CSS variables not enabled, return safe defaults
    return {
      userMode: 'light' as const,
      browserMode: 'light' as Mode,
      currentMode: 'light' as Mode,
      isSingleMode: true,
      toggle: () => {},
    }
  }

  const { mode, setMode, systemMode } = colorScheme
  const currentMode: Mode = mode === 'system' ? (systemMode ?? 'light') : mode

  return {
    userMode: mode,
    browserMode: (systemMode ?? 'light') as Mode,
    currentMode,
    isSingleMode: false,
    toggle: () => setMode(currentMode === 'light' ? 'dark' : 'light'),
  }
}

/** @public */
export function DarkLightModeToggleFab(props: Omit<FabProps, 'onClick'>) {
  const { currentMode, isSingleMode, toggle } = useColorMode()

  if (isSingleMode) {
    return null
  }

  return (
    <Fab size='large' color='inherit' onClick={toggle} {...props}>
      <IconSvg src={currentMode === 'light' ? iconMoon : iconSun} size='large' />
    </Fab>
  )
}

/**
 * A button that switches between light and dark mode
 *
 * @public
 */
export function DarkLightModeMenuSecondaryItem(props: ListItemButtonProps) {
  const { sx = [] } = props
  const { currentMode, isSingleMode, toggle } = useColorMode()

  if (isSingleMode) {
    return null
  }

  return (
    <ListItemButton {...props} sx={sx} dense onClick={toggle}>
      <ListItemIcon sx={{ minWidth: 'unset', paddingRight: '8px' }}>
        <IconSvg src={currentMode === 'light' ? iconMoon : iconSun} size='medium' />
      </ListItemIcon>
      <ListItemText>
        {currentMode === 'light' ? <Trans>Dark Mode</Trans> : <Trans>Light Mode</Trans>}
      </ListItemText>
    </ListItemButton>
  )
}

/**
 * @deprecated Use ThemeProvider from @mui/material with cssVariables enabled instead. The
 *   dark/light mode toggle now uses MUI's built-in useColorScheme() hook.
 */
export function DarkLightModeThemeProvider({ children }: { children: React.ReactNode }) {
  console.warn(
    'DarkLightModeThemeProvider is deprecated. Use ThemeProvider from @mui/material with cssVariables enabled instead.',
  )
  return children
}

/** @deprecated No longer needed, context is provided by MUI's ThemeProvider with cssVariables */
export const colorModeContext = null
