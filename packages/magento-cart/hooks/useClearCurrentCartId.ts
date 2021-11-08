import { useApolloClient } from '@apollo/client'
import { CurrentCartIdDocument } from './CurrentCartId.graphql'

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
  }
}
