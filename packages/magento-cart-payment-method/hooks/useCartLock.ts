import { useCurrentCartId } from '@graphcommerce/magento-cart'
import { useUrlQuery } from '@graphcommerce/next-ui'
import { useState } from 'react'

export type CartLockState = {
  cart_id: string | null
  locked: string | null
  method: string | null
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
    locked: queryState.locked === '1',
    justLocked,
  }

  return [resulting, lock, unlock] as const
}
