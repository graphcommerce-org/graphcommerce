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
import { RowProductFragment } from '../RowProduct.gql'

type SwipeableProps = RowProductFragment & Pick<SidebarSliderProps, 'sx'>

export function Swipeable(props: SwipeableProps) {
  const { title, category, sx = [] } = props

  const items = category?.products?.items
  if (!items || items.length === 0) return null

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
            {title}
          </Typography>
        }
      >
        {items.map((item) => {
          if (!item) return null
          return (
            <RenderType
              key={item.uid ?? ''}
              renderer={productListRenderer}
              {...item}
              imageOnly
              sizes={responsiveVal(180, 900)}
            />
          )
        })}
      </SidebarSlider>
    </AddProductsToCartForm>
  )
}
