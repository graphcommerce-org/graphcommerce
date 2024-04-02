import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { event } from '../../lib/event'
import { AddPaymentInfoFragment } from './AddPaymentInfoFragment.gql'

export const addPaymentInfo = <C extends AddPaymentInfoFragment>(cart?: C | null) =>
  event('add_payment_info', {
    cart_id: cart?.id,
    currency: cart?.prices?.grand_total?.currency,
    value: cart?.prices?.grand_total?.value,
    coupon: cart?.applied_coupons?.map((coupon) => coupon?.code),
    payment_type: cart?.selected_payment_method?.code,
    items: filterNonNullableKeys(cart?.items)?.map((item) => ({
      item_id: item?.product.sku,
      item_name: item?.product.name,
      currency: item?.prices?.price.currency,
      quantity: item?.quantity,
      price: (item.prices?.price.value ?? 1) / item.quantity,
      discount: item.prices.discounts?.reduce(
        (sum, discount) => sum + (discount?.amount?.value ?? 0 / item.quantity),
        0,
      ),
    })),
  })
