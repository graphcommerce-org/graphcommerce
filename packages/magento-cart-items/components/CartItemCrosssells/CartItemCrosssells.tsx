import { AddProductsToCartForm, ProductListItemRenderer } from '@graphcommerce/magento-product'
import { responsiveVal, SidebarSlider, RenderType } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, SxProps, Theme, Typography } from '@mui/material'
import { CartItemsFragment } from '../../Api/CartItems.gql'

export type CartItemCrosssellsProps = {
  cart?: CartItemsFragment | null
  sx?: SxProps<Theme>
  renderer: ProductListItemRenderer
}

export function CartItemCrosssells(props: CartItemCrosssellsProps) {
  const { cart, renderer, sx = [] } = props

  const cartItem =
    cart?.items
      ?.slice()
      .reverse()
      .find(
        (item) => item?.product?.crosssell_products && item.product.crosssell_products.length > 0,
      ) ?? null

  const crosssells = cartItem?.product?.crosssell_products

  const crossSellsHideCartItems = Boolean(import.meta.graphCommerce.crossSellsHideCartItems)

  if (!crosssells || crosssells.length < 0 || crossSellsHideCartItems === true) return null

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
            '& .ProductListItem-topRight, .ProductListItem-topLeft, .ProductListItem-bottomLeft, .ProductListItem-subtitle':
              {
                display: 'none',
              },
            '& .Scroller-root': {
              gap: theme.spacings.xs,
              paddingRight: 0,
              gridAutoColumns: responsiveVal(125, 175),
            },
            '& .ProductListItem-titleContainer': {
              gridTemplateAreas: `"title title" "price price"`,
              gap: 0,
              mt: '4px',
            },
            '& .ProductListItem-title': {
              typography: 'body1',
            },
            '& .ProductListItem-title, .ProductListItem-subtitle': {
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            },
            '& .ProductListPrice-root': { width: '100%', textAlign: 'left' },
          })}
        >
          {crosssells.map(
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
