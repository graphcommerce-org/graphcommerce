import { useApolloClient } from '@graphcommerce/graphql'
import { useCallback } from 'react'
import { CurrentCartIdDocument } from './CurrentCartId.gql'

export function useAssignCurrentCartId() {
  const { cache } = useApolloClient()

  return useCallback(
    (id: string) => {
      cache.writeQuery({
        query: CurrentCartIdDocument,
        data: { currentCartId: { __typename: 'CurrentCartId', id } },
        broadcast: true,
      })
    },
    [cache],
  )
}
