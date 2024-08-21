import { breakpointVal, iconOrderBefore, IconSvg } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, darken, lighten } from '@mui/material'
import { UseAddProductsToCartActionFragment } from '../AddProductsToCart/UseAddProductsToCartAction.gql'

type ProductSidebarDeliveryProps = {
  product?: UseAddProductsToCartActionFragment
}

export function ProductSidebarDelivery(props: ProductSidebarDeliveryProps) {
  const { product } = props
  const { stock_status, only_x_left_in_stock } = product ?? {}

  let title = <Trans id='Order before 22:00' />
  let subtitle = <Trans id='Next day delivery - Shipping free' />

  if (stock_status === 'OUT_OF_STOCK') {
    title = <Trans id='Out of stock' />
    subtitle = <Trans id='We are sorry, this product is currently out of stock.' />
  } else if (stock_status === 'IN_STOCK' && only_x_left_in_stock) {
    title = <Trans id='Only a few left' />
    subtitle = (
      <Trans
        id='Only {amount_left_in_stock} left in stock.'
        values={{ amount_left_in_stock: only_x_left_in_stock }}
      />
    )
  }
  if (only_x_left_in_stock === 1) {
    subtitle = <Trans id='Only 1 left in stock.' />
  }

  return (
    <Box
      sx={(theme) => ({
        display: 'grid',
        alignItems: 'center',
        gridTemplate: `
          "image title"
          ".     subtitle"
        `,
        gridTemplateColumns: `min-content auto`,
        columnGap: theme.spacings.xxs,
        background: darken(theme.palette.background.default, 0.01),
        ...theme.applyStyles('dark', {
          background: lighten(theme.palette.background.default, 0.2),
        }),
        padding: theme.spacings.xxs,
        ...breakpointVal(
          'borderRadius',
          theme.shape.borderRadius * 3,
          theme.shape.borderRadius * 4,
          theme.breakpoints.values,
        ),
      })}
    >
      <IconSvg src={iconOrderBefore} size='small' sx={{ gridArea: 'image' }} />
      <Box sx={{ typography: 'body2', gridArea: 'title', fontWeight: 600 }}>{title}</Box>
      <Box sx={{ typography: 'body2', gridArea: 'subtitle', color: 'text.primary' }}>
        {subtitle}
      </Box>
    </Box>
  )
}
