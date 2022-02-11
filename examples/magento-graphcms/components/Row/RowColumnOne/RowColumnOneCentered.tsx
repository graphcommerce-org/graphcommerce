import RichText from '@graphcommerce/graphcms-ui/RichText'
import { ColumnOneCentered } from '@graphcommerce/next-ui'
import React from 'react'
import { RowColumnOneFragment } from './RowColumnOne.gql'

function RowColumnOneCentered(props: RowColumnOneFragment) {
  const { colOne } = props

  return (
    <ColumnOneCentered>
      <RichText {...colOne} />
    </ColumnOneCentered>
  )
}

export default RowColumnOneCentered
