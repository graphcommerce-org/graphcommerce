import { QueryHookOptions, useQuery } from '@graphcommerce/graphql'
import {
  CurrentCartIdDocument,
  CurrentCartIdQuery,
  CurrentCartIdQueryVariables,
} from './CurrentCartId.gql'

export function useCurrentCartId<
  Q extends CurrentCartIdQuery,
  V extends CurrentCartIdQueryVariables,
>(options: QueryHookOptions<Q, V> = {}) {
  const queryResults = useQuery<Q, V>(CurrentCartIdDocument, options)
  return { currentCartId: queryResults.data?.currentCartId?.id || '', ...queryResults }
}
