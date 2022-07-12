import { useIsomorphicLayoutEffect } from '@graphcommerce/framer-utils'
import { QueryHookOptions, useQuery } from '@graphcommerce/graphql'
import { useState } from 'react'
import { CurrentCartIdDocument, CurrentCartIdQuery } from './CurrentCartId.gql'

export function useCurrentCartId<Q, V>(
  options: QueryHookOptions<Q & Pick<CurrentCartIdQuery, 'currentCartId'>, V> = {},
) {
  const [skip, setSkip] = useState(true)
  const { data, ...queryResults } = useQuery(CurrentCartIdDocument, {
    ...options,
    skip: options.skip !== undefined ? options.skip : skip,
  })

  useIsomorphicLayoutEffect(() => {
    if (skip) setSkip(false)
  }, [skip])

  return {
    currentCartId: data?.currentCartId?.id || '',
    ...queryResults,
  }
}
