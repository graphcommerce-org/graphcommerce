import { RichText, RichTextProps } from '@graphcommerce/graphcms-ui'
import { VariantMessage } from '@graphcommerce/next-ui'
import type { RowColumnOneFragment } from '../RowColumnOne.gql'

type RowColumnOneProps = RowColumnOneFragment & {
  richTextOne?: Omit<RichTextProps, 'raw'>
}

export function Message(props: RowColumnOneProps) {
  const { colOne, richTextOne, id } = props

  return (
    <VariantMessage id={id} storageType='localStorage'>
      <RichText {...colOne} {...richTextOne} />
    </VariantMessage>
  )
}
