import { RichText } from '@graphcommerce/graphcms-ui'
import { VariantMessage } from '@graphcommerce/next-ui'
import { RowColumnOneFragment } from '../RowColumnOne.gql'

export function Message(props: RowColumnOneFragment) {
  const { colOne, id } = props

  return (
    <VariantMessage id={id}>
      <RichText {...colOne} />
    </VariantMessage>
  )
}
