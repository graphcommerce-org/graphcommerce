import { Money } from '@graphcommerce/magento-store'
import { breakpointVal, extendableComponent, sxx } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box, Divider, lighten, Typography } from '@mui/material'
import type { CreditMemoFragment } from './CreditMemo.gql'

export type CreditMemoTotalsProps = {
  creditMemo: CreditMemoFragment
  sx?: SxProps<Theme>
}

const componentName = 'CreditMemoTotals'
const parts = ['totalsContainer', 'totalsRow', 'totalsDivider', 'totalsVat'] as const
const { classes } = extendableComponent(componentName, parts)

export function CreditMemoTotals(props: CreditMemoTotalsProps) {
  const { creditMemo, sx = [] } = props
  const { total } = creditMemo

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

      {total.adjustment && (
        <Box
          className={classes.totalsRow}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography>
            <Trans>Adjustment</Trans>
          </Typography>
          <Money {...total.adjustment} />
        </Box>
      )}

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
          <Trans>Refund total</Trans>
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
            color: theme.palette.text.disabled,
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
