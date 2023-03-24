import { OperationVariables, QueryHookOptions, useQuery } from '@graphcommerce/graphql'
import { CurrentCartIdDocument, CurrentCartIdQuery } from './CurrentCartId.gql'

type UseCurrentCartIdOptions<Q, V extends OperationVariables> = QueryHookOptions<
  Q & Pick<CurrentCartIdQuery, 'currentCartId'>,
  V
>

export function useCurrentCartId<Q, V extends OperationVariables>(
  options: UseCurrentCartIdOptions<Q, V> = {},
) {
  const queryResults = useQuery(CurrentCartIdDocument, { ...options })
  return { currentCartId: queryResults.data?.currentCartId?.id || '', ...queryResults }
}
