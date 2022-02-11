import RichText from '@graphcommerce/graphcms-ui/RichText'
import { ColumnOne } from '@graphcommerce/next-ui'
import React from 'react'
import type { RowColumnOneFragment } from './RowColumnOne.gql'


export default function RowColumnOne(props: RowColumnOneFragment) {
  const { colOne, richTextOneClasses } = props

  return (
    <ColumnOne>
      <RichText {...colOne} />
    </ColumnOne>
  )
}
