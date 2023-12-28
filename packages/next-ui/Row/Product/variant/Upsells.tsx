import { AddProductsToCartForm, UpsellProductsFragment } from '@graphcommerce/magento-product'
import {
  SidebarSlider,
  RenderType,
  responsiveVal,
  SidebarSliderProps,
} from '@graphcommerce/next-ui'
import { Typography } from '@mui/material'
import { productListRenderer } from '../productListRenderer'
import { RowProductProps } from '../type'

type UpsellsProps = RowProductProps & UpsellProductsFragment & Pick<SidebarSliderProps, 'sx'>

export function Upsells(props: UpsellsProps) {
  const { title, upsell_products, sx } = props

  if (!upsell_products || upsell_products.length === 0) return null

  return (
    <AddProductsToCartForm>
      <SidebarSlider sx={sx} sidebar={<Typography variant='h2'>{title}</Typography>}>
        {upsell_products?.map((item) =>
          item ? (
            <RenderType
              key={item.uid ?? ''}
              renderer={productListRenderer}
              sizes={responsiveVal(200, 400)}
              titleComponent='h3'
              {...item}
            />
          ) : null,
        )}
      </SidebarSlider>
    </AddProductsToCartForm>
  )
}
