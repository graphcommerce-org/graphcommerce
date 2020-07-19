import useIsLoggedIn from 'components/Customer/useIsLoggedIn'
import { GetCustomerCartDocument, CreateEmptyCartDocument } from 'generated/apollo'
import { useApolloClient } from '@apollo/client'
import { useState } from 'react'

function generateId() {
  return 'xxxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export default function useCartId() {
  const [cartId, setCartId] = useState<string | null>(
    typeof window !== 'undefined' ? window.localStorage.getItem('cart_id') : null,
  )
  const client = useApolloClient()
  const isLoggedIn = useIsLoggedIn()

  async function requestCartId(): Promise<string> {
    if (cartId) {
      return cartId
    }

    if (!cartId && isLoggedIn) {
      const customerCartQuery = await client.query<
        GQLGetCustomerCartQuery,
        GQLGetCustomerCartQueryVariables
      >({ query: GetCustomerCartDocument })

      if (customerCartQuery.data?.customerCart.id) {
        window.localStorage.setItem('cart_id', customerCartQuery.data.customerCart.id)
        setCartId(customerCartQuery.data.customerCart.id)
        return customerCartQuery.data.customerCart.id
      }
    }

    if (!cartId) {
      const newId = generateId()
      const createEmptyCart = await client.mutate<
        GQLCreateEmptyCartMutation,
        GQLCreateEmptyCartMutationVariables
      >({ mutation: CreateEmptyCartDocument, variables: { cartId: newId } })

      if (createEmptyCart.data?.createEmptyCart) {
        window.localStorage.setItem('cart_id', createEmptyCart.data.createEmptyCart)
        setCartId(createEmptyCart.data.createEmptyCart)
        return createEmptyCart.data.createEmptyCart
      }
      throw new Error('Could not create a cart')
    }

    return cartId
  }

  return { cartId, requestCartId }
}
