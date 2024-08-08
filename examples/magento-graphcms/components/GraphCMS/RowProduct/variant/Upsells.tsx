import { AddProductsToCartForm } from '@graphcommerce/magento-product'
import {
  SidebarSlider,
  RenderType,
  responsiveVal,
  SidebarSliderProps,
} from '@graphcommerce/next-ui'
import { Typography } from '@mui/material'
import { productListRenderer } from '../../../ProductListItems/productListRenderer'
import type { RowProductPageProps } from '../RowProductPage'

type UpsellsProps = Omit<RowProductPageProps, 'productPageVariant'> & Pick<SidebarSliderProps, 'sx'>

export function Upsells(props: UpsellsProps) {
  const { title, product, sx } = props
  const { upsell_products } = product ?? {}

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
