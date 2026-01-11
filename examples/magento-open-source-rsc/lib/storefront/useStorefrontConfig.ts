'use client'

import { useParams } from 'next/navigation'
import { storefrontConfig } from '../storefront'

/**
 * Get the current storefront config based on the URL [store] param For use in client components in
 * the App Router
 */
export function useStorefrontConfig() {
  const params = useParams<{ store: string }>()
  const config = storefrontConfig(params.store)

  if (!config) {
    throw new Error(`No storefront config found for store '${params.store}'`)
  }

  return config
}
