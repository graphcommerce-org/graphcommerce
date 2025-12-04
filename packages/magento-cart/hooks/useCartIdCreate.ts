import { useApolloClient } from '@graphcommerce/graphql'
import { t } from '@lingui/core/macro'
import { CreateEmptyCartDocument } from './CreateEmptyCart.gql'
import { readCartId, useAssignCurrentCartId } from './useAssignCurrentCartId'

export function useCartIdCreate() {
  const client = useApolloClient()
  const assignCurrentCartId = useAssignCurrentCartId()

  return async (): Promise<string> => {
    const currentCartId = readCartId(client.cache)?.id

    if (currentCartId) return currentCartId

    const { data } = await client.mutate({ mutation: CreateEmptyCartDocument })
    if (!data?.createEmptyCart) throw Error(t`Could not create an empty cart`)

    // We store the cartId that is returned as the currentCartId result
    assignCurrentCartId(data.createEmptyCart)

    return data.createEmptyCart
  }
}
