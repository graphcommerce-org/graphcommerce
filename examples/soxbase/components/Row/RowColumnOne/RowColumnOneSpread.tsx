import RichTextSpread from '@reachdigital/graphcms-ui/RichText/RichTextSpread'
import { ColumnOne } from '@reachdigital/next-ui'
import React from 'react'
import { RowColumnOneFragment } from './RowColumnOne.gql'

function RowColumnOneSpread(props: RowColumnOneFragment) {
  const { colOne } = props
  return (
    <ColumnOne>
      <RichTextSpread {...colOne} />
    </ColumnOne>
  )
}

export default RowColumnOneSpread
