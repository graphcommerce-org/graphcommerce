import { Fab, makeStyles, Theme, Typography, SnackbarProps } from '@material-ui/core'
import Checkmark from '@material-ui/icons/Check'
import Chevron from '@material-ui/icons/ChevronRight'
import CloseIcon from '@material-ui/icons/Close'
import { useEffect, useState } from 'react'
import { SetRequired } from 'type-fest'
import OverlayPage from '../AppShell/OverlayUi'
import PageLink from '../PageTransition/PageLink'

const useStyles = makeStyles(
  (theme: Theme) => ({
    pillBody: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      width: '100%',
    },
    pillActions: {
      marginLeft: 'auto',
    },
    spacedButton: {
      marginRight: theme.spacings.xs,
    },
    message: {
      width: '100%',
    },
    checkmarkIcon: {
      marginLeft: theme.spacings.xs,
    },
    messageText: {
      fontWeight: 400,
      marginLeft: theme.spacings.xs,
    },
  }),
  { name: 'AddToCartSuccesSnackbar' },
)

export type MessageSnackbarProps = Omit<
  SetRequired<SnackbarProps, 'message'>,
  'autoHideDuration' | 'onClose' | 'anchorOrigin' | 'action'
> & {
  message: string
  autoHide?: boolean
  open: boolean
}

export default function AddToCartSuccessOverlay(props: MessageSnackbarProps) {
  const classes = useStyles()

  const { message, autoHide, open, ...snackbarProps } = props

  const [showSnackbar, setSnackbar] = useState<boolean>(false)

  useEffect(() => {
    if (open) setSnackbar(open)
  }, [open])

  return (
    <OverlayPage variant='bottom'>
      <div className={classes.pillBody}>
        <Checkmark fontSize='small' className={classes.checkmarkIcon} />
        <Typography component='h5' variant='h5' className={classes.messageText}>
          <b>{message}</b> has been added to your shopping cart!
        </Typography>
        <div className={classes.pillActions}>
          <PageLink href='/cart'>
            <Fab variant='extended' color='secondary' size='large' className={classes.spacedButton}>
              <Typography component='span'>View shopping cart</Typography>
              <Chevron />
            </Fab>
          </PageLink>
          <Fab aria-label='Close snackbar' size='medium' onClick={() => setSnackbar(false)}>
            <CloseIcon />
          </Fab>
        </div>
      </div>
    </OverlayPage>
  )
}
