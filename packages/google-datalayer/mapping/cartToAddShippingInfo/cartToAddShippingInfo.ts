import { cartToDatalayerItems } from '../cartToDatalayerItems/cartToDatalayerItems'
import { Cart_AddShippingInfoFragment } from './Cart_AddShippingInfo.gql'

export function cartToAddShippingInfo<C extends Cart_AddShippingInfoFragment>(cart: C) {
  return {
    coupon: cart?.applied_coupons?.map((coupon) => coupon?.code).join(' '),
    shipping_tier: cart?.shipping_addresses
      .map(
        (address) =>
          `${address?.selected_shipping_method?.carrier_code}_${address?.selected_shipping_method?.method_code}`,
      )
      .join(' '),
    ...cartToDatalayerItems(cart),
  }
}
