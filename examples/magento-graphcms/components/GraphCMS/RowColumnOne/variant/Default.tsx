import { ColumnOne } from '@graphcommerce/next-ui'
import type { RowColumnOneFragment } from '../RowColumnOne.gql'
import { RichText, RichTextProps } from '@graphcommerce/graphcms-ui'

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
