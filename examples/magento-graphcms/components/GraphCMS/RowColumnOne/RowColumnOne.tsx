import { RichText, UseRichTextStyles } from '@graphcommerce/graphcms-ui'
import { ColumnOne } from '@graphcommerce/next-ui'
import type { RowColumnOneFragment } from './RowColumnOne.gql'

export type RowColumnOneProps = RowColumnOneFragment & {
  richTextOneClasses?: UseRichTextStyles['classes']
}

export function RowColumnOne(props: RowColumnOneProps) {
  const { colOne, richTextOneClasses } = props

  return (
    <ColumnOne>
      <RichText {...colOne} classes={richTextOneClasses} />
    </ColumnOne>
  )
}
