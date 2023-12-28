import { AddProductsToCartForm, RelatedProductsFragment } from '@graphcommerce/magento-product'
import { responsiveVal } from '../../../Styles'
import { SidebarSlider, SidebarSliderProps } from '../../../FramerScroller/SidebarSlider'
import { RenderType } from '../../../RenderType/'
import { Typography } from '@mui/material'
import { productListRenderer } from '../productListRenderer'
import { RowProductProps } from '../type'

type RelatedProps = RowProductProps & RelatedProductsFragment & Pick<SidebarSliderProps, 'sx'>

export function Related(props: RelatedProps) {
  const { title, related_products, sx } = props

  if (!related_products || related_products.length === 0) return null

  return (
    <AddProductsToCartForm>
      <SidebarSlider sx={sx} sidebar={<Typography variant='h2'>{title}</Typography>}>
        {related_products?.map((item) =>
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
