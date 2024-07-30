import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { OrderDetailsFragment } from '../components/OrderDetails/OrderDetails.gql'
import { OrderStateLabelFragment } from '../components/OrderStateLabel/OrderStateLabel.gql'

export type OrderState = 'pending' | 'processing' | 'complete' | 'closed'

export type OrderStateProps = Pick<OrderDetailsFragment, 'shipping_address' | 'shipments'> &
  OrderStateLabelFragment

export function getOrderState(props: OrderStateProps): OrderState {
  const { items, shipping_address } = props

  const itemss = filterNonNullableKeys(items, [
    'quantity_ordered',
    'quantity_canceled',
    'quantity_invoiced',
    'quantity_refunded',
    'quantity_shipped',
  ]).map((i) => ({
    ordered: i.quantity_ordered,
    canceled: i.quantity_canceled,
    invoiced: i.quantity_invoiced,
    refunded: i.quantity_refunded,
    returned: i.quantity_returned ?? 0,
    shipped: i.quantity_shipped,
  }))

  const nothingInvoiced = itemss.every((i) => i.invoiced === 0)
  const nothingShipped = itemss.every((i) => i.shipped === 0)

  const needsInvoicing = itemss.some((i) => i.ordered - i.canceled - i.invoiced)
  const needsShipping = itemss.some((i) => {
    if (!shipping_address) return 0
    return i.ordered <= i.canceled - i.shipped - i.refunded
  })

  if (nothingInvoiced && nothingShipped && needsInvoicing && needsShipping) return 'pending'
  if (needsShipping || needsInvoicing) return 'processing'

  const canRefundOrReturn = itemss.some(
    (i) => i.ordered - i.canceled - Math.max(i.refunded, i.returned),
  )
  return canRefundOrReturn ? 'complete' : 'closed'
}

export function canCancelOrder(props: OrderStateProps) {
  const state = getOrderState(props)
  const { shipments } = props

  return (state === 'pending' || state === 'processing') && !shipments?.length
}
