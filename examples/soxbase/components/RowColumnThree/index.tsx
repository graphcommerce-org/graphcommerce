import { ContainerProps } from '@material-ui/core'
import RichText from '@reachdigital/graphcms-ui/RichText'
import { UseRichTextStyles } from '@reachdigital/graphcms-ui/RichText/useRichTextStyles'
import ColumnThree from '@reachdigital/next-ui/Row/ColumnThree'
import React from 'react'
import { RowColumnThreeFragment } from './RowColumnThree.gql'

export type RowColumnThreeProps = RowColumnThreeFragment &
  Omit<ContainerProps, 'children'> & {
    richTextOneClasses?: UseRichTextStyles['classes']
    richTextTwoClasses?: UseRichTextStyles['classes']
    richTextTheeClasses?: UseRichTextStyles['classes']
  }

export default function RowColumnThree(props: RowColumnThreeProps) {
  const {
    colOne,
    colTwo,
    colThree,
    richTextOneClasses,
    richTextTwoClasses,
    richTextTheeClasses,
    ...containerProps
  } = props

  return (
    <ColumnThree
      {...containerProps}
      colOneContent={<RichText {...colOne} classes={richTextOneClasses} />}
      colTwoContent={<RichText {...colTwo} classes={richTextTwoClasses} />}
      colThreeContent={<RichText {...colThree} classes={richTextTheeClasses} />}
    />
  )
}
