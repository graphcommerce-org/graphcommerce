import { Box, ButtonBase, type SxProps, type Theme } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { forwardRef } from 'react'
import { extendableComponent } from '../Styles/extendableComponent'
import { responsiveVal } from '../Styles/responsiveVal'
import { sxx } from '../utils/sxx'

export type TabItemVariant = 'chrome'

export type TabItemProps = {
  /** Whether this tab is selected */
  selected: boolean
  /** Content to display inside the tab */
  children: React.ReactNode
  /** Click handler */
  onClick?: () => void

  /** Spacing for the tab */
  spacing?: string
  /** Custom styling */
  sx?: SxProps<Theme>
  /** Whether to disable ripple effect */
  disableRipple?: boolean
  /** Additional className */
  className?: string

  color: (theme: Theme) => string
  variant?: 'chrome'
}

type State = {
  selected: boolean
  variant: 'chrome'
}

const name = 'TabItem'
const parts = ['root', 'content'] as const
const { withState } = extendableComponent<State, typeof name, typeof parts>(name, parts)

export const TabItem = forwardRef<HTMLButtonElement, TabItemProps>((props, ref) => {
  const {
    selected,
    children,
    onClick,
    spacing = responsiveVal(4, 20),
    sx,
    disableRipple = true,
    className,
    color = (theme) => theme.palette.background.default,
    variant = 'chrome',
    ...other
  } = props

  const classes = withState({ selected, variant })

  return (
    <Box
      ref={ref}
      component={selected ? 'span' : ButtonBase}
      onClick={onClick}
      className={`${classes.root} ${className ?? ''}`}
      disableRipple={disableRipple}
      role='tab'
      aria-selected={selected}
      // tabindex={0}
      sx={sxx(
        (theme) => ({
          position: 'relative',
          textDecoration: 'none',
          color: 'text.primary',
          typography: 'subtitle1',
          mt: spacing,
          height: `calc(100% - ${spacing})`,
          pb: spacing,
          mx: `calc(${spacing} / 2)`,
          transition: 'background-color 0.2s ease-in-out',

          '&:hover:not(.selected) .TabItem-content': {
            bgcolor: alpha(color(theme), 0.5),
          },
          '&:focus:not(.selected) .TabItem-content': {
            bgcolor: alpha(color(theme), 0.5),
          },
          '&::before': {
            opacity: 0,
            transition: 'opacity 0.2s ease-in-out',
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '-10px',
            width: '10px',
            height: '10px',
            background: `radial-gradient(circle at top left, transparent 10px, ${color(theme)} 10px)`,
          },
          '&::after': {
            opacity: 0,
            transition: 'opacity 0.2s ease-in-out',
            content: '""',
            position: 'absolute',
            bottom: 0,
            right: '-10px',
            width: '10px',
            height: '10px',
            background: `radial-gradient(circle at top right, transparent 10px, ${color(theme)} 10px)`,
          },
          borderStartStartRadius: '0.5em',
          borderStartEndRadius: '0.5em',
          '&.selected': {
            bgcolor: color(theme),
            '&::before': { opacity: 1 },
            '&::after': { opacity: 1 },
          },
        }),
        sx,
      )}
      {...other}
    >
      <Box
        className={classes.content}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          px: spacing,
          gap: `calc(${spacing} / 2)`,
          borderRadius: '0.5em',
          transition: 'background-color 0.2s ease-in-out',
        }}
      >
        {children}
      </Box>
    </Box>
  )
})
