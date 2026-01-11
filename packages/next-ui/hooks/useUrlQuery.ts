'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

export function useUrlQuery<T extends Record<string, string | null>>(doPush?: boolean) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Convert searchParams to a record object
  const query = useMemo(() => {
    const result: Record<string, string> = {}
    searchParams?.forEach((value, key) => {
      result[key] = value
    })
    return result as T
  }, [searchParams])

  const setRouterQuery = useCallback(
    (incoming: T) => {
      const current = Object.fromEntries(new URLSearchParams(window.location.search).entries())
      const newQuery = Object.fromEntries(
        Object.entries({ ...current, ...incoming }).filter(([, value]) => value !== null),
      )

      if (JSON.stringify(current) === JSON.stringify(newQuery)) return

      const newSearchParams = new URLSearchParams(newQuery as Record<string, string>)
      const newUrl = `${pathname}${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`

      if (doPush) {
        router.push(newUrl)
      } else {
        router.replace(newUrl)
      }
    },
    [doPush, pathname, router],
  )

  return [query, setRouterQuery] as const
}
