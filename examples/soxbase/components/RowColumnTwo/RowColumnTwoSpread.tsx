import { isElementNode, isTextNode, Node } from '@reachdigital/graphcms-ui/RichText'
import RichTextColumns from '@reachdigital/graphcms-ui/RichText/RichTextColumns'
import ColumnTwoSpread from '@reachdigital/next-ui/Row/ColumnTwoSpread'
import React from 'react'
import { RowColumnTwoFragment } from './RowColumnTwo.gql'

function getNodeLength(node: Node): number {
  if (isElementNode(node))
    return node.children.map(getNodeLength).reduce<number>((prev, curr) => prev + curr, 0)

  if (isTextNode(node)) return node.text.length

  return 0
}

const getColumnCount = (props: RowColumnTwoFragment, columnId: number): number | undefined => {
  const colOneLength = getNodeLength(props.colOne.raw)
  const colTwoLength = getNodeLength(props.colTwo.raw)

  if (colOneLength >= colTwoLength && columnId === 1) return 2
  if (colOneLength >= colTwoLength && columnId === 2) return 1
  if (colOneLength < colTwoLength && columnId === 1) return 1
  if (colOneLength < colTwoLength && columnId === 2) return 2
}

function RowColumnTwoSpread(props: RowColumnTwoFragment) {
  const { colOne, colTwo } = props

  return (
    <ColumnTwoSpread
      {...props}
      nodeLength={getNodeLength(colOne.raw) >= getNodeLength(colTwo.raw) ?? false}
      colOneContent={<RichTextColumns {...colOne} columnCount={getColumnCount(props, 1) ?? 1} />}
      colTwoContent={<RichTextColumns {...colTwo} columnCount={getColumnCount(props, 2) ?? 1} />}
    />
  )
}

export default RowColumnTwoSpread
