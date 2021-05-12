import { useApolloClient } from '@apollo/client'
import { CurrentCartIdDocument } from './CurrentCartId.gql'

export function useClearCurrentCartId() {
  const { cache } = useApolloClient()

  return () => {
    cache.writeQuery({
      query: CurrentCartIdDocument,
      data: { currentCartId: { __typename: 'CurrentCartId', id: null } },
      broadcast: true,
    })
  }
}
