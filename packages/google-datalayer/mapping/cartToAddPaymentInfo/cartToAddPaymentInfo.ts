import { cartToViewCart, ViewCart } from '../cartToViewCart/cartToViewCart'
import { Cart_AddPaymentInfoFragment } from './Cart_AddPaymentInfo.gql'

export type AddPaymentInfo = ViewCart & {
  coupon?: string
  payment_type?: string
}

export function cartToAddPaymentInfo<C extends Cart_AddPaymentInfoFragment>(
  cart: C,
): AddPaymentInfo {
  return {
    ...cartToViewCart(cart),
    coupon: cart?.applied_coupons?.map((coupon) => coupon?.code).join(' '),
    payment_type: cart?.selected_payment_method?.code,
  }
}
