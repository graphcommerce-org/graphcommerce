import {
  Snackbar,
  Theme,
  SnackbarClassKey as MuiSnackbarClassKey,
  SnackbarProps,
  SnackbarContent,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { SetRequired } from 'type-fest'
import PageLink from '../PageTransition/PageLink'

type ActionComponent = (props: { close: () => void }) => React.ReactElement

type BaseSnackbarProps = Omit<Parameters<typeof Snackbar>['0'], 'variant' | 'classes'> & {
  variant?: 'message' | 'outlined' | 'contained' | 'rounded'
}

type SnackbarClassKey =
  | 'root'
  | 'rounded'
  | 'roundedPrimary'
  | 'roundedNoElevation'
  | 'roundedLarge'

type ClassKeys = SnackbarClassKey | MuiSnackbarClassKey

export type MessageSnackbarProps = Omit<
  SetRequired<SnackbarProps, 'open' | 'message'>,
  'autoHideDuration' | 'onClose' | 'anchorOrigin' | 'children' | 'action'
> & {
  classes?: { [index in ClassKeys]?: string }
  autoHide?: boolean
  Action?: ActionComponent
  children?: React.ReactNode
  variant?: string
  size?: string
  icon?: React.ReactNode
  button?: React.ReactNode
  closeButton?: React.ReactNode
}

const baseStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      width: '100%',
      position: 'relative',
    },
    closeButton: {
      [theme.breakpoints.down('sm')]: {
        position: 'absolute',
        top: 0,
        right: 0,
      },
    },
    pillBody: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      width: '100%',
    },
    pillText: {
      display: 'flex',
    },
    pillActions: {
      marginLeft: 'auto',
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        margin: '0 auto',
      },
    },
    spacedButton: {
      marginRight: theme.spacings.xs,
    },
    message: {
      width: '100%',
    },
    messageText: {
      fontWeight: 400,
      marginLeft: theme.spacings.xs,
    },
  }),
  { name: 'BaseSnackbar' },
)

const snackbarStyles = makeStyles<
  Theme,
  BaseSnackbarProps & { classes?: { [index in SnackbarClassKey]?: string } },
  SnackbarClassKey
>(
  (theme: Theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.2)',
      color: theme.palette.text.primary,
    },
    rounded: {
      borderRadius: 50,
    },
    roundedLarge: {
      width: '70vw',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    roundedPrimary: {
      backgroundColor: theme.palette.background.paper,
    },
    roundedNoElevation: {
      boxShadow: 'none',
    },
  }),
  { name: 'MessageSnackbar' },
)

export default function MessageSnackbar(props: MessageSnackbarProps) {
  const { classes = {}, ...baseProps } = props
  const {
    icon,
    button,
    variant,
    color,
    size,
    message,
    className,
    children,
    autoHide,
    open,
    closeButton,
    Action,
    ...snackbarProps
  } = baseProps
  const [showSnackbar, setSnackbar] = useState<boolean>(false)

  useEffect(() => {
    if (open) setSnackbar(open)
  }, [open])

  const { root, rounded, roundedPrimary, roundedNoElevation, roundedLarge } = classes

  const snackbarClasses = snackbarStyles({
    classes: { root, rounded, roundedPrimary, roundedNoElevation, roundedLarge },
  })
  const baseClasses = baseStyles()

  return (
    <Snackbar
      message={message}
      open={showSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={autoHide ? 6000 : null}
      onClose={() => setSnackbar(false)}
      classes={{ root: snackbarClasses.root }}
      action={Action && <Action close={() => setSnackbar(false)} />}
      className={clsx(
        {
          [snackbarClasses.rounded]: variant === 'rounded',
          [snackbarClasses.roundedPrimary]: variant === 'rounded' && color === 'white',
          [snackbarClasses.roundedLarge]: variant === 'rounded' && size === 'large',
        },
        className,
      )}
    >
      <SnackbarContent
        classes={{ root: snackbarClasses.root, message: baseClasses.message }}
        className={clsx(
          {
            [snackbarClasses.rounded]: variant === 'rounded',
            [snackbarClasses.roundedPrimary]: variant === 'rounded' && color === 'white',
            [snackbarClasses.roundedLarge]: variant === 'rounded' && size === 'large',
          },
          className,
        )}
        message={
          <div className={baseClasses.pillBody}>
            <div className={baseClasses.pillText}>
              {icon && <>{icon}</>}
              {message && (
                <Typography component='h5' variant='h5' className={baseClasses.messageText}>
                  {message}
                </Typography>
              )}
            </div>
            <div className={baseClasses.pillActions}>
              {button && <div className={baseClasses.spacedButton}>{button}</div>}
              {closeButton && (
                <div
                  role='button'
                  tabIndex={0}
                  className={baseClasses.closeButton}
                  onKeyDown={() => setSnackbar(false)}
                  onClick={() => setSnackbar(false)}
                >
                  {closeButton}
                </div>
              )}
            </div>
          </div>
        }
      />
    </Snackbar>
  )
}
