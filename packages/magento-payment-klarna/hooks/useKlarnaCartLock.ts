import { CartLockState, useCartLock } from '@graphcommerce/magento-cart-payment-method'

type KlarnaLockState = CartLockState & {
  clientToken?: string | null
  authorizationToken?: string | null
}

/**
 * The cart lock situation is a bit odd since are unable to actually influence the return URL we
 * can't safely remember the cart ID.
 *
 * This is a potential bug because when the customer is returning from an icognito session, the cart
 * ID is not available.
 */
export const useKlarnaCartLock = () => useCartLock<KlarnaLockState>()
