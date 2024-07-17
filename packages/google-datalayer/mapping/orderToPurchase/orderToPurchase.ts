import { PaymentMethodContextFragment } from '@graphcommerce/magento-cart-payment-method/Api/PaymentMethodContext.gql'
import { cartToDatalayerItems } from '../cartToDatalayerItems/cartToDatalayerItems'

export function orderToPurchase<C extends PaymentMethodContextFragment>(
  orderNumber: string,
  cart: C | null | undefined,
) {
  if (!cart) return { transaction_id: orderNumber }

  return {
    transaction_id: orderNumber,
    coupon: cart.applied_coupons?.map((coupon) => coupon?.code).join(' '),
    payment_type: cart.selected_payment_method?.code,
    tax: cart.prices?.applied_taxes?.reduce((sum, tax) => sum + (tax?.amount?.value ?? 0), 0),
    ...cartToDatalayerItems(cart),
  }
}
