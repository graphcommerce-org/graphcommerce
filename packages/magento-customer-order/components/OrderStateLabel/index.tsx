import { UseStyles } from '@graphcommerce/next-ui'
import { Theme } from '@mui/material'
import { makeStyles } from '@graphcommerce/next-ui'
import clsx from 'clsx'
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
} & OrderStateLabelPropsBase &
  UseStyles<typeof useStyles>

const useStyles = makeStyles({ name: 'OrderStateLabel' })((theme) => ({
  orderStatus: {
    fontStyle: 'italic',
    fontWeight: 'normal',
  },
  orderStateOrdered: {
    color: theme.palette.secondary.main,
  },
  orderStateInvoiced: {
    color: theme.palette.secondary.main,
  },
  orderStateRefunded: {
    color: theme.palette.primary.main,
  },
  orderStateShipped: {
    color: theme.palette.success.main,
    fontStyle: 'normal',
    fontWeight: 600,
  },
  orderStateCanceled: {
    color: theme.palette.primary.main,
  },
  orderStateReturned: {
    color: theme.palette.secondary.main,
  },
  orderStatePartial: {
    color: theme.palette.secondary.main,
  },
}))

export default function OrderStateLabel(props: OrderStateLabelProps) {
  const { items, renderer, ...orderProps } = props
  const { classes } = useStyles(props)

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

  return (
    <span className={clsx(classes.orderStatus, classes?.[`orderState${orderState}`])}>
      <StateLabel items={items} {...orderProps} />
    </span>
  )
}
