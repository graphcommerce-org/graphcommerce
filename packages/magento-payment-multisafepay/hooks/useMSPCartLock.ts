import { CartLockState, useCartLock } from '@graphcommerce/magento-cart-payment-method'

type MSPLockState = CartLockState & {
  success?: string | null
  order_number?: string | null
  customer_token?: string | null
}

/**
 * The cart lock situation is a bit odd since are unable to actually influence the return URL we
 * can't safely remember the cart ID.
 *
 * This is a potential bug because when the customer is returning from an icognito session, the cart
 * ID is not available.
 */
export const useMSPCartLock = () => useCartLock<MSPLockState>()
