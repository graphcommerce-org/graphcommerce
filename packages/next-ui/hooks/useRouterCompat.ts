'use client'

import { useRouter as useAppRouter, usePathname, useSearchParams } from 'next/navigation'

/**
 * Compatibility hook that provides router functionality for both Pages Router and App Router.
 *
 * This hook abstracts the differences between:
 *
 * - Pages Router: `useRouter()` from `next/router`
 * - App Router: `useRouter()`, `usePathname()`, `useSearchParams()` from `next/navigation`
 *
 * Usage:
 *
 * ```tsx
 * const { pathname, push, back, asPath } = useRouterCompat()
 * ```
 */
export function useRouterCompat() {
  const router = useAppRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Reconstruct asPath from pathname and searchParams
  const search = searchParams?.toString()
  const asPath = search ? `${pathname}?${search}` : pathname

  return {
    /** Current pathname without query string */
    pathname,
    /** Full path including query string (equivalent to Pages Router asPath) */
    asPath,
    /** Navigate to a new URL */
    push: router.push,
    /** Replace current URL */
    replace: router.replace,
    /** Go back in history */
    back: router.back,
    /** Prefetch a URL */
    prefetch: router.prefetch,
    /** Refresh the current route */
    refresh: router.refresh,
    /** The underlying router object */
    router,
  }
}
