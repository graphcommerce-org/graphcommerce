import type { ViewCart } from '../cartToViewCart/cartToViewCart'
import { cartToViewCart } from '../cartToViewCart/cartToViewCart'
import type { Cart_PurchaseEventFragment } from './Cart_PurchaseEvent.gql'

export type PurchaseOrRefund = ViewCart & {
  transaction_id: string
  coupon?: string
  shipping?: number
  tax?: number
}

export function cartToPurchase<C extends Cart_PurchaseEventFragment>(
  orderNumber: string,
  cart: C | null | undefined,
): PurchaseOrRefund {
  // Although the fallback information is wrong, we find it to be more important to register a purchase even in the cart object is missing.
  const base = cart ? cartToViewCart(cart) : { items: [], currency: '', value: 0 }

  return {
    transaction_id: orderNumber,
    coupon: cart?.applied_coupons?.map((coupon) => coupon?.code).join(' '),
    shipping: cart?.shipping_addresses.reduce(
      (sum, address) => sum + (address?.selected_shipping_method?.price_excl_tax.value ?? 0),
      0,
    ),
    tax: cart?.prices?.applied_taxes?.reduce((sum, tax) => sum + (tax?.amount?.value ?? 0), 0),
    ...base,
  }
}
