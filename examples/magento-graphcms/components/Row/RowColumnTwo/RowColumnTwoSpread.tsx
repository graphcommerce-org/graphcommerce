import { Node } from '@graphcommerce/graphcms-ui/RichText'
import RichTextColumns from '@graphcommerce/graphcms-ui/RichText/RichTextColumns'
import getNodeLength from '@graphcommerce/graphcms-ui/RichText/getNodeLength'
import { ColumnTwoSpread } from '@graphcommerce/next-ui'
import React from 'react'
import { RowColumnTwoFragment } from './RowColumnTwo.gql'

const getColumnCount = (props: RowColumnTwoFragment, columnId: number) => {
  const colOneLength = getNodeLength(props.colOne.raw as Node)
  const colTwoLength = getNodeLength(props.colTwo.raw as Node)

  if (colOneLength >= colTwoLength && columnId === 1) return 2
  if (colOneLength >= colTwoLength && columnId === 2) return 1
  if (colOneLength < colTwoLength && columnId === 1) return 1
  if (colOneLength < colTwoLength && columnId === 2) return 2
  return 1
}

function RowColumnTwoSpread(props: RowColumnTwoFragment) {
  const { colOne, colTwo } = props

  return (
    <ColumnTwoSpread
      {...props}
      nodeLength={getNodeLength(colOne.raw as Node) >= getNodeLength(colTwo.raw as Node) ?? false}
      colOneContent={<RichTextColumns {...colOne} columnCount={getColumnCount(props, 1)} />}
      colTwoContent={<RichTextColumns {...colTwo} columnCount={getColumnCount(props, 2)} />}
    />
  )
}

export default RowColumnTwoSpread
