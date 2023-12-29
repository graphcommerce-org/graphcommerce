import { RichText } from '../../RichText'
import {
  DismissibleSnackbar,
  DismissibleSnackbarProps,
} from '../../../Snackbar/DismissibleSnackbar'
import { RowColumnOneProps } from '../type'
import { Default } from './Default'

export type VariantMessageProps = DismissibleSnackbarProps

export function VariantMessage(props: VariantMessageProps) {
  const { ...rest } = props

  return <DismissibleSnackbar variant='pill' severity='info' disableBackdropClick {...rest} />
}

export function Message(props: RowColumnOneProps) {
  const { copy, id } = props

  if (id)
    return (
      <VariantMessage id={id}>
        <RichText {...copy} />
      </VariantMessage>
    )

  return Default(props)
}
