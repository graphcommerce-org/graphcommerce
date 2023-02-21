import { useCurrentCartId } from '@graphcommerce/magento-cart'
import { useUrlQuery } from '@graphcommerce/next-ui'
import { useEffect, useState } from 'react'

export type CartLockState = {
  cart_id: string | null
  locked: string | null
  method: string | null
  // Only added for PayPal
  PayerID: string | null
}

let justLocked = false

/**
 * Locking a cart might is usefull in the following cases: We want to disable cart modifications
 * while still keeping the cart active on the website.
 *
 * Todo: Block all operations on the cart while the cart is being blocked.
 */
export function useCartLock<E extends CartLockState>() {
  const { currentCartId } = useCurrentCartId()
  const [queryState, setRouterQuery] = useUrlQuery<E>()
  const [, setForceRender] = useState(0)

  useEffect(() => {
    const pageshow = (e: PageTransitionEvent) => {
      if (!e.persisted) return
      justLocked = false
      setForceRender((cnt) => cnt + 1)
    }
    window.addEventListener('pageshow', pageshow)
    return () => {
      window.removeEventListener('pageshow', pageshow)
    }
  })

  const lock = (params: Omit<E, 'locked' | 'cart_id'>) => {
    if (!currentCartId) return undefined
    justLocked = true
    return setRouterQuery({
      locked: '1',
      cart_id: currentCartId,
      ...params,
    } as unknown as E)
  }

  const unlock = async (params: Omit<E, 'locked' | 'cart_id' | 'method'>) => {
    await setRouterQuery({ cart_id: null, locked: null, method: null, ...params } as E)
    return queryState
  }

  const resulting: Omit<E, 'locked'> & { locked: boolean; justLocked: boolean } = {
    ...queryState,
    locked: queryState.locked === '1' || Boolean(queryState.PayerID),
    justLocked,
  }

  return [resulting, lock, unlock] as const
}
