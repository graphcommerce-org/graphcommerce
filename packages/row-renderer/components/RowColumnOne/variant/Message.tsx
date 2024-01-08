import {
  DismissibleSnackbar,
  DismissibleSnackbarProps,
} from '@graphcommerce/next-ui/Snackbar/DismissibleSnackbar'
import { RowColumnOneProps } from '../type'
import { Default } from './Default'

export type VariantMessageProps = DismissibleSnackbarProps

export function VariantMessage(props: VariantMessageProps) {
  const { children, ...rest } = props

  return (
    <DismissibleSnackbar variant='pill' severity='info' disableBackdropClick {...rest}>
      {children}
    </DismissibleSnackbar>
  )
}

export function Message(props: RowColumnOneProps) {
  const { copy, id } = props

  if (id) return <VariantMessage id={id}>{copy as React.ReactElement}</VariantMessage>

  return Default(props)
}
