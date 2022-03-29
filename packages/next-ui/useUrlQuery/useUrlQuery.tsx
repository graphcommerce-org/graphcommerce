import { ParsedUrlQuery } from 'querystring'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

export function useUrlQuery<T extends ParsedUrlQuery>(builder: (query: T) => T = (query) => query) {
  const { query, replace } = useRouter()
  const queryState = builder(query as T)

  const setRouterQuery = useCallback(
    (partialQuery: T) => {
      if (JSON.stringify(queryState) === JSON.stringify(partialQuery)) return
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      replace({ query: { ...queryState, ...partialQuery } }, undefined, { shallow: true })
    },
    [queryState, replace],
  )

  return [queryState, setRouterQuery] as const
}
