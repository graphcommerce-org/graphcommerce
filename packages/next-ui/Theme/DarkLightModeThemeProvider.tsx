import { Trans } from '@lingui/react'
import {
  Theme,
  ThemeProvider,
  useMediaQuery,
  Fab,
  FabProps,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemButtonProps,
} from '@mui/material'
import { createContext, useContext, useMemo, useState } from 'react'
import { IconSvg } from '../IconSvg'
import { iconMoon, iconSun } from '../icons'

type Mode = 'dark' | 'light'
type UserMode = 'auto' | Mode

type ColorModeContext = {
  userMode: UserMode
  browserMode: Mode
  currentMode: Mode
  toggle: () => void
}

export const colorModeContext = createContext(undefined as unknown as ColorModeContext)
colorModeContext.displayName = 'ColorModeContext'

type ThemeProviderProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  light: Theme
  // eslint-disable-next-line react/no-unused-prop-types
  dark: Theme

  children: React.ReactNode
}

/**
 * Wrapper around `import { ThemeProvider } from '@mui/material'`
 *
 * The multi DarkLightModeThemeProvider allows switching between light and dark mode based on URL
 * and on user input.
 *
 * If you _just_ wan't a single theme, use the import { ThemeProvider } from '@mui/material'
 * instead.
 */
export function DarkLightModeThemeProvider(props: ThemeProviderProps) {
  const { children, light, dark } = props

  // todo: Save this in local storage
  const [userMode, setUserMode] = useState<UserMode>('auto')
  const browserMode: Mode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'

  // If the user has set a mode, use that. Otherwise, use the browser mode.
  const currentMode = userMode === 'auto' ? browserMode : userMode
  const theme = currentMode === 'light' ? light : dark

  // Create the context
  const colorContext: ColorModeContext = useMemo(
    () => ({
      browserMode,
      userMode,
      currentMode,
      toggle: () => setUserMode(currentMode === 'light' ? 'dark' : 'light'),
    }),
    [browserMode, currentMode, userMode],
  )

  return (
    <colorModeContext.Provider value={colorContext}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </colorModeContext.Provider>
  )
}

export function useColorMode() {
  return useContext(colorModeContext)
}

export function DarkLightModeToggleFab(props: Omit<FabProps, 'onClick'>) {
  const { currentMode, toggle } = useColorMode()
  return (
    <Fab size='large' color='inherit' onClick={toggle} {...props}>
      <IconSvg src={currentMode === 'light' ? iconMoon : iconSun} size='large' />
    </Fab>
  )
}

/**
 * A button that switches between light and dark mode
 *
 * To disable this functionality
 */
export function DarkLightModeMenuSecondaryItem(props: ListItemButtonProps) {
  const { sx = [] } = props
  const { currentMode, toggle } = useColorMode()

  return (
    <ListItemButton {...props} sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]} dense onClick={toggle}>
      <ListItemIcon sx={{ minWidth: 'unset', paddingRight: '8px' }}>
        <IconSvg src={currentMode === 'light' ? iconMoon : iconSun} size='medium' />
      </ListItemIcon>
      <ListItemText>
        {currentMode === 'light' ? <Trans id='Dark Mode' /> : <Trans id='Light Mode' />}
      </ListItemText>
    </ListItemButton>
  )
}
