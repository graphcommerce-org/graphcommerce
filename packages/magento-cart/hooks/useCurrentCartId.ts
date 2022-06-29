import { QueryHookOptions, useQuery } from '@graphcommerce/graphql'
import { CurrentCartIdDocument, CurrentCartIdQuery } from './CurrentCartId.gql'

export function useCurrentCartId<Q, V>(
  options: QueryHookOptions<Q & Pick<CurrentCartIdQuery, 'currentCartId'>, V> = {},
) {
  return (
    useQuery(CurrentCartIdDocument, { ...options, ssr: false }).data?.currentCartId?.id ?? undefined
  )
}
