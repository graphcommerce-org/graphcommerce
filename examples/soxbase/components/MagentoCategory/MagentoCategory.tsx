import { Typography } from '@material-ui/core'
import React from 'react'
import { MagentoCategoryFragment } from './MagentoCategory.gql'

type Props = MagentoCategoryFragment & JSX.IntrinsicElements['div']

export default function MagentoCategory(props: Props) {
  const { category, classes: noop, ...divProps } = props

  return (
    <div {...divProps} className={divProps.className}>
      <Typography variant='h2'>{category?.name}</Typography>
      {/* <ProductListItemRenderer items={category?.products?.items ?? []} /> */}
    </div>
  )
}
