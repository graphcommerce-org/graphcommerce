import { OrderDetailsFragment } from '../components/OrderDetails/OrderDetails.gql'
import { OrderStateLabelFragment } from '../components/OrderStateLabel/OrderStateLabel.gql'

export type OrderState =
  | 'Ordered'
  | 'Processing'
  | 'Closed'
  | 'Refunded'
  | 'Canceled'
  | 'Returned'
  | 'Pending'

export type OrderStateProps = Pick<OrderDetailsFragment, 'shipping_address' | 'shipments'> &
  OrderStateLabelFragment

export function getOrderState(props: OrderStateProps) {
  const { items, shipping_address } = props

  let orderState: OrderState = 'Pending'
  if (items?.every((item) => item?.quantity_ordered === item?.quantity_invoiced))
    orderState = 'Processing'
  if (items?.every((item) => item?.quantity_ordered === item?.quantity_shipped))
    orderState = 'Closed'
  if (items?.every((item) => item?.quantity_ordered === item?.quantity_refunded))
    orderState = 'Refunded'
  if (items?.every((item) => item?.quantity_ordered === item?.quantity_canceled))
    orderState = 'Canceled'
  if (items?.every((item) => item?.quantity_ordered === item?.quantity_returned))
    orderState = 'Returned'

  if (orderState === 'Processing' && !shipping_address) {
    orderState = 'Closed'
  }

  return orderState
}

export function canCancelOrder(props: OrderStateProps) {
  const state = getOrderState(props)
  const { shipments } = props

  return (state === 'Pending' || state === 'Processing') && !shipments?.length
}
