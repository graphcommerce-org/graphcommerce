import { cartToViewCart, ViewCart } from '../cartToViewCart/cartToViewCart'
import { Cart_BeginCheckoutFragment } from './Cart_BeginCheckout.gql'

export type BeginCheckout = ViewCart & {
  coupon?: string
}

export function cartToBeginCheckout<C extends Cart_BeginCheckoutFragment>(cart: C): BeginCheckout {
  return {
    coupon: cart?.applied_coupons?.map((coupon) => coupon?.code).join(' '),
    ...cartToViewCart(cart),
  }
}
