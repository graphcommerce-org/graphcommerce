import { Money } from '@graphcommerce/magento-store'
import { breakpointVal, extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import type { SxProps, Theme } from '@mui/material'
import { Box, Divider, Typography } from '@mui/material'
import type { OrderDetailsFragment } from './OrderDetails.gql'

export type OrderTotalsProps = Partial<OrderDetailsFragment> & {
  sx?: SxProps<Theme>
}

const componentName = 'OrderTotals'
const parts = ['totalsContainer', 'totalsRow', 'totalsDivider', 'totalsVat'] as const
const { classes } = extendableComponent(componentName, parts)

export function OrderTotals(props: OrderTotalsProps) {
  const { total, carrier, sx = [] } = props

  return (
    <Box
      className={classes.totalsContainer}
      sx={[
        (theme) => ({
          border: `1px solid ${theme.palette.divider}`,
          marginBottom: theme.spacings.md,
          p: theme.spacings.sm,
          ...breakpointVal(
            'borderRadius',
            theme.shape.borderRadius * 2,
            theme.shape.borderRadius * 3,
            theme.breakpoints.values,
          ),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
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
      <Box className={classes.totalsRow} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>
          <Trans id='Shipping ({0} {1})' values={{ 0: carrier }} />
        </Typography>
        <Money {...total?.total_shipping} />
      </Box>

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
    </Box>
  )
}
