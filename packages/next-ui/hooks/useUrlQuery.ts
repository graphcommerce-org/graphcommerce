import { useRouter } from 'next/router'
import { useCallback } from 'react'

export function useUrlQuery<T extends Record<string, string | null>>() {
  const { query, replace } = useRouter()

  const setRouterQuery = useCallback(
    (incoming: T) => {
      const current = Object.fromEntries(new URLSearchParams(window.location.search).entries())
      const newQuery = Object.fromEntries(
        Object.entries({ ...current, ...incoming }).filter(([, value]) => value !== null),
      )

      if (JSON.stringify(current) === JSON.stringify(newQuery)) return Promise.resolve(true)

      return replace({ query: newQuery }, undefined, { shallow: true })
    },
    [replace],
  )

  return [query as T, setRouterQuery] as const
}
