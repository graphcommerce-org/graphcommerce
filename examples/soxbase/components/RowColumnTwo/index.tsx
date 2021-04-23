import { ContainerProps } from '@material-ui/core'
import RichText from '@reachdigital/graphcms-ui/RichText'
import { UseRichTextStyles } from '@reachdigital/graphcms-ui/RichText/useRichTextStyles'
import ColumnTwo from '@reachdigital/next-ui/Row/ColumnTwo'
import React from 'react'
import { RowColumnTwoFragment } from './RowColumnTwo.gql'

export type RowColumnTwoProps = RowColumnTwoFragment &
  Omit<ContainerProps, 'children'> & {
    richTextOneClasses?: UseRichTextStyles['classes']
    richTextTwoClasses?: UseRichTextStyles['classes']
  }

export default function RowColumnTwo(props: RowColumnTwoProps) {
  const { colOne, colTwo, richTextOneClasses, richTextTwoClasses, ...containerProps } = props

  return (
    <ColumnTwo
      {...containerProps}
      colOneContent={<RichText {...colOne} classes={richTextOneClasses} />}
      colTwoContent={<RichText {...colTwo} classes={richTextTwoClasses} />}
    />
  )
}
