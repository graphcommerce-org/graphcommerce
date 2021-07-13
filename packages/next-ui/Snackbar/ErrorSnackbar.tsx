import React from 'react'
import MessageSnackbar from './MessageSnackbar'
import { MessageSnackbarImplProps } from './MessageSnackbarImpl'

export type ErrorSnackbarProps = Omit<MessageSnackbarImplProps, 'severity' | 'action'>

export default function ErrorSnackbarImpl(props: ErrorSnackbarProps) {
  return <MessageSnackbar {...props} />
}
