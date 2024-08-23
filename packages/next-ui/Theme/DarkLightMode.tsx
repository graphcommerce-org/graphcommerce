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
  useColorScheme,
} from '@mui/material'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { IconSvg } from '../IconSvg'
import { iconMoon, iconSun } from '../icons'
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

export const colorModeContext = createContext(undefined as unknown as ColorModeContext)
colorModeContext.displayName = 'ColorModeContext'

type ThemeProviderProps = {
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

export function useColorMode() {
  return useContext(colorModeContext)
}

const toggle = (
  mode: ReturnType<typeof useColorScheme>['mode'],
  setMode: ReturnType<typeof useColorScheme>['setMode'],
) => {
  setMode(mode === 'light' ? 'dark' : 'light')
}

export function DarkLightModeToggleFab(props: Omit<FabProps, 'onClick'>) {
  const { mode, setMode, allColorSchemes } = useColorScheme()

  if (allColorSchemes.length < 2) {
    return null
  }

  return (
    <Fab
      size='large'
      color='inherit'
      onClick={() => {
        toggle(mode, setMode)
      }}
      {...props}
    >
      <IconSvg src={mode === 'light' ? iconMoon : iconSun} size='large' />
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
  const { mode, setMode, allColorSchemes } = useColorScheme()

  if (allColorSchemes.length < 2) {
    return null
  }

  return (
    <ListItemButton
      {...props}
      sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
      dense
      onClick={() => {
        toggle(mode, setMode)
      }}
    >
      <ListItemIcon sx={{ minWidth: 'unset', paddingRight: '8px' }}>
        <IconSvg src={mode === 'light' ? iconMoon : iconSun} size='medium' />
      </ListItemIcon>
      <ListItemText>
        {mode === 'light' ? <Trans id='Dark Mode' /> : <Trans id='Light Mode' />}
      </ListItemText>
    </ListItemButton>
  )
}
