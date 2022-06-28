import { useMutation } from '@graphcommerce/graphql'
import { i18n } from '@lingui/core'
import { CreateEmptyCartDocument } from './CreateEmptyCart.gql'
import { useAssignCurrentCartId } from './useAssignCurrentCartId'
import { useCurrentCartId } from './useCurrentCartId'

export function useCartIdCreate() {
  const cartId = useCurrentCartId()
  const [create] = useMutation(CreateEmptyCartDocument)
  const assignCurrentCartId = useAssignCurrentCartId()

  return async (): Promise<string> => {
    if (cartId) return cartId

    const { data } = await create()
    if (!data?.createEmptyCart) throw Error(i18n._(/* i18n */ 'Could not create an empty cart'))

    // We store the cartId that is returned as the currentCartId result
    assignCurrentCartId(data.createEmptyCart)

    return data.createEmptyCart
  }
}
