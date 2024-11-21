import { alpha } from '@mui/material'
import type { OrderStateLabelProps } from './OrderStateLabel'
import { OrderStateLabel } from './OrderStateLabel'

type OrderStateLabelInlineProps = OrderStateLabelProps

export function OrderStateLabelInline(props: OrderStateLabelInlineProps) {
  const { sx = [] } = props

  return (
    <OrderStateLabel
      {...props}
      short
      sx={[
        (theme) => ({
          fontStyle: 'normal',
          display: 'inline-block',
          padding: '0 6px',
          borderRadius: '3px',
          fontWeight: 'normal',
          background: alpha(theme.palette.secondary.main, 0.125),

          '&.orderStatePending': {
            color: theme.palette.text.disabled,
          },
          '&.orderStateProcessing': {
            color: theme.palette.info.main,
            background: alpha(theme.palette.info.main, 0.125),
          },
          '&.orderStateComplete': {
            color: theme.palette.success.main,
            background: alpha(theme.palette.success.main, 0.125),
          },
          '&.orderStateClosed': {
            color: theme.palette.text.disabled,
            background: alpha(theme.palette.text.disabled, 0.125),
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )
}
