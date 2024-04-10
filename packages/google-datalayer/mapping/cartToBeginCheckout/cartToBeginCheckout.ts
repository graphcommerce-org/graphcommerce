import { cartToDatalayerItems } from '../cartToDatalayerItems/cartToDatalayerItems'
import { Cart_BeginCheckoutFragment } from './Cart_BeginCheckout.gql'

export function cartToBeginCheckout<C extends Cart_BeginCheckoutFragment>(cart: C) {
  return {
    coupon: cart?.applied_coupons?.map((coupon) => coupon?.code).join(' '),
    ...cartToDatalayerItems(cart),
  }
}
