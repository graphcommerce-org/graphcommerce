import { Money } from '@graphcommerce/magento-store'
import { extendableComponent, SectionContainer } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box, Typography } from '@mui/material'
import type { InvoiceFragment } from './Invoice.gql'

export type InvoiceItemsProps = {
  invoice: InvoiceFragment
  sx?: SxProps<Theme>
}

const componentName = 'InvoiceItems'
const parts = ['root', 'invoiceItemsInnerContainer', 'itemRow', 'itemDetails'] as const
const { classes } = extendableComponent(componentName, parts)

export function InvoiceItems(props: InvoiceItemsProps) {
  const { invoice, sx = [] } = props
  const { items } = invoice

  if (!items?.length) return null

  return (
    <SectionContainer
      labelLeft={<Trans>Invoiced items</Trans>}
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
        className={classes.invoiceItemsInnerContainer}
        sx={(theme) => ({ mb: theme.spacings.md })}
      >
        {items.map((item) => {
          if (!item) return null
          const {
            id,
            product_name,
            product_sku,
            quantity_invoiced,
            product_sale_price,
            discounts,
          } = item

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
              <Box className={classes.itemDetails}>
                <Typography variant='subtitle1'>
                  {quantity_invoiced} ⨉ {product_name}
                </Typography>

                {/* {discounts?.map((discount) => (
                  <Typography key={discount?.label} variant='body2' color='textSecondary'>
                    {discount?.label}: <Money {...discount?.amount} />
                  </Typography>
                ))} */}
              </Box>
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
