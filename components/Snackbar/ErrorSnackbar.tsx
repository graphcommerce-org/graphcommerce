import { Button } from '@material-ui/core'
import React from 'react'
import MessageSnackbar, { MessageSnackbarProps } from '.'

type ErrorSnackbarProps = Omit<MessageSnackbarProps, 'severity' | 'action'>

export default function ErrorSnackbar(props: ErrorSnackbarProps) {
  return (
    <MessageSnackbar
      severity='error'
      {...props}
      Action={({ close }) => (
        <Button size='small' color='inherit' onClick={close}>
          Dismiss
        </Button>
      )}
    />
  )
}
