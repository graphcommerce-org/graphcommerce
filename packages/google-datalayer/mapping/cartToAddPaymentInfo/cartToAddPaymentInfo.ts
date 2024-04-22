import { cartToDatalayerItems } from '../cartToDatalayerItems/cartToDatalayerItems'
import { Cart_AddPaymentInfoFragment } from './Cart_AddPaymentInfo.gql'

export function cartToAddPaymentInfo<C extends Cart_AddPaymentInfoFragment>(cart: C) {
  return {
    coupon: cart?.applied_coupons?.map((coupon) => coupon?.code).join(' '),
    payment_type: cart?.selected_payment_method?.code,
    ...cartToDatalayerItems(cart),
  }
}
