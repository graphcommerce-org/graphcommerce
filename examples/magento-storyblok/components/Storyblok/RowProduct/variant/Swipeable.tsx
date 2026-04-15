import { AddProductsToCartForm } from '@graphcommerce/magento-product'
import { RenderType, responsiveVal, SidebarSlider } from '@graphcommerce/next-ui'
import { Typography } from '@mui/material'
import { productListRenderer } from '../../../ProductListItems/productListRenderer'
import type { RowProductVariantProps } from '../RowProduct'

export function Swipeable(props: RowProductVariantProps) {
  const { blok, items } = props

  if (!items || items.length === 0) return null

  return (
    <AddProductsToCartForm>
      <SidebarSlider
        sx={{
          [SidebarSlider.selectors.scroller]: {
            gridAutoColumns: `minmax(${responsiveVal(180, 800)}, 60vh)`,
          },
        }}
        sidebar={
          <Typography variant='h2' sx={{ textTransform: 'uppercase' }}>
            {blok.title}
          </Typography>
        }
      >
        {items.map((item) =>
          item ? (
            <RenderType
              key={item.uid ?? ''}
              renderer={productListRenderer}
              {...item}
              imageOnly
              sizes={responsiveVal(180, 900)}
            />
          ) : null,
        )}
      </SidebarSlider>
    </AddProductsToCartForm>
  )
}
