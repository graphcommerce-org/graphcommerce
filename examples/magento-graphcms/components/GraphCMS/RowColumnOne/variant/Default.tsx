import { RichText, RichTextProps } from '@graphcommerce/hygraph-ui'
import { ColumnOne } from '@graphcommerce/next-ui'
import type { RowColumnOneFragment } from '../RowColumnOne.gql'

type RowColumnOneProps = RowColumnOneFragment & {
  richTextOne?: Omit<RichTextProps, 'raw'>
}

export function Default(props: RowColumnOneProps) {
  const { colOne, richTextOne } = props

  return (
    <ColumnOne>
      <RichText {...colOne} {...richTextOne} />
    </ColumnOne>
  )
}
