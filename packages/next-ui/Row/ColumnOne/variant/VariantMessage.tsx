import type { DismissibleSnackbarProps } from '../../../Snackbar/DismissibleSnackbar'
import { DismissibleSnackbar } from '../../../Snackbar/DismissibleSnackbar'

export type VariantMessageProps = DismissibleSnackbarProps

export function VariantMessage(props: VariantMessageProps) {
  const { ...rest } = props

  return <DismissibleSnackbar variant='pill' severity='info' disableBackdropClick {...rest} />
}
