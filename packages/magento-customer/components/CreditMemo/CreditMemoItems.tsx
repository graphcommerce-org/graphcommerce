import { Money } from '@graphcommerce/magento-store'
import { extendableComponent, SectionContainer } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box, Typography } from '@mui/material'
import type { CreditMemoFragment } from './CreditMemo.gql'

export type CreditMemoItemsProps = {
  creditMemo: CreditMemoFragment
  sx?: SxProps<Theme>
}

const componentName = 'CreditMemoItems'
const parts = ['root', 'creditMemoItemsInnerContainer', 'itemRow', 'itemDetails'] as const
const { classes } = extendableComponent(componentName, parts)

export function CreditMemoItems(props: CreditMemoItemsProps) {
  const { creditMemo, sx = [] } = props
  const { items } = creditMemo

  if (!items?.length) return null

  return (
    <SectionContainer
      labelLeft={<Trans>Refunded items</Trans>}
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
        className={classes.creditMemoItemsInnerContainer}
        sx={(theme) => ({ mb: theme.spacings.md })}
      >
        {items.map((item) => {
          if (!item) return null
          const {
            id,
            product_name,
            product_sku,
            quantity_refunded,
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
                  {quantity_refunded} ⨉ {product_name}
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
