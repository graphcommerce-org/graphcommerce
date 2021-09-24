import RichText from '@graphcommerce/graphcms-ui/RichText'
import { ColumnThree } from '@graphcommerce/next-ui'
import React from 'react'
import { RowColumnThreeFragment } from './RowColumnThree.gql'

export default function RowColumnThree(props: RowColumnThreeFragment) {
  const { colOne, colTwo, colThree } = props

  return (
    <ColumnThree
      colOneContent={<RichText {...colOne} />}
      colTwoContent={<RichText {...colTwo} />}
      colThreeContent={<RichText {...colThree} />}
    />
  )
}
