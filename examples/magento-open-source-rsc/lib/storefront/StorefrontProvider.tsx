'use client'

import { createContext, useContext } from 'react'
import type { GraphCommerceStorefrontConfig } from '../storefront'

const StorefrontContext = createContext<GraphCommerceStorefrontConfig | null>(null)

type StorefrontProviderProps = {
  storefront: GraphCommerceStorefrontConfig
  children: React.ReactNode
}

export function StorefrontProvider({ storefront, children }: StorefrontProviderProps) {
  return <StorefrontContext.Provider value={storefront}>{children}</StorefrontContext.Provider>
}

/**
 * Get the current storefront config from context Works in App Router where next/router is not
 * available
 */
export function useStorefrontConfigRsc(): GraphCommerceStorefrontConfig {
  const config = useContext(StorefrontContext)
  if (!config) {
    throw new Error('useStorefrontConfigRsc must be used within a StorefrontProvider')
  }
  return config
}
