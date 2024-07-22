import {
  AddProductsToCartForm,
  ProductListItemRenderer,
  RelatedProductsFragment,
} from '@graphcommerce/magento-product'
import {
  SidebarSlider,
  RenderType,
  responsiveVal,
  SidebarSliderProps,
} from '@graphcommerce/next-ui'
import { Typography } from '@mui/material'
import { RowProductFragment } from '../RowProduct.gql'

type RelatedProps = RowProductFragment &
  RelatedProductsFragment &
  Pick<SidebarSliderProps, 'sx'> & { productListItemRenderer: ProductListItemRenderer }

export function Related(props: RelatedProps) {
  const { title, related_products, productListItemRenderer, sx } = props

  if (!related_products || related_products.length === 0) return null

  return (
    <AddProductsToCartForm>
      <SidebarSlider sx={sx} sidebar={<Typography variant='h2'>{title}</Typography>}>
        {related_products?.map((item) =>
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
