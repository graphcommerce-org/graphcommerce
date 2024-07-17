import { extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, SxProps, Theme } from '@mui/material'
import { OrderStateProps, OrderState, getOrderState } from '../../utils'

type OrderStateLabelPropsBase = OrderStateProps

export type OrderStateRenderer = Record<
  OrderState,
  (props: OrderStateLabelPropsBase) => React.ReactElement | null
>

export type OrderStateLabelProps = {
  renderer?: Partial<OrderStateRenderer>
  sx?: SxProps<Theme>
} & OrderStateLabelPropsBase

type OwnerState = {
  orderState: OrderState
}
const componentName = 'OrderStateLabel' as const
const parts = ['root'] as const
const { withState } = extendableComponent<OwnerState, typeof componentName, typeof parts>(
  componentName,
  parts,
)

const defaultRenderer: OrderStateRenderer = {
  Ordered: () => <Trans id='Your order is being processed' />,
  Processing: () => <Trans id='Your order has been invoiced' />,
  Closed: () => <Trans id='Your order is on its way!' />,
  Refunded: () => <Trans id='Your order has been refunded' />,
  Canceled: () => <Trans id='Your order has been canceled' />,
  Returned: () => <Trans id='Your order has been returned' />,
  Pending: () => <Trans id='Your order has been partially processed' />,
}

export function OrderStateLabel(props: OrderStateLabelProps) {
  const { items, renderer: incomingRenderer, sx = [], ...orderProps } = props

  const renderer: OrderStateRenderer = { ...defaultRenderer, ...incomingRenderer }

  const orderState = getOrderState(props)

  const StateLabel = renderer[orderState]

  const classes = withState({ orderState })

  return (
    <Box
      component='span'
      className={classes.root}
      sx={[
        (theme) => ({
          fontStyle: 'italic',
          fontWeight: 'normal',
          '&.orderStateOrdered': {
            color: theme.palette.secondary.main,
          },
          '&.orderStateProcessing': {
            color: theme.palette.secondary.main,
          },
          '&.orderStateRefunded': {
            color: theme.palette.primary.main,
          },
          '&.orderStateClosed': {
            color: theme.palette.success.main,
            fontStyle: 'normal',
            fontWeight: 600,
          },
          '&.orderStateCanceled': {
            color: theme.palette.primary.main,
          },
          '&.orderStateReturned': {
            color: theme.palette.secondary.main,
          },
          '&.orderStatePending': {
            color: theme.palette.secondary.main,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <StateLabel items={items} {...orderProps} />
    </Box>
  )
}
