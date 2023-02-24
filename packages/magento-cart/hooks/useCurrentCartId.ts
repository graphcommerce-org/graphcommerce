import { useIsomorphicLayoutEffect } from '@graphcommerce/framer-utils'
import { OperationVariables, QueryHookOptions, useQuery } from '@graphcommerce/graphql'
import { startTransition, useState } from 'react'
import { CurrentCartIdDocument, CurrentCartIdQuery } from './CurrentCartId.gql'
import {} from 'react-dom'

type UseCurrentCartIdOptions<Q, V extends OperationVariables> = QueryHookOptions<
  Q & Pick<CurrentCartIdQuery, 'currentCartId'>,
  V
> & { hydration?: boolean }

export function useCurrentCartId<Q, V extends OperationVariables>(
  options: UseCurrentCartIdOptions<Q, V> = {},
) {
  const { hydration = false, ...queryOptions } = options
  const [hydrating, setHydrating] = useState(!hydration)

  useIsomorphicLayoutEffect(() => {
    if (!hydrating) return
    startTransition(() => setHydrating(false))
  }, [hydrating])

  const skip = options.skip !== undefined ? options.skip : hydrating

  const { data, ...queryResults } = useQuery(CurrentCartIdDocument, { ...queryOptions, skip })

  return {
    currentCartId: data?.currentCartId?.id || '',
    data,
    ...queryResults,
  }
}
