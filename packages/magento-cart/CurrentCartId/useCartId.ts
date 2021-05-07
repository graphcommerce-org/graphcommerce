import { useApolloClient, useQuery } from '@apollo/client'
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

export function useAssignCurrentCartId() {
  const { cache } = useApolloClient()

  return (id: string) => {
    cache.writeQuery({
      query: CurrentCartIdDocument,
      data: { currentCartId: { __typename: 'CurrentCartId', id } },
      broadcast: true,
    })
  }
}

export function useCartId() {
  return useQuery(CurrentCartIdDocument, { ssr: false }).data?.currentCartId?.id ?? undefined
}
