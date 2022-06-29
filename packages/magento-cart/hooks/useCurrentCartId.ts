import { QueryHookOptions, useQuery } from '@graphcommerce/graphql'
import { useState, useEffect } from 'react'
import { CurrentCartIdDocument, CurrentCartIdQuery } from './CurrentCartId.gql'

export function useCurrentCartId<Q, V>(
  options: QueryHookOptions<Q & Pick<CurrentCartIdQuery, 'currentCartId'>, Omit<V, 'skip'>> = {},
) {
  const [skip, setSkip] = useState(true)
  const { data, ...queryResults } = useQuery(CurrentCartIdDocument, {
    ...options,
    skip,
  })

  useEffect(() => {
    if (skip) setSkip(false)
  }, [skip])

  return {
    currentCartId: data?.currentCartId?.id || '',
    ...queryResults,
  }
}
