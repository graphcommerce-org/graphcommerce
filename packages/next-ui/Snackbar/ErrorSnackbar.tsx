import { Button } from '@material-ui/core'
import MessageSnackbar, { MessageSnackbarProps } from './MessageSnackbar'

type ErrorSnackbarProps = Omit<MessageSnackbarProps, 'severity' | 'action'>

export default function ErrorSnackbar(props: ErrorSnackbarProps) {
  return (
    <MessageSnackbar
      {...props}
      Action={({ close }) => (
        <Button size='small' color='inherit' onClick={close}>
          Dismiss
        </Button>
      )}
    />
  )
}
