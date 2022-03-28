import { useCartLock } from '@graphcommerce/magento-cart-payment-method'

export const useCartLockWithToken = () => useCartLock<{ mollie_payment_token?: string }>()
