import { Theme, SnackbarProps, Typography, Fab } from '@material-ui/core'
import Checkmark from '@material-ui/icons/Check'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { SetRequired } from 'type-fest'
import Button from '../Button'
import PageLink from '../PageTransition/PageLink'
import PictureResponsiveNext from '../PictureResponsiveNext'
import responsiveVal from '../Styles/responsiveVal'

export type MessageSnackbarProps = Omit<
  SetRequired<SnackbarProps, 'message'>,
  'autoHideDuration' | 'onClose' | 'anchorOrigin' | 'children' | 'action'
>

const baseStyles = makeStyles(
  (theme: Theme) => ({
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
  { name: 'AddToCartSnackbar' },
)

export default function MessageSnackbar(props: MessageSnackbarProps) {
  const { ...baseProps } = props
  const { message } = baseProps

  const baseClasses = baseStyles()

  return (
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
    </div>
  )
}
