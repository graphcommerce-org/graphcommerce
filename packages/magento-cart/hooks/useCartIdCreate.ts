import { useMutation } from '@apollo/client'
import { CreateEmptyCartDocument } from './CreateEmptyCart.graphql'
import { useAssignCurrentCartId } from './useAssignCurrentCartId'
import { useCurrentCartId } from './useCurrentCartId'

export function useCartIdCreate() {
  const cartId = useCurrentCartId()
  const [create] = useMutation(CreateEmptyCartDocument)
  const assignCurrentCartId = useAssignCurrentCartId()

  return async (): Promise<string> => {
    if (cartId) return cartId

    const { data } = await create()
    if (!data?.createEmptyCart) throw Error('Could not create an empty cart')

    // We store the cartId that is returned as the currentCartId result
    assignCurrentCartId(data.createEmptyCart)

    return data.createEmptyCart
  }
}
