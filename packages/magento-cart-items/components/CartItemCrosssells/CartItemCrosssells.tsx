import { useCrosssellItems } from '@graphcommerce/magento-cart/components/CartAdded/useCrosssellItems'
import {
  AddProductsToCartForm,
  ProductListItemRenderer,
  ProductScroller,
} from '@graphcommerce/magento-product'
import { responsiveVal } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, SxProps, Theme, Typography } from '@mui/material'

export type CartItemCrosssellsProps = {
  sx?: SxProps<Theme>
  renderer: ProductListItemRenderer
}

export function CartItemCrosssells(props: CartItemCrosssellsProps) {
  const { renderer, sx = [] } = props
  const [addedItem, crossSellItems] = useCrosssellItems()

  const crossSellsHideCartItems = Boolean(import.meta.graphCommerce.crossSellsHideCartItems)
  if (!crossSellItems || crossSellsHideCartItems === true) return null

  return (
    <Box sx={[(theme) => ({ mt: theme.spacings.sm }), ...(Array.isArray(sx) ? sx : [sx])]}>
      <Typography variant='h6' sx={(theme) => ({ mb: theme.spacings.xxs })}>
        <Trans id='Complete your purchase' />
      </Typography>

      <AddProductsToCartForm redirect={false} disableSuccessSnackbar>
        <ProductScroller
          productListRenderer={renderer}
          items={crossSellItems}
          sx={{
            marginBottom: 0,
            '& .Scroller-root': {
              paddingX: 0,
              gridAutoColumns: responsiveVal(150, 200),
            },
            '& .ProductListItem-titleContainer': {
              gridTemplateAreas: `"title title title" "subtitle subtitle price"`,
            },
          }}
        />
      </AddProductsToCartForm>
    </Box>
  )
}
