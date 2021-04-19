import React from 'react'
import MessageSnackbar from './MessageSnackbar'
import { MessageSnackbarProps } from './MessageSnackbarImpl'

// We provide a loader for the ErrorSnackbar because it will only be required after an action of the user.
type ErrorSnackbarProps = Omit<MessageSnackbarProps, 'severity' | 'action'>

export default function ErrorSnackbarImpl(props: ErrorSnackbarProps) {
  return <MessageSnackbar {...props} />
}
