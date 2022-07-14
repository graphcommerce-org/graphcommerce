import { useIsomorphicLayoutEffect } from '@graphcommerce/framer-utils'
import { QueryHookOptions, useQuery } from '@graphcommerce/graphql'
import { useState } from 'react'
import { CurrentCartIdDocument, CurrentCartIdQuery } from './CurrentCartId.gql'
import {} from 'react-dom'

type UseCurrentCartIdOptions<Q, V> = QueryHookOptions<
  Q & Pick<CurrentCartIdQuery, 'currentCartId'>,
  V
> & { hydration?: boolean }

export function useCurrentCartId<Q, V>(options: UseCurrentCartIdOptions<Q, V> = {}) {
  const { hydration = false, ...queryOptions } = options
  const [waitUntilAfterHydration, setWaitUntilAfterHydration] = useState(!hydration)
  useIsomorphicLayoutEffect(() => {
    if (waitUntilAfterHydration) setWaitUntilAfterHydration(false)
  }, [waitUntilAfterHydration])
  const skip = options.skip !== undefined ? options.skip : waitUntilAfterHydration

  const { data, ...queryResults } = useQuery(CurrentCartIdDocument, { ...queryOptions, skip })

  return {
    currentCartId: data?.currentCartId?.id || '',
    ...queryResults,
  }
}
