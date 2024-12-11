import type { QueryHookOptions } from '@graphcommerce/graphql'
import { useQuery } from '@graphcommerce/graphql'
import type { CurrentCartIdQuery, CurrentCartIdQueryVariables } from './CurrentCartId.gql'
import { CurrentCartIdDocument } from './CurrentCartId.gql'

export function useCurrentCartId<
  Q extends CurrentCartIdQuery,
  V extends CurrentCartIdQueryVariables,
>(options: QueryHookOptions<Q, V> = {}) {
  const queryResults = useQuery<Q, V>(CurrentCartIdDocument, options)

  return {
    currentCartId: queryResults.data?.currentCartId?.id || '',
    locked: queryResults.data?.currentCartId?.locked || false,
    ...queryResults,
  }
}
