import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { event } from '../../lib/event'
import { AddShippingInfoFragment } from './AddSchippingInfoFragment.gql'

export const addShippingInfo = <C extends AddShippingInfoFragment>(cart?: C) =>
  event('add_shipping_info', {
    cart_id: cart?.id,
    currency: cart?.prices?.grand_total?.currency,
    value: cart?.prices?.grand_total?.value,
    coupon: cart?.applied_coupons?.map((coupon) => coupon?.code),
    items: filterNonNullableKeys(cart?.items).map((item) => ({
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
