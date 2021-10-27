import { RelatedProductsFragment } from '@graphcommerce/magento-product'
import {
  SidebarSlider,
  RenderType,
  responsiveVal,
  SidebarSliderProps,
} from '@graphcommerce/next-ui'
import { Typography } from '@material-ui/core'
import React from 'react'
import renderers from '../../../ProductListItems/renderers'
import { RowProductFragment } from '../RowProduct.gql'

type RelatedProps = RowProductFragment &
  RelatedProductsFragment &
  Pick<SidebarSliderProps, 'classes'>

export default function Related(props: RelatedProps) {
  const { title, related_products, classes } = props

  if (!related_products || related_products.length === 0) return null

  return (
    <SidebarSlider classes={classes} sidebar={<Typography variant='h2'>{title}</Typography>}>
      {related_products?.map((item) =>
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
