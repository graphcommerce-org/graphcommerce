import { ColumnOneStyles } from '@reachdigital/next-ui/Row/ColumnOne'
import ColumnOneSpread from '@reachdigital/next-ui/Row/ColumnOneSpread'
import React from 'react'
import { RowColumnOneFragment } from './RowColumnOne.gql'
import { ColumnOneContent } from '.'

type RowColumnOneSpreadProps = RowColumnOneFragment & ColumnOneStyles

function RowColumnOneSpread(props: RowColumnOneSpreadProps) {
  const { colOne } = props

  return (
    <ColumnOneSpread
      Content={(richTextProps) => <ColumnOneContent {...colOne} {...richTextProps} />}
    />
  )
}

export default RowColumnOneSpread
