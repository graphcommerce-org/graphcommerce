import React from 'react'
import MessageSnackbar from './MessageSnackbar'
import { MessageSnackbarImplProps } from './MessageSnackbarImpl'

type ErrorSnackbarProps = Omit<MessageSnackbarImplProps, 'severity' | 'action'>

export default function ErrorSnackbarImpl(props: ErrorSnackbarProps) {
  return <MessageSnackbar {...props} />
}
