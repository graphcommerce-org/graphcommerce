import { createContext, useContext } from 'react'

export const CartIdContext = createContext<string | null>(null)

/**
 * By default we use the currently selected cartId.
 *
 * However in a MultiCart scenario we need to be able to switch the cartId in certain contexts.
 */
export function CartIdProvider(props: {
  children: React.ReactNode
  cartId: string | null | undefined
}) {
  const { children, cartId } = props
  return <CartIdContext.Provider value={cartId ?? null}>{children}</CartIdContext.Provider>
}

export function useCartIdContext() {
  return useContext(CartIdContext)
}
