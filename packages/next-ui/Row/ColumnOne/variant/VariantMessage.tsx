import { Portal } from '@mui/material'
import { MessageSnackbar, MessageSnackbarProps } from '../../../Snackbar/MessageSnackbar'

export type VariantMessageProps = MessageSnackbarProps

export function VariantMessage(props: VariantMessageProps) {
  const { sx, ...rest } = props

  return (
    <Portal>
      <MessageSnackbar
        open
        variant='pill'
        severity='info'
        {...rest}
        sx={[
          {
            pointerEvents: 'none',
            '& > *': { pointerEvents: 'auto' },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      />
    </Portal>
  )
}
