import { RichText } from '@graphcommerce/graphcms-ui'
import { VariantMessage } from '@graphcommerce/next-ui'
import { RowColumnOneProps } from '../type'

export function Message(props: RowColumnOneProps) {
  const { copy, id } = props

  return (
    <VariantMessage id={id}>
      <RichText {...copy} />
    </VariantMessage>
  )
}
