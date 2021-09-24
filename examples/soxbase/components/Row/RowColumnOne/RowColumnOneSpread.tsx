import RichTextSpread from '@graphcommerce/graphcms-ui/RichText/RichTextSpread'
import { ColumnOne } from '@graphcommerce/next-ui'
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
