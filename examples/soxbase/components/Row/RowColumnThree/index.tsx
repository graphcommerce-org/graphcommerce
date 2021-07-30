import RichText from '@reachdigital/graphcms-ui/RichText'
import { ColumnThree } from '@reachdigital/next-ui'
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
