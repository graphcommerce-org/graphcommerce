import { Trans } from '@lingui/react'
import { OrderStateLabel, OrderStateLabelProps, OrderStateRenderer } from './OrderStateLabel'

type OrderStateLabelInlineProps = OrderStateLabelProps

const defaultRenderer: OrderStateRenderer = {
  Ordered: () => <Trans id='Your order is being processed' />,
  Processing: () => <Trans id='Your order has been invoiced' />,
  Closed: () => <Trans id='Your order is on its way!' />,
  Refunded: () => <Trans id='Your order has been refunded' />,
  Canceled: () => <Trans id='Your order has been canceled' />,
  Returned: () => <Trans id='Your order has been returned' />,
  Pending: () => <Trans id='Your order has been partially processed' />,
}

export function OrderStateLabelInline(props: OrderStateLabelInlineProps) {
  const { sx = [], renderer: incomingRenderer } = props
  const renderer: OrderStateRenderer = { ...defaultRenderer, ...incomingRenderer }

  return (
    <OrderStateLabel
      {...props}
      renderer={renderer}
      sx={[
        (theme) => ({
          fontStyle: 'normal',
          display: 'inline-block',
          padding: `0 6px`,
          borderRadius: '3px',
          fontWeight: 'normal',
          background: `${theme.palette.secondary.main}20`,

          '&.orderStateRefunded': {
            color: theme.palette.primary.main,
            background: `${theme.palette.primary.main}20`,
          },
          '&.orderStateShipped': {
            color: theme.palette.success.main,
            fontWeight: 'normal',
            background: `${theme.palette.success.main}20`,
          },
          '&.orderStateCanceled': {
            color: theme.palette.primary.main,
            background: `${theme.palette.primary.main}20`,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )
}
