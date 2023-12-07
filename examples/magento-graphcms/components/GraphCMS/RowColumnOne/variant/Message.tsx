import { RichText } from '@graphcommerce/graphcms-ui'
import { VariantMessage } from '@graphcommerce/next-ui'
import { RowColumnOneProps } from '../RowColumnOne'

export function Message(props: RowColumnOneProps) {
  const { colOne, id } = props

  return (
    <VariantMessage id={id}>
      <RichText {...colOne} />
    </VariantMessage>
  )
}
