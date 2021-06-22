import { useApolloClient } from '@apollo/client'
import { CurrentCartIdDocument } from './CurrentCartId.gql'
import { useCurrentCartId } from './useCurrentCartId'

export function useClearCurrentCartId() {
  const { cache } = useApolloClient()
  const currentCartId = useCurrentCartId()

  if (!currentCartId) return undefined

  return () => {
    cache.writeQuery({
      query: CurrentCartIdDocument,
      data: { currentCartId: { __typename: 'CurrentCartId', id: null } },
      broadcast: true,
    })
  }
}
