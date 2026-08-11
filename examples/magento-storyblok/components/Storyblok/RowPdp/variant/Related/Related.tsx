import { AddProductsToCartForm } from '@graphcommerce/magento-product'
import { RenderType, responsiveVal, SidebarSlider } from '@graphcommerce/next-ui'
import { Typography } from '@mui/material'
import { productListRenderer } from '../../../../ProductListItems/productListRenderer'
import type { RowPdpVariantProps } from '../../RowPdp'

export function Related(props: RowPdpVariantProps) {
  const { blok, related_products } = props

  if (!related_products || related_products.length === 0) return null

  return (
    <AddProductsToCartForm>
      <SidebarSlider sidebar={<Typography variant='h2'>{blok.title}</Typography>}>
        {related_products.map((item) =>
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
