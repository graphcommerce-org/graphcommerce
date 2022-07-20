import { useApolloClient } from '@graphcommerce/graphql'
import { cookie } from '@graphcommerce/next-ui'
import { CurrentCartIdDocument } from './CurrentCartId.gql'
import { CART_ID_COOKIE } from './useAssignCurrentCartId'

export function useClearCurrentCartId() {
  const { cache } = useApolloClient()

  return () => {
    const id = cache.readQuery({ query: CurrentCartIdDocument })?.currentCartId?.id
    if (!id) return

    cache.writeQuery({
      query: CurrentCartIdDocument,
      data: { currentCartId: { __typename: 'CurrentCartId', id: null } },
      broadcast: true,
    })
    cookie(CART_ID_COOKIE, null)
  }
}
