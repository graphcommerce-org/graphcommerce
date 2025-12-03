import { sxx } from '@graphcommerce/next-ui'
import { alpha } from '@mui/material'
import type { OrderStateLabelProps } from './OrderStateLabel'
import { OrderStateLabel } from './OrderStateLabel'

export type OrderStateLabelInlineProps = OrderStateLabelProps

/** @deprecated Use `<OrderStateLabel {...props} short />` instead */
export function OrderStateLabelInline(props: OrderStateLabelInlineProps) {
  const { sx = [] } = props

  return (
    <OrderStateLabel
      {...props}
      short
      sx={sxx(
        (theme) => ({
          fontStyle: 'normal',
          display: 'inline-block',
          padding: '0 6px',
          borderRadius: '3px',
          fontWeight: 'normal',
          background: alpha(theme.vars.palette.secondary.main, 0.125),
          '&.orderStatePending': {
            color: theme.vars.palette.text.disabled,
          },
          '&.orderStateProcessing': {
            color: theme.vars.palette.info.main,
            background: alpha(theme.vars.palette.info.main, 0.125),
          },
          '&.orderStateComplete': {
            color: theme.vars.palette.success.main,
            background: alpha(theme.vars.palette.success.main, 0.125),
          },
          '&.orderStateClosed': {
            color: theme.vars.palette.text.disabled,
            background: alpha(theme.vars.palette.text.disabled, 0.125),
          },
        }),
        sx,
      )}
    />
  )
}
