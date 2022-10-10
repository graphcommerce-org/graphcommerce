import { AddProductsToCartForm, ProductListItemsFragment } from '@graphcommerce/magento-product'
import {
  RenderType,
  responsiveVal,
  SidebarSlider,
  SidebarSliderProps,
} from '@graphcommerce/next-ui'
import { Typography } from '@mui/material'
import { productListRenderer } from '../../../ProductListItems/productListRenderer'
import { RowProductFragment } from '../RowProduct.gql'

type SwipeableProps = RowProductFragment & ProductListItemsFragment & Pick<SidebarSliderProps, 'sx'>

export function Swipeable(props: SwipeableProps) {
  const { title, items, sx = [] } = props

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
        {items?.map((item) =>
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
