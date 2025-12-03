import { Money } from '@graphcommerce/magento-store'
import { breakpointVal, extendableComponent, lightenColor, sxx } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box, Divider, Typography } from '@mui/material'
import type { InvoiceFragment } from './Invoice.gql'

export type InvoiceTotalsProps = {
  invoice: InvoiceFragment
  sx?: SxProps<Theme>
}

const componentName = 'InvoiceTotals'
const parts = ['totalsContainer', 'totalsRow', 'totalsDivider', 'totalsVat'] as const
const { classes } = extendableComponent(componentName, parts)

export function InvoiceTotals(props: InvoiceTotalsProps) {
  const { invoice, sx = [] } = props
  const { total } = invoice

  if (!total) return null

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
          background: theme.vars.palette.background.default,
          ...theme.applyStyles('dark', {
            background: lightenColor(theme.vars.palette.background.default, 0.15),
          }),
          padding: `${theme.spacings.xs} ${theme.spacings.sm}`,
        }),
        sx,
      )}
    >
      <Box className={classes.totalsRow} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>
          <Trans>Subtotal</Trans>
        </Typography>
        <Money {...total.subtotal} />
      </Box>

      {total.discounts?.map((discount) => (
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

      {total.total_shipping && (
        <Box
          className={classes.totalsRow}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography>
            <Trans>Shipping</Trans>
          </Typography>
          <Money {...total.total_shipping} />
        </Box>
      )}

      <Divider sx={(theme) => ({ my: theme.spacings.xxs })} />
      <Box
        className={classes.totalsRow}
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'space-between',
          color: theme.vars.palette.primary.main,
        })}
      >
        <Typography>
          <Trans>Grand total</Trans>
        </Typography>
        <Money {...total.grand_total} />
      </Box>

      {total.taxes?.map((tax) => (
        <Box
          key={tax?.title}
          className={classes.totalsVat}
          sx={(theme) => ({
            display: 'flex',
            justifyContent: 'space-between',
            color: theme.vars.palette.text.disabled,
          })}
        >
          <Typography>
            <Trans>Including {tax?.title}</Trans>
          </Typography>
          <Money {...tax?.amount} />
        </Box>
      ))}
    </Box>
  )
}
