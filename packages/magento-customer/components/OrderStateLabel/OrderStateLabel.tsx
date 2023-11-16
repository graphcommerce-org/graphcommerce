import { extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, SxProps, Theme } from '@mui/material'
import { OrderStateLabelFragment } from './OrderStateLabel.gql'

type OrderState =
  | 'Ordered'
  | 'Invoiced'
  | 'Shipped'
  | 'Refunded'
  | 'Canceled'
  | 'Returned'
  | 'Partial'

type OrderStateLabelPropsBase = OrderStateLabelFragment

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
  Invoiced: () => <Trans id='Your order has been invoiced' />,
  Shipped: () => <Trans id='Your order is on its way!' />,
  Refunded: () => <Trans id='Your order has been refunded' />,
  Canceled: () => <Trans id='Your order has been canceled' />,
  Returned: () => <Trans id='Your order has been returned' />,
  Partial: () => <Trans id='Your order has been partially processed' />,
}

export function OrderStateLabel(props: OrderStateLabelProps) {
  const { items, renderer: incomingRenderer, sx = [], ...orderProps } = props

  const renderer: OrderStateRenderer = { ...defaultRenderer, ...incomingRenderer }

  let orderState: OrderState = 'Partial'
  if (items?.every((item) => item?.quantity_ordered === item?.quantity_invoiced))
    orderState = 'Invoiced'
  if (items?.every((item) => item?.quantity_ordered === item?.quantity_shipped))
    orderState = 'Shipped'
  if (items?.every((item) => item?.quantity_ordered === item?.quantity_refunded))
    orderState = 'Refunded'
  if (items?.every((item) => item?.quantity_ordered === item?.quantity_canceled))
    orderState = 'Canceled'
  if (items?.every((item) => item?.quantity_ordered === item?.quantity_returned))
    orderState = 'Returned'

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
          '&.orderStateInvoiced': {
            color: theme.palette.secondary.main,
          },
          '&.orderStateRefunded': {
            color: theme.palette.primary.main,
          },
          '&.orderStateShipped': {
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
          '&.orderStatePartial': {
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
