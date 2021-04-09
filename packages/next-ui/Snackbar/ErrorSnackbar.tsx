import { Button } from '@material-ui/core'
import DefaultSnackbar, { DefaultSnackbarProps } from './DefaultSnackbar'

type ErrorSnackbarProps = Omit<DefaultSnackbarProps, 'severity' | 'action'>

export default function ErrorSnackbar(props: ErrorSnackbarProps) {
  return (
    <DefaultSnackbar
      {...props}
      Action={({ close }) => (
        <Button size='small' color='inherit' onClick={close}>
          Dismiss
        </Button>
      )}
    />
  )
}
