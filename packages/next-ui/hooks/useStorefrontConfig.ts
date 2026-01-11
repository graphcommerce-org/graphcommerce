'use client'

import { useParams, usePathname } from 'next/navigation'
import { storefrontConfig, storefrontConfigDefault } from '../utils/storefrontConfig'

/**
 * Automatically selects the correct storefront config based on the current locale In App Router,
 * the locale is derived from the [store] param or the first path segment
 */
export function useStorefrontConfig(locale?: string | undefined) {
  const params = useParams<{ store?: string }>()
  const pathname = usePathname()

  // Try to get locale from params, or from first path segment, or use provided locale
  const derivedLocale = locale ?? params?.store ?? pathname?.split('/')[1]
  const config = storefrontConfig(derivedLocale) ?? storefrontConfigDefault()

  if (!config) throw Error(`No storefront config found for locale '${derivedLocale}'`)
  return config
}
