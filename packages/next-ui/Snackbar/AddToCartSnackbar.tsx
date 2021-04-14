import { Theme, SnackbarProps } from '@material-ui/core'
import Checkmark from '@material-ui/icons/Check'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { SetRequired } from 'type-fest'
import responsiveVal from '../Styles/responsiveVal'

export type MessageSnackbarProps = Omit<
  SetRequired<SnackbarProps, 'message'>,
  'autoHideDuration' | 'onClose' | 'anchorOrigin' | 'children' | 'action'
>

const useStyles = makeStyles(
  (theme: Theme) => ({
    snackbarContent: {
      display: 'block',
    },
    icon: {
      top: '.125em',
      position: 'relative',
      height: 22,
    },
    messageText: {
      fontWeight: 400,
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      ...theme.typography.body1,
      [theme.breakpoints.down('sm')]: {
        fontSize: responsiveVal(14, 22),
      },
    },
  }),
  { name: 'AddToCartSnackbar' },
)

export default function MessageSnackbar(props: MessageSnackbarProps) {
  const { message } = props
  const classes = useStyles()

  return (
    <div className={classes.snackbarContent}>
      {message && (
        <div className={classes.messageText}>
          <span>
            <Checkmark className={classes.icon} />
            <b>{message}</b>&nbsp;has been added to your shopping cart!
          </span>
        </div>
      )}
    </div>
  )
}
