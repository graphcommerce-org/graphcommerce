'use client'

import type {} from '@graphcommerce/next-config'
import { canonicalBaseUrl } from '@graphcommerce/next-config/config'
import { usePathname } from 'next/navigation'
import type { LiteralUnion } from 'type-fest'
import { storefrontConfig, storefrontConfigDefault } from '../utils/storefrontConfig'

export type Canonical = LiteralUnion<
  `http://${string}` | `https://${string}` | `/${string}`,
  string
>

type CanonicalizeOptions = {
  pathname?: string | null
  locale?: string
}

/**
 * Canonicalize a URL path to a full canonical URL Works with both Pages Router and App Router
 *
 * In App Router, pass the pathname and locale as options In Pages Router, you can use the
 * useCanonical hook which automatically gets these from the router
 */
export function canonicalize(options: CanonicalizeOptions, incoming?: Canonical) {
  let canonical = incoming

  if (!canonical) return canonical

  if (!canonical.startsWith('http') && !canonical.startsWith('/')) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `canonical is relative (${canonical}), a canonical must start with '/', 'http://' or 'https://'`,
      )
    }
    canonical = `/${canonical}`
  }

  if (canonical.startsWith('/')) {
    const conf = storefrontConfig(options.locale) ?? storefrontConfigDefault()

    let siteUrl = conf?.canonicalBaseUrl || canonicalBaseUrl

    if (conf?.domain && !conf?.canonicalBaseUrl) siteUrl = `https://${conf.domain}`

    if (siteUrl?.endsWith('/')) siteUrl = siteUrl.slice(0, -1)

    canonical = `${siteUrl}${canonical}`
  }

  if (!canonical.startsWith('http')) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(
        `canonical must start with '/', 'http://' or 'https://', '${canonical}' given`,
      )
    }
    canonical = undefined
  }

  return canonical
}

/**
 * Hook to canonicalize a URL for the current page For App Router, extracts locale from pathname
 */
export function useCanonical(incoming?: Canonical) {
  const pathname = usePathname()
  // Extract locale from pathname (first segment after /)
  const locale = pathname?.split('/')[1]

  return canonicalize({ pathname, locale }, incoming)
}
