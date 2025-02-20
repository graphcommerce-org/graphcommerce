import { Money } from '@graphcommerce/magento-store'
import { breakpointVal, extendableComponent, sxx } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import type { SxProps, Theme } from '@mui/material'
import { Box, Divider, lighten, Typography } from '@mui/material'
import type { OrderTotalsFragment } from './OrderTotals.gql'

export type OrderTotalsProps = {
  order: OrderTotalsFragment
  sx?: SxProps<Theme>
  additionalSubtotals?: React.ReactNode
  additionalGrandTotals?: React.ReactNode
  additionalTaxes?: React.ReactNode
}

const componentName = 'OrderTotals'
const parts = ['totalsContainer', 'totalsRow', 'totalsDivider', 'totalsVat'] as const
const { classes } = extendableComponent(componentName, parts)

export function OrderTotals(props: OrderTotalsProps) {
  const { order, sx = [], additionalSubtotals, additionalGrandTotals, additionalTaxes } = props
  const { total, carrier, shipping_method } = order

  return (
    <Box
      className={classes.totalsContainer}
      sx={sxx(
        (theme) => ({
          my: theme.spacings.md,
          ...breakpointVal(
            'borderRadius',
            theme.shape.borderRadius * 3,
            theme.shape.borderRadius * 5,
            theme.breakpoints.values,
          ),
          background:
            theme.palette.mode === 'light'
              ? theme.palette.background.default
              : lighten(theme.palette.background.default, 0.15),
          padding: `${theme.spacings.xs} ${theme.spacings.sm}`,
        }),
        sx,
      )}
    >
      <Box className={classes.totalsRow} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>
          <Trans id='Products' />
        </Typography>
        <Money {...total?.subtotal} />
      </Box>

      {total?.discounts?.map((discount) => (
        <Box
          className={classes.totalsRow}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
          key={`discount-${discount?.label}`}
        >
          <Typography>{discount?.label}</Typography>

          {discount?.amount && (
            <Money {...discount.amount} value={(discount.amount.value ?? 0) * -1} />
          )}
        </Box>
      ))}
      {carrier && shipping_method && (
        <Box
          className={classes.totalsRow}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography>
            <Trans id='Shipping ({0} {1})' values={{ 0: carrier, 1: shipping_method }} />
          </Typography>
          <Money {...total?.total_shipping} />
        </Box>
      )}

      {additionalSubtotals}

      <Divider sx={(theme) => ({ my: theme.spacings.xxs })} />

      <Box
        className={classes.totalsRow}
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'space-between',
          color: theme.palette.primary.main,
        })}
      >
        <Typography>
          <Trans id='Grand total' />
        </Typography>
        <Money {...total?.grand_total} />
      </Box>

      {additionalGrandTotals}

      {total?.taxes?.map((tax) => (
        <Box
          key={tax?.title}
          className={classes.totalsVat}
          sx={(theme) => ({
            display: 'flex',
            justifyContent: 'space-between',
            color: theme.palette.text.disabled,
          })}
        >
          <Typography>
            <Trans id='Including {0}' values={{ 0: tax?.title }} />
          </Typography>
          <Money {...tax?.amount} />
        </Box>
      ))}

      {additionalTaxes}
    </Box>
  )
}
