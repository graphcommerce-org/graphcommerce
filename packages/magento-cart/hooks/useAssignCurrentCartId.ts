import { useApolloClient } from '@apollo/client'
import { useCallback } from 'react'
import { CurrentCartIdDocument } from './CurrentCartId.graphql'

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
