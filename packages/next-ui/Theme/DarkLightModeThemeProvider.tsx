import { Trans } from '@lingui/react'
import type { FabProps, ListItemButtonProps, Theme } from '@mui/material'
import {
  Fab,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider, // eslint-disable-next-line @typescript-eslint/no-restricted-imports
  useMediaQuery,
} from '@mui/material'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { iconMoon, iconSun } from '../icons'
import { IconSvg } from '../IconSvg'
import { getCssFlag, setCssFlag } from '../utils/cssFlags'

type Mode = 'dark' | 'light'
type UserMode = 'auto' | Mode

type ColorModeContext = {
  userMode: UserMode
  browserMode: Mode
  currentMode: Mode
  isSingleMode: boolean
  toggle: () => void
}

/** @public */
export const colorModeContext = createContext(undefined as unknown as ColorModeContext)
colorModeContext.displayName = 'ColorModeContext'

export type ThemeProviderProps = {
  children: React.ReactNode
  ssrMode?: Mode
  listenToBrowser?: boolean
} & (
  | { light: Theme; dark?: undefined }
  | { light?: undefined; dark: Theme }
  | { light: Theme; dark: Theme }
)

/**
 * Wrapper around `import { ThemeProvider } from '@mui/material'`
 *
 * The multi DarkLightModeThemeProvider allows switching between light and dark mode based on URL
 * and on user input.
 */
export function DarkLightModeThemeProvider(props: ThemeProviderProps) {
  const { children, light, dark, ssrMode = 'light', listenToBrowser = true } = props
  const [configuredMode, setConfiguredMode] = useState<UserMode>(listenToBrowser ? 'auto' : ssrMode)
  const setThemeMode = (mode: UserMode) => {
    setConfiguredMode(mode)
    setCssFlag('color-scheme', mode)
  }

  const browserMode: Mode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'

  // If the user has set a mode, use that. Otherwise, use the browser mode.
  const currentMode = configuredMode === 'auto' ? browserMode : configuredMode

  let theme: Theme = light || dark // Default
  if (light && currentMode === 'light') theme = light
  else if (dark) theme = dark

  useEffect(() => {
    const flag = getCssFlag('color-scheme') as Mode
    if (flag) setConfiguredMode(flag)
  }, [setConfiguredMode])

  // If a URL parameter is present, switch from auto to light or dark mode
  const { asPath } = useRouter()
  useEffect(() => {
    if (asPath.includes('darkmode')) setConfiguredMode('dark')
  }, [asPath])

  // Create the context
  const colorContext: ColorModeContext = useMemo(
    () => ({
      browserMode,
      userMode: configuredMode,
      currentMode,
      isSingleMode: !light || !dark,
      toggle: () => setThemeMode(currentMode === 'light' ? 'dark' : 'light'),
    }),
    [browserMode, configuredMode, currentMode, light, dark],
  )

  return (
    <colorModeContext.Provider value={colorContext}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </colorModeContext.Provider>
  )
}

/** @public */
export function useColorMode() {
  return useContext(colorModeContext)
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
 * To disable this functionality
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
