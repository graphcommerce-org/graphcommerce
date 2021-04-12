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

type SnackbarClassKey =
  | 'root'
  | 'message'
  | 'closeButton'
  | 'rounded'
  | 'roundedLarge'
  | 'roundedPrimary'

type ClassKeys = SnackbarClassKey | MuiSnackbarClassKey

const useStyles = makeStyles<
  Theme,
  BaseSnackbarProps & { classes?: { [index in SnackbarClassKey]?: string } },
  SnackbarClassKey
>(
  (theme: Theme) => ({
    root: {
      backgroundColor: 'transparent',
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
      [theme.breakpoints.down('lg')]: {
        width: '92%',
      },
      [theme.breakpoints.down('md')]: {
        width: '89%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      width: '95%',
    },
    closeButton: {
      marginRight: 10,
      [theme.breakpoints.down('sm')]: {
        position: 'absolute',
        top: 15,
        right: 15,
        '& .MuiSvgIcon-root': {
          height: 20,
        },
        '& .MuiFab-sizeMedium': {
          height: 38,
          width: 38,
        },
      },
    },
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
}

export default function MessageSnackbar(props: MessageSnackbarProps) {
  const [showSnackbar, setSnackbar] = useState<boolean>(false)
  const { classes = {}, ...baseProps } = props
  const { variant, size, color, children, autoHide, className, open, ...snackbarProps } = baseProps

  const { root, message, closeButton, rounded, roundedLarge, roundedPrimary } = classes

  const snackbarClasses = useStyles({
    classes: { root, message, closeButton, rounded, roundedLarge, roundedPrimary },
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
      classes={{ root: snackbarClasses.root }}
    >
      <SnackbarContent
        classes={{ message: snackbarClasses.message }}
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
          <div className={snackbarClasses.closeButton}>
            <Fab aria-label='Close snackbar' size='medium' onClick={() => setSnackbar(false)}>
              <CloseIcon />
            </Fab>
          </div>
        }
      />
    </Snackbar>
  )
}
