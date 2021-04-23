import RichText, { isElementNode, isTextNode, Node } from '@reachdigital/graphcms-ui/RichText'
import ColumnTwoSpread from '@reachdigital/next-ui/Row/ColumnTwoSpread'
import React from 'react'
import { RowColumnTwoProps } from '.'

function getNodeLength(node: Node): number {
  if (isElementNode(node))
    return node.children.map(getNodeLength).reduce<number>((prev, curr) => prev + curr, 0)

  if (isTextNode(node)) return node.text.length

  return 0
}

const getColumnCount = (props: RowColumnTwoProps, columnId: number): number | undefined => {
  const colOneLength = getNodeLength(props.colOne.raw)
  const colTwoLength = getNodeLength(props.colTwo.raw)

  if (colOneLength >= colTwoLength && columnId === 1) return 2
  if (colOneLength >= colTwoLength && columnId === 2) return 1
  if (colOneLength < colTwoLength && columnId === 1) return 1
  if (colOneLength < colTwoLength && columnId === 2) return 2
}

function RowColumnTwoSpread(props: RowColumnTwoProps) {
  const { colOne, colTwo } = props

  return (
    <ColumnTwoSpread
      {...props}
      columnCountOne={getColumnCount(props, 1) ?? 1}
      columnCountTwo={getColumnCount(props, 2) ?? 2}
      somethingWithNodeLength={getNodeLength(colOne.raw) >= getNodeLength(colTwo.raw) ?? false}
      ColContentOne={(richTextOneClasses) => <RichText {...colOne} {...richTextOneClasses} />}
      ColContentTwo={(richTextTwoClasses) => <RichText {...colTwo} {...richTextTwoClasses} />}
    />
  )
}

export default RowColumnTwoSpread
