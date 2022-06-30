import { useIsomorphicLayoutEffect } from '@graphcommerce/framer-utils'
import { QueryHookOptions, useQuery } from '@graphcommerce/graphql'
import { useState } from 'react'
import { CurrentCartIdDocument, CurrentCartIdQuery } from './CurrentCartId.gql'

export function useCurrentCartId<Q, V>(
  options: QueryHookOptions<Q & Pick<CurrentCartIdQuery, 'currentCartId'>, Omit<V, 'skip'>> = {},
) {
  const [skip, setSkip] = useState(true)
  const { data, ...queryResults } = useQuery(CurrentCartIdDocument, {
    ...options,
    skip,
  })

  useIsomorphicLayoutEffect(() => {
    if (skip) setSkip(false)
  }, [skip])

  return {
    currentCartId: data?.currentCartId?.id || '',
    ...queryResults,
  }
}
