import {
  Snackbar,
  Theme,
  SnackbarClassKey as MuiSnackbarClassKey,
  SnackbarProps,
  SnackbarContent,
  Typography,
  Fab,
} from '@material-ui/core'
import Checkmark from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { SetRequired } from 'type-fest'
import Button from '../Button'
import PageLink from '../PageTransition/PageLink'
import PictureResponsiveNext from '../PictureResponsiveNext'
import responsiveVal from '../Styles/responsiveVal'

type BaseSnackbarProps = Omit<Parameters<typeof Snackbar>['0'], 'variant' | 'classes'> & {
  variant?: 'message' | 'outlined' | 'contained' | 'rounded'
}

type SnackbarClassKey = 'rounded' | 'roundedNoElevation' | 'roundedLarge' | 'roundedPrimary'

type ClassKeys = SnackbarClassKey | MuiSnackbarClassKey

export type MessageSnackbarProps = Omit<
  SetRequired<SnackbarProps, 'open' | 'message'>,
  'autoHideDuration' | 'onClose' | 'anchorOrigin' | 'children' | 'action'
> & {
  classes?: { [index in ClassKeys]?: string }
  autoHide?: boolean
  children?: React.ReactNode
  variant?: string
  size?: string
  closeButton?: React.ReactNode
  color?: string
}

const baseStyles = makeStyles(
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
    closeButton: {
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
    snackbarBody: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap',
      },
    },
    snackbarText: {
      width: '60%',
      display: 'flex',
      marginLeft: theme.spacings.xs,
      [theme.breakpoints.down('sm')]: {
        flexWrap: 'nowrap',
        width: '85%',
        marginLeft: 0,
      },
    },
    message: {
      width: '100%',
    },
    messageText: {
      fontWeight: 400,
      display: 'inline-flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      [theme.breakpoints.down('sm')]: {
        fontSize: responsiveVal(14, 22),
      },
      '& .MuiSvgIcon-root': {
        top: '.125em',
        position: 'relative',
        marginRight: 3,
        [theme.breakpoints.down('sm')]: {
          height: 20,
        },
      },
    },
    snackbarButton: {
      marginLeft: 'auto',
      marginRight: theme.spacings.xs,
      [theme.breakpoints.down('sm')]: {
        margin: '30px 0 20px 0',
        minWidth: '100%',
        '& .MuiPillButton-pill': {
          width: '100%',
          borderRadius: 0,
        },
      },
    },

    icon: {
      [theme.breakpoints.down('sm')]: {
        '& .MuiSvgIcon-root': {
          width: responsiveVal(20, 28),
          height: responsiveVal(20, 28),
        },
      },
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

export default function MessageSnackbar(props: MessageSnackbarProps) {
  const { classes = {}, ...baseProps } = props
  const { variant, size, message, className, autoHide, open, closeButton, color } = baseProps
  const [showSnackbar, setSnackbar] = useState<boolean>(false)

  useEffect(() => {
    if (open) setSnackbar(open)
  }, [open])

  const { rounded, roundedNoElevation, roundedLarge, roundedPrimary } = classes

  const snackbarClasses = snackbarStyles({
    classes: { rounded, roundedNoElevation, roundedLarge, roundedPrimary },
  })
  const baseClasses = baseStyles()

  return (
    <Snackbar
      message={message}
      open={showSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={autoHide ? 6000 : null}
      classes={{ root: baseClasses.root }}
    >
      <SnackbarContent
        classes={{ message: baseClasses.message }}
        className={clsx(
          {
            [snackbarClasses.rounded]: variant === 'rounded',
            [snackbarClasses.roundedLarge]: variant === 'rounded' && size === 'large',
            [snackbarClasses.roundedPrimary]: variant === 'rounded' && color === 'primary',
          },
          className,
        )}
        message={
          <div className={baseClasses.snackbarBody}>
            <div className={baseClasses.snackbarText}>
              {message && (
                <Typography component='h2' variant='h4' className={baseClasses.messageText}>
                  <span>
                    <Checkmark />
                    <b>{message}</b>&nbsp;has been added to your shopping cart!
                  </span>
                </Typography>
              )}
            </div>
            <div className={baseClasses.snackbarButton}>
              <PageLink href='/cart'>
                <Button
                  size='medium'
                  variant='pill'
                  color='secondary'
                  endIcon={
                    <PictureResponsiveNext
                      alt='desktop_chevron_right'
                      width={28}
                      height={28}
                      src='/icons/desktop_chevron_right_white.svg'
                      type='image/svg+xml'
                    />
                  }
                >
                  <Typography variant='body2' component='span'>
                    View shopping cart
                  </Typography>
                </Button>
              </PageLink>
            </div>
            {closeButton && (
              <div className={baseClasses.closeButton}>
                <Fab aria-label='Close snackbar' size='medium' onClick={() => setSnackbar(false)}>
                  <CloseIcon />
                </Fab>
              </div>
            )}
          </div>
        }
      />
    </Snackbar>
  )
}
