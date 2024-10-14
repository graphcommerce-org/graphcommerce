import { Trans } from '@lingui/react'
import {
  Fab,
  FabProps,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemButtonProps,
  useColorScheme,
} from '@mui/material'
import { IconSvg } from '../IconSvg'
import { iconMoon, iconSun } from '../icons'

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
