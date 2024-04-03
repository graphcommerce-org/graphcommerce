import { nonNullable } from '@graphcommerce/next-ui'
import { cartItemToGoogleDatalayerItem } from '../cartItemToGoogleDatalayerItem'
import { event } from '../event'
import { AddShippingInfoFragment } from './AddSchippingInfoFragment.gql'

export const addShippingInfo = <C extends AddShippingInfoFragment>(cart?: C) =>
  event('add_shipping_info', {
    currency: cart?.prices?.subtotal_including_tax?.currency,
    value: cart?.prices?.subtotal_including_tax?.value,
    coupon: cart?.applied_coupons?.map((coupon) => coupon?.code).join(' '),
    shipping_tier: cart?.shipping_addresses
      .map(
        (address) =>
          `${address?.selected_shipping_method?.carrier_code}_${address?.selected_shipping_method?.method_code}`,
      )
      .join(' '),
    items: cart?.items?.filter(nonNullable).map(cartItemToGoogleDatalayerItem),
  })
