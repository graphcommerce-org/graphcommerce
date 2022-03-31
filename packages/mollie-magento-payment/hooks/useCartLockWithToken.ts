import { CartLockState, useCartLock } from '@graphcommerce/magento-cart-payment-method'

type MollieLockState = CartLockState & { mollie_payment_token?: string }

export const useCartLockWithToken = () => useCartLock<MollieLockState>()
