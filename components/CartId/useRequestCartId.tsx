import { useApolloClient } from '@apollo/client'
import {
  GetCustomerCartDocument,
  CreateEmptyCartDocument,
  useCartIdQuery,
  useCustomerQuery,
} from 'generated/apollo'

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
  const cartIdQuery = useCartIdQuery()
  const { data: customerQuery } = useCustomerQuery({ fetchPolicy: 'cache-only' })
  const client = useApolloClient()

  const cartId = cartIdQuery.data?.cartId

  async function requestCartId(): Promise<string> {
    if (cartId) return cartId

    if (!cartId && customerQuery?.customer) {
      const customerCartQuery = await client.query<
        GQLGetCustomerCartQuery,
        GQLGetCustomerCartQueryVariables
      >({ query: GetCustomerCartDocument })

      if (customerCartQuery.data?.customerCart.id) {
        return customerCartQuery.data.customerCart.id
      }
    }

    if (!cartId && !customerQuery?.customer) {
      const newId = generateId()
      const createEmptyCart = await client.mutate<
        GQLCreateEmptyCartMutation,
        GQLCreateEmptyCartMutationVariables
      >({ mutation: CreateEmptyCartDocument, variables: { cartId: newId } })

      if (createEmptyCart.data?.createEmptyCart) {
        return createEmptyCart.data.createEmptyCart
      }
      throw new Error('Could not create a cart')
    }

    return cartId || ''
  }

  return requestCartId
}
