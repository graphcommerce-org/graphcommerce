import { OrderStateLabel, OrderStateLabelProps } from './OrderStateLabel'

type OrderStateLabelInlineProps = OrderStateLabelProps

export function OrderStateLabelInline(props: OrderStateLabelInlineProps) {
  const { sx = [] } = props

  return (
    <OrderStateLabel
      {...props}
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
