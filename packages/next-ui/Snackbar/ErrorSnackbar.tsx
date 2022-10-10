import { Trans } from '@lingui/react'
import { Button } from '@mui/material'
import { MessageSnackbar } from './MessageSnackbar'
import { MessageSnackbarProps } from './MessageSnackbarImpl'

export type ErrorSnackbarProps = MessageSnackbarProps

export function ErrorSnackbar(props: ErrorSnackbarProps) {
  const { action, ...passedProps } = props
  return (
    <MessageSnackbar
      variant='pill'
      severity='error'
      {...passedProps}
      action={
        action ?? (
          <Button size='medium' variant='pill' color='secondary' fullWidth>
            <Trans id='Ok' />
          </Button>
        )
      }
    />
  )
}
