import { useCrosssellItems } from '@graphcommerce/magento-cart/components/CartAdded/useCrosssellItems'
import { AddProductsToCartForm, ProductListItemRenderer } from '@graphcommerce/magento-product'
import { responsiveVal, SidebarSlider, RenderType } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, SxProps, Theme, Typography } from '@mui/material'

export type CartItemCrosssellsProps = {
  sx?: SxProps<Theme>
  renderer: ProductListItemRenderer
}

export function CartItemCrosssells(props: CartItemCrosssellsProps) {
  const { renderer, sx = [] } = props
  // const sku = cart?.items?.[cart.items.length - 1]?.product?.sku
  const [addedItem, crossSellItems] = useCrosssellItems()

  const crossSellsHideCartItems = Boolean(import.meta.graphCommerce.crossSellsHideCartItems)
  if (!crossSellItems || crossSellsHideCartItems === true) return null

  return (
    <Box sx={[(theme) => ({ mt: theme.spacings.sm }), ...(Array.isArray(sx) ? sx : [sx])]}>
      <Typography variant='h6' sx={{ mb: '8px' }}>
        <Trans id='Complete your purchase' />
      </Typography>

      <AddProductsToCartForm redirect={false} disableSuccessSnackbar>
        <SidebarSlider
          buttonSize='responsiveMedium'
          showButtons='auto'
          sx={(theme) => ({
            marginBottom: 0,
            '& .Scroller-root': {
              gap: theme.spacings.xs,
              paddingX: 0,
              gridAutoColumns: responsiveVal(125, 175),
            },
            '& .ProductListItem-titleContainer': {
              gridTemplateAreas: `"title title" "subtitle price"`,
            },
            // '& .ProductListItem-title, .ProductListItem-subtitle': {
            //   textOverflow: 'ellipsis',
            //   overflow: 'hidden',
            //   whiteSpace: 'nowrap',
            // },
          })}
        >
          {crossSellItems.map(
            (item) =>
              item && (
                <RenderType
                  key={item.uid ?? ''}
                  renderer={renderer}
                  titleComponent='h3'
                  {...item}
                />
              ),
          )}
        </SidebarSlider>
      </AddProductsToCartForm>
    </Box>
  )
}
