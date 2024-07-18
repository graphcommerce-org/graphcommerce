import { Trans } from '@lingui/react'
import { OrderStateLabel, OrderStateLabelProps, OrderStateRenderer } from './OrderStateLabel'

type OrderStateLabelInlineProps = OrderStateLabelProps

const defaultRenderer: OrderStateRenderer = {
  Ordered: () => <Trans id='processed' />,
  Processing: () => <Trans id='invoiced' />,
  Closed: () => <Trans id='shipped' />,
  Refunded: () => <Trans id='refunded' />,
  Canceled: () => <Trans id='canceled' />,
  Returned: () => <Trans id='returned' />,
  Pending: () => <Trans id='partially processed' />,
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
          '&.orderStateClosed': {
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
