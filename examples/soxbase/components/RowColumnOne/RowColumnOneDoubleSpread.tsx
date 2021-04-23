import RichText from '@reachdigital/graphcms-ui/RichText'
import { ColumnOneStyles } from '@reachdigital/next-ui/Row/ColumnOne'
import ColumnOneDoubleSpread from '@reachdigital/next-ui/Row/ColumnOneDoubleSpread'
import React from 'react'
import { RowColumnOneFragment } from './RowColumnOne.gql'

type RowColumnOneSpreadProps = RowColumnOneFragment & ColumnOneStyles

export default function RowColumnOneDoubleSpread(props: RowColumnOneSpreadProps) {
  const { colOne } = props

  return (
    <ColumnOneDoubleSpread
      RichContent={(richTextOneClasses) => <RichText {...colOne} {...richTextOneClasses} />}
    />
  )
}
