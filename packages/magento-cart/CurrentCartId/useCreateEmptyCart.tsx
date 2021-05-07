import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { CreateEmptyCartDocument } from './CreateEmptyCart.gql'
import { CurrentCartIdDocument } from './CurrentCartId.gql'
import { useAssignCurrentCartId } from './useCartId'

export default function useCreateEmptyCart() {
  const { data: cartQuery } = useQuery(CurrentCartIdDocument)
  const { cache } = useApolloClient()
  const [create] = useMutation(CreateEmptyCartDocument)
  const assignCurrentCartId = useAssignCurrentCartId()

  const cartId = cartQuery?.currentCartId?.id

  async function requestCartId(): Promise<string> {
    if (cartId) return cartId

    const { data } = await create()
    if (!data?.createEmptyCart) throw Error('Could not create an empty cart')

    // We store the cartId that is returned as the currentCartId result
    assignCurrentCartId(data.createEmptyCart)

    return data.createEmptyCart
  }

  return requestCartId
}
