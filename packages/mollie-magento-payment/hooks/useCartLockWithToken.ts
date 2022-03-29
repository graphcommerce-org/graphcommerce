import { CartLockState, useCartLock } from '@graphcommerce/magento-cart-payment-method'
import { useState } from 'react'

type MollieLockState = { mollie_payment_token?: string }

export const useCartLockWithToken = () => {
  const [queryState, setRouterQuery] = useCartLock<MollieLockState>()
  const [redirecting, setRedirecting] = useState(false)

  const lock = (params: MollieLockState & CartLockState) => {
    setRedirecting(true)
    setRouterQuery(params)
  }

  const state = {
    ...queryState,
    locked: queryState.locked === '1',
    redirecting,
  }

  return [state, lock] as const
}
