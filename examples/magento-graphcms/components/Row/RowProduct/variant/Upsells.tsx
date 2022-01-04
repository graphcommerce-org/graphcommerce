import { UpsellProductsFragment } from '@graphcommerce/magento-product'
import {
  SidebarSlider,
  RenderType,
  responsiveVal,
  SidebarSliderProps,
} from '@graphcommerce/next-ui'
import { Typography } from '@mui/material'
import React from 'react'
import renderers from '../../../ProductListItems/renderers'
import { RowProductFragment } from '../RowProduct.gql'

type UpsellsProps = RowProductFragment &
  UpsellProductsFragment &
  Pick<SidebarSliderProps, 'classes'>

export default function Upsells(props: UpsellsProps) {
  const { title, upsell_products, classes } = props

  if (!upsell_products || upsell_products.length === 0) return null

  return (
    <SidebarSlider classes={classes} sidebar={<Typography variant='h2'>{title}</Typography>}>
      {upsell_products?.map((item) =>
        item ? (
          <RenderType
            key={item.uid ?? ''}
            renderer={renderers}
            sizes={responsiveVal(200, 400)}
            {...item}
          />
        ) : null,
      )}
    </SidebarSlider>
  )
}
