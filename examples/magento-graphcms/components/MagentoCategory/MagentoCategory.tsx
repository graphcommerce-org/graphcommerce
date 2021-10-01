import { Typography } from '@mui/material'
import React from 'react'
import { MagentoCategoryFragment } from './MagentoCategory.gql'

type Props = MagentoCategoryFragment & JSX.IntrinsicElements['div']

export default function MagentoCategory(props: Props) {
  const { url, ...divProps } = props

  return (
    <div {...divProps} className={divProps.className}>
      <Typography variant='h2'>{url}</Typography>
      {/* <ProductListItemRenderer items={category?.products?.items ?? []} /> */}
    </div>
  )
}
