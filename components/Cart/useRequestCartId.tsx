import { useApolloClient } from '@apollo/client'
import { CreateEmptyCartDocument, useCartQuery } from 'generated/apollo'

function generateId() {
  return 'xxxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export default function useRequestCartId() {
  const { data: cartQuery } = useCartQuery()
  const client = useApolloClient()

  const cartId = cartQuery?.cart?.id

  async function requestCartId(): Promise<string> {
    if (cartId) return cartId

    const { data } = await client.mutate<
      GQLCreateEmptyCartMutation,
      GQLCreateEmptyCartMutationVariables
    >({ mutation: CreateEmptyCartDocument, variables: { cartId: generateId() } })

    if (!data?.createEmptyCart) throw Error('Could not create an empty cart')

    return data.createEmptyCart
  }

  return requestCartId
}
