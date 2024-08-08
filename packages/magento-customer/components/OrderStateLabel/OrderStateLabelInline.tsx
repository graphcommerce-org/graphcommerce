import { OrderStateLabel, OrderStateLabelProps } from './OrderStateLabel'

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
          padding: `0 6px`,
          borderRadius: '3px',
          fontWeight: 'normal',
          background: `${theme.palette.secondary.main}20`,

          '&.orderStatePending': {
            color: theme.palette.text.disabled,
          },
          '&.orderStateProcessing': {
            color: theme.palette.info.main,
            background: `${theme.palette.info.main}20`,
          },
          '&.orderStateComplete': {
            color: theme.palette.success.main,
            background: `${theme.palette.success.main}20`,
          },
          '&.orderStateClosed': {
            color: theme.palette.text.disabled,
            background: `${theme.palette.text.disabled}20`,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )
}
