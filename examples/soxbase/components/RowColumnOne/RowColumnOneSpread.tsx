import RichText from '@reachdigital/graphcms-ui/RichText'
import { ColumnOneStyles } from '@reachdigital/next-ui/Row/ColumnOne'
import ColumnOneSpread from '@reachdigital/next-ui/Row/ColumnOneSpread'
import React from 'react'
import { RowColumnOneFragment } from './RowColumnOne.gql'

type RowColumnOneSpreadProps = RowColumnOneFragment & ColumnOneStyles

function RowColumnOneSpread(props: RowColumnOneSpreadProps) {
  const { colOne } = props

  return (
    <ColumnOneSpread
      RichContent={(richTextOneClasses) => <RichText {...colOne} {...richTextOneClasses} />}
    />
  )
}

export default RowColumnOneSpread
