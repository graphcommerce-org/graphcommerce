import RichText from '@graphcommerce/graphcms-ui/RichText'
import { ColumnTwo } from '@graphcommerce/next-ui'
import React from 'react'
import { RowColumnTwoFragment } from './RowColumnTwo.gql'

export default function RowColumnTwo(props: RowColumnTwoFragment) {
  const { colOne, colTwo } = props

  return (
    <ColumnTwo colOneContent={<RichText {...colOne} />} colTwoContent={<RichText {...colTwo} />} />
  )
}
