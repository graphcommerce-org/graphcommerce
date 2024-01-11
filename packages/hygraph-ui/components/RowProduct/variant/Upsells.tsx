import {
  AddProductsToCartForm,
  ProductListItemRenderer,
  UpsellProductsFragment,
} from '@graphcommerce/magento-product'
import {
  SidebarSlider,
  RenderType,
  responsiveVal,
  SidebarSliderProps,
} from '@graphcommerce/next-ui'
import { Typography } from '@mui/material'
import { RowProductFragment } from '../RowProduct.gql'

type UpsellsProps = RowProductFragment &
  UpsellProductsFragment &
  Pick<SidebarSliderProps, 'sx'> & { productListItemRenderer: ProductListItemRenderer }

export function Upsells(props: UpsellsProps) {
  const { title, upsell_products, productListItemRenderer, sx } = props

  if (!upsell_products || upsell_products.length === 0) return null

  return (
    <AddProductsToCartForm>
      <SidebarSlider sx={sx} sidebar={<Typography variant='h2'>{title}</Typography>}>
        {upsell_products?.map((item) =>
          item ? (
            <RenderType
              key={item.uid ?? ''}
              renderer={productListItemRenderer}
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
