import {
  makeStyles,
  Snackbar,
  SnackbarContent,
  SnackbarProps,
  Fab,
  Theme,
  SnackbarClassKey as MuiSnackbarClassKey,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { SetRequired } from 'type-fest'

type BaseSnackbarProps = Omit<Parameters<typeof Snackbar>['0'], 'variant' | 'classes'> & {
  variant?: 'message' | 'outlined' | 'contained' | 'rounded'
}

type SnackbarClassKey = 'rounded' | 'roundedLarge' | 'roundedPrimary'

type ClassKeys = SnackbarClassKey | MuiSnackbarClassKey

const baseStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      backgroundColor: 'transparent',
      flexWrap: 'inherit',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        right: 0,
        bottom: 0,
      },
      [theme.breakpoints.down('xs')]: {
        left: 0,
      },
    },
    message: {
      padding: `${theme.spacings.xxs} 5px`,
      display: 'flex',
      flexWrap: 'inherit',
      [theme.breakpoints.down('sm')]: {
        minHeight: 116,
        width: '90%',
      },
    },
    action: {
      [theme.breakpoints.up('md')]: {
        minWidth: (props: MessageSnackbarProps) => (props.action ? 295 : 'auto'),
      },
    },
    actionContainer: {
      display: 'flex',
    },
    actionButton: {
      marginRight: 5,
      '& .MuiPillButton-pill': {
        width: '100%',
      },
      [theme.breakpoints.down('sm')]: {
        margin: `${theme.spacings.xs} 0 ${theme.spacings.xs} 0`,
        position: 'absolute',
        bottom: 0,
        left: 10,
        right: 10,
        '& .MuiPillButton-pill': {
          width: '100%',
          borderRadius: 0,
        },
      },
    },
    closeButton: {
      '& .MuiFab-sizeMedium': {
        height: 40,
        width: 40,
      },
      [theme.breakpoints.down('sm')]: {
        position: 'absolute',
        top: 10,
        right: 10,
        '& .MuiSvgIcon-root': {
          height: 20,
        },
        '& .MuiFab-sizeMedium': {
          height: 38,
          width: 38,
        },
      },
    },
  }),
  { name: 'BaseMessageSnackbar' },
)

const useStyles = makeStyles<
  Theme,
  BaseSnackbarProps & { classes?: { [index in SnackbarClassKey]?: string } },
  SnackbarClassKey
>(
  (theme: Theme) => ({
    rounded: {
      borderRadius: 50,
      [theme.breakpoints.down('sm')]: {
        borderRadius: 0,
      },
    },
    roundedLarge: {
      width: '70vw',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    roundedPrimary: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    roundedNoElevation: {
      boxShadow: 'none',
    },
  }),
  { name: 'MessageSnackbar' },
)

export type MessageSnackbarProps = Omit<
  SetRequired<SnackbarProps, 'open'>,
  'autoHideDuration' | 'onClose' | 'anchorOrigin' | 'children'
> & {
  classes?: { [index in ClassKeys]?: string }
  autoHide?: boolean
  children?: React.ReactNode
  variant?: 'message' | 'outlined' | 'contained' | 'rounded'
  size?: string
  closeButton?: React.ReactNode
  color?: string
  action?: React.ReactNode
}

export default function MessageSnackbar(props: MessageSnackbarProps) {
  const [showSnackbar, setSnackbar] = useState<boolean>(false)
  const { classes = {}, ...baseProps } = props
  const {
    variant,
    size,
    color,
    children,
    autoHide,
    action,
    className,
    open,
    ...snackbarProps
  } = baseProps

  const { rounded, roundedLarge, roundedPrimary } = classes

  const baseClasses = baseStyles(props)
  const snackbarClasses = useStyles({
    classes: { rounded, roundedLarge, roundedPrimary },
  })

  useEffect(() => {
    if (open) setSnackbar(open)
  }, [open])

  return (
    <Snackbar
      message={snackbarProps.message}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={showSnackbar}
      autoHideDuration={autoHide ? 6000 : null}
      classes={{ root: baseClasses.root }}
    >
      <SnackbarContent
        classes={{
          message: baseClasses.message,
          root: baseClasses.root,
          action: baseClasses.action,
        }}
        className={clsx(
          {
            [snackbarClasses.rounded]: variant === 'rounded',
            [snackbarClasses.roundedLarge]: variant === 'rounded' && size === 'large',
            [snackbarClasses.roundedPrimary]: variant === 'rounded' && color === 'primary',
          },
          className,
        )}
        message={children}
        action={
          <div className={baseClasses.actionContainer}>
            {action && <div className={baseClasses.actionButton}>{action}</div>}
            <div className={baseClasses.closeButton}>
              <Fab aria-label='Close snackbar' size='medium' onClick={() => setSnackbar(false)}>
                <CloseIcon />
              </Fab>
            </div>
          </div>
        }
      />
    </Snackbar>
  )
}
