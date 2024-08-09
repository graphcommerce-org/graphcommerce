import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { cartToViewCart, ViewCart } from '../cartToViewCart/cartToViewCart'
import { Cart_AddShippingInfoFragment } from './Cart_AddShippingInfo.gql'

export type AddShippingInfo = ViewCart & {
  coupon?: string
  shipping_tier?: string
}

export function cartToAddShippingInfo<C extends Cart_AddShippingInfoFragment>(
  cart: C,
): AddShippingInfo {
  return {
    coupon: cart?.applied_coupons?.map((coupon) => coupon?.code).join(' '),
    shipping_tier: filterNonNullableKeys(cart?.shipping_addresses, ['selected_shipping_method'])
      .map(
        ({ selected_shipping_method: { carrier_code, method_code } }) =>
          `${carrier_code}_${method_code}`,
      )
      .join(' '),
    ...cartToViewCart(cart),
  }
}
