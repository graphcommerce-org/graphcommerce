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
          sx={(theme) => ({
            mb: 0,
            '& .Scroller-root': {
              px: 0,
              gap: theme.spacings.xxs,
              gridAutoColumns: responsiveVal(125, 175),
            },
            '& .ProductListItem-titleContainer': {
              gridTemplateAreas: `"title title" "subtitle price"`,
            },
          })}
        />
      </AddProductsToCartForm>
    </Box>
  )
}
