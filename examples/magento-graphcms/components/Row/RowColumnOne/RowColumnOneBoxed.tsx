import RichText from '@graphcommerce/graphcms-ui/RichText'
import { ColumnOneBoxed } from '@graphcommerce/next-ui'
import React from 'react'
import { RowColumnOneFragment } from './RowColumnOne.gql'

function RowColumnOneBoxed(props: RowColumnOneFragment) {
  const { colOne } = props

  return (
    <ColumnOneBoxed>
      <RichText {...colOne} />
    </ColumnOneBoxed>
  )
}

export default RowColumnOneBoxed
