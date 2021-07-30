import RichText from '@reachdigital/graphcms-ui/RichText'
import { UseRichTextStyles } from '@reachdigital/graphcms-ui/RichText/useRichTextStyles'
import { ColumnOne } from '@reachdigital/next-ui'
import React from 'react'
import type { RowColumnOneFragment } from './RowColumnOne.gql'

export type RowColumnOneProps = RowColumnOneFragment & {
  richTextOneClasses?: UseRichTextStyles['classes']
}

export default function RowColumnOne(props: RowColumnOneProps) {
  const { colOne, richTextOneClasses } = props

  return (
    <ColumnOne>
      <RichText {...colOne} classes={richTextOneClasses} />
    </ColumnOne>
  )
}
