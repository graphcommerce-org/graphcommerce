import { Portal } from '@mui/base'
import {
  Fab,
  Snackbar,
  SnackbarContent,
  SnackbarProps,
  lighten,
  Box,
  SxProps,
  Theme,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IconSvg } from '../IconSvg'
import { extendableComponent } from '../Styles'
import { iconClose, iconCheckmark, iconSadFace } from '../icons'

type Size = 'normal' | 'wide'
type Variant = 'contained' | 'pill'

export type MessageSnackbarImplProps = Omit<
  SnackbarProps,
  'autoHideDuration' | 'anchorOrigin' | 'color'
> & {
  autoHide?: boolean
  action?: React.ReactNode
  children?: React.ReactNode
  onClose?: () => void
  sx?: SxProps<Theme>
} & OwnerState

type OwnerState = {
  sticky?: boolean
  size?: Size
  severity?: 'success' | 'info' | 'warning' | 'error'
  variant?: Variant
}

const name = 'MessageSnackbarImpl' as const
const parts = ['root', 'content', 'children', 'actionButton', 'close'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export default function MessageSnackbarImpl(props: MessageSnackbarImplProps) {
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false)

  const {
    variant = 'contained',
    size = 'normal',
    autoHide,
    action,
    open,
    message,
    sticky,
    children,
    onClose,
    severity = 'info',
    sx,
    ...snackbarProps
  } = props

  const classes = withState({ sticky, size, severity, variant })

  useEffect(() => {
    setShowSnackbar(!!open)
  }, [open])

  const hideSnackbar = () => {
    setShowSnackbar(false)
    onClose?.()
  }

  let icon = iconCheckmark
  if (severity === 'error') icon = iconSadFace

  return (
    <Portal>
      <Snackbar
        {...snackbarProps}
        message={message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={showSnackbar}
        autoHideDuration={autoHide ? 6000 : null}
        className={classes.root}
        sx={sx}
        onClose={hideSnackbar}
      >
        <SnackbarContent
          elevation={12}
          className={classes.content}
          sx={(theme) => ({
            '&.variantPill': {
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              [theme.breakpoints.up('md')]: {
                borderRadius: '99em',
              },
              padding: theme.spacings.xxs,
            },
            '& .MuiSnackbarContent-message': {
              width: '100%',
              padding: 0,
              display: 'grid',
              alignItems: 'center',
              gap: theme.spacings.xxs,
              gridTemplate: {
                xs: `"icon children close" "action action action"`,
                md: '"icon children action close"',
              },
              gridTemplateColumns: {
                xs: 'min-content 1fr auto',
                md: 'min-content 1fr max-content auto',
              },
              typography: 'subtitle1',
              '&.IconSvg': {
                gridArea: 'children',
              },
            },
          })}
          message={
            <>
              <IconSvg src={icon} size='large' />
              <Box gridArea='children'>{children}</Box>
              {/* </Box> */}
              {action && (
                <Box className={classes.actionButton} onClick={hideSnackbar} gridArea='action'>
                  {action}
                </Box>
              )}
              <Fab
                className={classes.close}
                aria-label='Close'
                size='small'
                onClick={hideSnackbar}
                sx={(theme) => ({
                  backgroundColor: lighten(theme.palette.background.paper, 0.1),
                })}
              >
                <IconSvg src={iconClose} />
              </Fab>
            </>
          }
        />
      </Snackbar>
    </Portal>
  )
}
