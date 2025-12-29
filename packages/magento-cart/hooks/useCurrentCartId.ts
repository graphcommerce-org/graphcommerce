import { useQuery } from '@graphcommerce/graphql'
import type { CurrentCartIdQuery, CurrentCartIdQueryVariables } from './CurrentCartId.gql'
import { CurrentCartIdDocument } from './CurrentCartId.gql'

export function useCurrentCartId<
  Q extends CurrentCartIdQuery,
  V extends CurrentCartIdQueryVariables,
>(options: Partial<useQuery.Options<Q, V>> = {}) {
  const queryResults = useQuery<Q, V>(CurrentCartIdDocument, options as useQuery.Options<Q, V>)

  return {
    currentCartId: queryResults.data?.currentCartId?.id || '',
    locked: queryResults.data?.currentCartId?.locked || false,
    ...queryResults,
  }
}
