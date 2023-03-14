import { extendableComponent } from '@graphcommerce/next-ui'
import Box from '@mui/material/Box'
import { SxProps, Theme } from '@mui/material/styles'
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
type OrderStateRenderer = Record<
  OrderState,
  (props: OrderStateLabelPropsBase) => React.ReactElement | null
>

export type OrderStateLabelProps = {
  renderer: OrderStateRenderer
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

export function OrderStateLabel(props: OrderStateLabelProps) {
  const { items, renderer, sx = [], ...orderProps } = props

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
