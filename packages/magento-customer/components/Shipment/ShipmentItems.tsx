import { Money } from '@graphcommerce/magento-store'
import { extendableComponent, SectionContainer } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box, Typography } from '@mui/material'
import type { ShipmentFragment } from './Shipment.gql'

export type ShipmentItemsProps = {
  shipment: ShipmentFragment
  sx?: SxProps<Theme>
}

const componentName = 'ShipmentItems'
const parts = ['root', 'shipmentItemsInnerContainer', 'itemRow', 'itemDetails'] as const
const { classes } = extendableComponent(componentName, parts)

export function ShipmentItems(props: ShipmentItemsProps) {
  const { shipment, sx = [] } = props
  const { items } = shipment

  if (!items?.length) return null

  return (
    <SectionContainer
      labelLeft={<Trans>Shipped items</Trans>}
      className={classes.root}
      sx={[
        (theme) => ({
          marginTop: theme.spacings.md,
          marginBottom: theme.spacings.sm,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        className={classes.shipmentItemsInnerContainer}
        sx={(theme) => ({ mb: theme.spacings.md })}
      >
        {items.map((item) => {
          if (!item) return null
          const { id, product_name, product_sku, quantity_shipped, product_sale_price } = item

          return (
            <Box
              key={id}
              className={classes.itemRow}
              sx={(theme) => ({
                display: 'grid',
                gridTemplateColumns: '1fr auto auto',
                gap: theme.spacings.sm,
                padding: `${theme.spacings.xs} 0`,
                borderBottom: `1px solid ${theme.palette.divider}`,
                '&:last-child': {
                  borderBottom: 'none',
                },
                alignItems: 'center',
              })}
            >
              <Typography variant='subtitle1'>
                {quantity_shipped} ⨉ {product_name}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                <Trans>SKU: {product_sku}</Trans>
              </Typography>
              <Box sx={{ textAlign: 'right' }}>
                <Money {...product_sale_price} />
              </Box>
            </Box>
          )
        })}
      </Box>
    </SectionContainer>
  )
}
