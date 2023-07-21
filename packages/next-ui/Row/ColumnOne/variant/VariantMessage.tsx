import { Portal } from '@mui/material'
import { MessageSnackbar, MessageSnackbarProps } from '../../../Snackbar/MessageSnackbar'

export type VariantMessageProps = MessageSnackbarProps

export function VariantMessage(props: VariantMessageProps) {
  return (
    <Portal>
      <MessageSnackbar open variant='pill' severity='info' {...props} />
    </Portal>
  )
}
