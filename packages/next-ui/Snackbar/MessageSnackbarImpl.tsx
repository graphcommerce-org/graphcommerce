import { i18n } from '@lingui/core'
import {
  Fab,
  Snackbar,
  SnackbarContent,
  SnackbarProps,
  lighten,
  Box,
  SxProps,
  Theme,
  Portal,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IconSvg } from '../IconSvg'
import { extendableComponent, breakpointVal } from '../Styles'
import { iconClose, iconCheckmark, iconSadFace } from '../icons'
import iconInfo from '../icons/info.svg'

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
  /**
   * Dialogs are dismissed on page interaction, whilst popups remain open on page interaction and
   * can only be closed using the close button or escape key.
   */
  type?: 'dialog' | 'popup'
}

const name = 'MessageSnackbarImpl' as const
const parts = ['root', 'content', 'children', 'actionButton', 'close'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

// eslint-disable-next-line import/no-default-export
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
    severity = 'success',
    sx,
    type = 'dialog',
    ...snackbarProps
  } = props

  const classes = withState({ sticky, size, severity, variant })

  useEffect(() => {
    setShowSnackbar(!!open)
  }, [open])

  const hideSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (type === 'popup' && reason === 'clickaway') {
      return
    }

    setShowSnackbar(false)
    onClose?.()
  }

  const preventAnimationBubble = (
    e: React.TouchEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation()
    if (e.type === 'mousedown') {
      e.preventDefault()
    }
  }

  let icon = iconCheckmark
  if (severity === 'info') icon = iconInfo
  if (severity === 'error') icon = iconSadFace

  return (
    <Portal>
      <Snackbar
        {...snackbarProps}
        message={message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={showSnackbar}
        autoHideDuration={autoHide ? 5000 : null}
        className={classes.root}
        sx={sx}
        onClose={hideSnackbar}
      >
        <SnackbarContent
          elevation={16}
          className={classes.content}
          sx={(theme) => ({
            '&.variantPill': {
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              [theme.breakpoints.up('md')]: {
                ...breakpointVal(
                  'borderRadius',
                  theme.shape.borderRadius * 3,
                  theme.shape.borderRadius * 4,
                  theme.breakpoints.values,
                ),
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
                xs: `"icon children close"
                     "action action action"`,
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
                aria-label={i18n._(/* i18n */ 'Close')}
                size='small'
                onClick={hideSnackbar}
                onMouseDown={preventAnimationBubble}
                onTouchStart={preventAnimationBubble}
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
