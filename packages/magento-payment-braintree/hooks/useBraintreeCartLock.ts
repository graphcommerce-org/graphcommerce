import type { CartLockState } from '@graphcommerce/magento-cart-payment-method'
import { useCartLock } from '@graphcommerce/magento-cart-payment-method'

type BraintreeCartLock = CartLockState & {
  payment_id: string | null
}

export const useBraintreeCartLock = () => useCartLock<BraintreeCartLock>()
