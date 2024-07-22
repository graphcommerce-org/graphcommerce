import { VariantMessage } from '@graphcommerce/next-ui'
import type { RowColumnOneFragment } from '../RowColumnOne.gql'
import { RichText } from '@graphcommerce/graphcms-ui'

type RowColumnOneProps = RowColumnOneFragment & {
  richTextOne?: Omit<RichTextProps, 'raw'>
}

export function Message(props: RowColumnOneProps) {
  const { colOne, richTextOne, id } = props

  return (
    <VariantMessage id={id}>
      <RichText {...colOne} {...richTextOne} />
    </VariantMessage>
  )
}
