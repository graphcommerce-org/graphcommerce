import RichText from '@reachdigital/graphcms-ui/RichText'
import { UseRichTextStyles } from '@reachdigital/graphcms-ui/RichText/useRichTextStyles'
import ColumnOne, { ColumnOneStyles } from '@reachdigital/next-ui/Row/ColumnOne'
import React from 'react'
import type { RowColumnOneFragment } from './RowColumnOne.gql'

export type RowColumnOneProps = RowColumnOneFragment & {
  richTextOneClasses?: UseRichTextStyles['classes']
} & ColumnOneStyles

export function ColumnOneContent(
  props: {
    richTextOneClasses?: UseRichTextStyles['classes']
  } & RowColumnOneFragment,
) {
  const { colOne, richTextOneClasses } = props

  return <RichText {...colOne} classes={richTextOneClasses} />
}

export default function RowColumnOne(props: RowColumnOneProps) {
  const { colOne, richTextOneClasses } = props

  return (
    <ColumnOne>
      <RichText {...colOne} classes={richTextOneClasses} />
    </ColumnOne>
  )
}
