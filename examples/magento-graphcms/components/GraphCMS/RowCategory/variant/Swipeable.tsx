import { AddProductsToCartForm } from '@graphcommerce/magento-product'
import {
  filterNonNullableKeys,
  RenderType,
  responsiveVal,
  SidebarSlider,
  SidebarSliderProps,
} from '@graphcommerce/next-ui'
import { Typography } from '@mui/material'
import { productListRenderer } from '../../../ProductListItems'
import { RowCategoryFragment } from '../RowCategory.gql'

type SwipeableProps = RowCategoryFragment & Pick<SidebarSliderProps, 'sx'>

export function Swipeable(props: SwipeableProps) {
  const { category, sx = [] } = props

  // const items = category?.products?.items
  if (!category || !category.products?.items) return null

  const { name } = category
  const items = filterNonNullableKeys(category.products.items)

  return (
    <AddProductsToCartForm>
      <SidebarSlider
        sx={[
          {
            [SidebarSlider.selectors.scroller]: {
              gridAutoColumns: `minmax(${responsiveVal(180, 800)}, 60vh)`,
            },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        sidebar={
          <Typography variant='h2' sx={{ textTransform: 'uppercase' }}>
            {name}
          </Typography>
        }
      >
        {items.map((item) => (
          <RenderType
            key={item.uid}
            renderer={productListRenderer}
            {...item}
            imageOnly
            sizes={responsiveVal(180, 900)}
          />
        ))}
      </SidebarSlider>
    </AddProductsToCartForm>
  )
}
