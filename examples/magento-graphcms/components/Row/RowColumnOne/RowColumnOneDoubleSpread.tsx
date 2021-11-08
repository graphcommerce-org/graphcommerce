import RichTextDoubleSpread from '@graphcommerce/graphcms-ui/RichText/RichTextDoubleSpread'
import { ColumnOne } from '@graphcommerce/next-ui'
import React from 'react'
import { RowColumnOneFragment } from './RowColumnOne.graphql'

type RowColumnOneDoubleSpreadProps = RowColumnOneFragment

export default function RowColumnOneDoubleSpread(props: RowColumnOneDoubleSpreadProps) {
  const { colOne } = props
  return (
    <ColumnOne>
      <RichTextDoubleSpread {...colOne} />
    </ColumnOne>
  )
}
