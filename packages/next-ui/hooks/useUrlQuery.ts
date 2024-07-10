import { useRouter } from 'next/router'
import { useCallback } from 'react'

export function useUrlQuery<T extends Record<string, string | null>>(doPush?: boolean) {
  const { query, replace, push } = useRouter()

  const setRouterQuery = useCallback(
    (incoming: T) => {
      const current = Object.fromEntries(new URLSearchParams(window.location.search).entries())
      const newQuery = Object.fromEntries(
        Object.entries({ ...current, ...incoming }).filter(([, value]) => value !== null),
      )

      if (JSON.stringify(current) === JSON.stringify(newQuery)) return Promise.resolve(true)

      return doPush
        ? push({ query: newQuery })
        : replace({ query: newQuery }, undefined, { shallow: true })
    },
    [doPush, push, replace],
  )

  return [query as T, setRouterQuery] as const
}
