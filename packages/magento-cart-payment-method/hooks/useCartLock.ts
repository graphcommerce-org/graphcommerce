import { useCurrentCartId } from '@graphcommerce/magento-cart'
import { useUrlQuery } from '@graphcommerce/next-ui'

type CartLockState = {
  cart_id?: string
  locked?: string
}

/**
 * Locking a cart might is usefull in the following cases: We want to disable cart modifications
 * while still keeping the cart active on the website.
 *
 * Todo: Block all operations on the cart while the cart is being blocked.
 */
export function useCartLock<E extends Record<string, string | undefined>>() {
  const currentCartId = useCurrentCartId()

  const [state, setState] = useUrlQuery<CartLockState & E>((params) => params)

  const lock = (params: CartLockState & E) => {
    if (!currentCartId) return
    setState({ locked: '1', cart_id: currentCartId, ...params })
  }

  return [state, lock] as const
}
