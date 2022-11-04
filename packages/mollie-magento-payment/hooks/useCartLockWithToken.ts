import { CartLockState, useCartLock } from '@graphcommerce/magento-cart-payment-method'

type MollieLockState = CartLockState & {
  mollie_payment_token: string | null
  order_number?: string | null
}

export const useCartLockWithToken = () => useCartLock<MollieLockState>()
