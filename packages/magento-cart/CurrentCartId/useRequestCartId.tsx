import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { CreateEmptyCartDocument } from './CreateEmptyCart.gql'
import { CurrentCartIdDocument } from './CurrentCartId.gql'

export default function useRequestCartId() {
  const { data: cartQuery } = useQuery(CurrentCartIdDocument)
  const { cache } = useApolloClient()
  const [create] = useMutation(CreateEmptyCartDocument)

  const cartId = cartQuery?.currentCartId?.id

  async function requestCartId(): Promise<string> {
    if (cartId) return cartId

    const { data } = await create()
    if (!data?.createEmptyCart) throw Error('Could not create an empty cart')

    cache.writeQuery({
      query: CurrentCartIdDocument,
      data: {
        currentCartId: {
          __typename: 'CurrentCartId',
          id: data.createEmptyCart,
        },
      },
      broadcast: true,
    })

    return data.createEmptyCart
  }

  return requestCartId
}
