import MessageSnackbar, { MessageSnackbarProps } from './MessageSnackbar'

type ErrorSnackbarProps = Omit<MessageSnackbarProps, 'severity' | 'action'>

export default function ErrorSnackbar(props: ErrorSnackbarProps) {
  return <MessageSnackbar {...props} />
}
