import { ColumnOneStyles } from '@reachdigital/next-ui/Row/ColumnOne'
import ColumnOneDoubleSpread from '@reachdigital/next-ui/Row/ColumnOneDoubleSpread'
import React from 'react'
import { RowColumnOneFragment } from './RowColumnOne.gql'
import { ColumnOneContent } from '.'

type RowColumnOneSpreadProps = RowColumnOneFragment & ColumnOneStyles

export default function RowColumnOneDoubleSpread(props: RowColumnOneSpreadProps) {
  const { colOne } = props

  return (
    <ColumnOneDoubleSpread
      Content={(richTextProps) => <ColumnOneContent {...colOne} {...richTextProps} />}
    />
  )
}
