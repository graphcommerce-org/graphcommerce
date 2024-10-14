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
          background: `rgb(${theme.vars.palette.secondary.mainChannel}, 0.125)`,

          '&.orderStatePending': {
            color: theme.vars.palette.text.disabled,
          },
          '&.orderStateProcessing': {
            color: theme.vars.palette.info.main,
            background: `rgb(${theme.vars.palette.info.mainChannel}, 0.125)`,
          },
          '&.orderStateComplete': {
            color: theme.vars.palette.success.main,
            background: `rgb(${theme.vars.palette.success.mainChannel}, 0.125)`,
          },
          '&.orderStateClosed': {
            color: theme.vars.palette.text.disabled,
            background: theme.vars.palette.text.disabled,
            '@supports (color: hsl(from white h s l))': {
              background: `rgb(from ${theme.vars.palette.text.disabled} r g b / 0.125 )`,
            },
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )
}
