import { useApolloClient } from '@graphcommerce/graphql'
import { useCallback } from 'react'
import { CurrentCartIdDocument } from './CurrentCartId.gql'

export function useClearCurrentCartId() {
  const { cache } = useApolloClient()

  return useCallback(() => {
    const id = cache.readQuery({ query: CurrentCartIdDocument })?.currentCartId?.id
    if (!id) return

    cache.writeQuery({
      query: CurrentCartIdDocument,
      data: { currentCartId: { __typename: 'CurrentCartId', id: null } },
      broadcast: true,
    })
  }, [cache])
}
