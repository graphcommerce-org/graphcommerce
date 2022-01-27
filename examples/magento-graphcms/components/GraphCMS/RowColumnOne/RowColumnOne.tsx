import { RichText, RichTextProps } from '@graphcommerce/graphcms-ui'
import { ColumnOne } from '@graphcommerce/next-ui'
import type { RowColumnOneFragment } from './RowColumnOne.gql'

export type RowColumnOneProps = RowColumnOneFragment & {
  richTextOne?: Omit<RichTextProps, 'raw'>
}

export function RowColumnOne(props: RowColumnOneProps) {
  const { colOne, richTextOne } = props

  return (
    <ColumnOne>
      <RichText {...colOne} {...richTextOne} />
    </ColumnOne>
  )
}
