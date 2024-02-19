import { useApolloClient } from '@graphcommerce/graphql'
import { i18n } from '@lingui/core'
import { CreateEmptyCartDocument } from './CreateEmptyCart.gql'
import { readCartId, useAssignCurrentCartId } from './useAssignCurrentCartId'

export function useCartIdCreate() {
  const client = useApolloClient()
  const assignCurrentCartId = useAssignCurrentCartId()

  return async (): Promise<string> => {
    const currentCartId = readCartId(client.cache)?.id

    if (currentCartId) return currentCartId

    const { data } = await client.mutate({ mutation: CreateEmptyCartDocument })
    if (!data?.createEmptyCart) throw Error(i18n._(/* i18n */ 'Could not create an empty cart'))

    // We store the cartId that is returned as the currentCartId result
    assignCurrentCartId(data.createEmptyCart)

    return data.createEmptyCart
  }
}
