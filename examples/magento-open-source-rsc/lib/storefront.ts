import { notFound } from 'next/navigation'

/**
 * Storefront configuration type Simplified version that doesn't import from @graphcommerce packages
 * to avoid transitive next/router imports in Server Components
 */
export type StorefrontConfig = {
  locale: string
  magentoStoreCode: string
  defaultLocale?: boolean
  linguiLocale?: string
  canonicalBaseUrl?: string
  googleAnalyticsId?: string
  googleRecaptchaKey?: string
  googleTagmanagerId?: string
}

/**
 * Hardcoded storefront configuration TODO: Replace with dynamic config import once packages are
 * RSC-compatible
 */
const storefront: StorefrontConfig[] = [
  {
    locale: 'en',
    magentoStoreCode: 'en_US',
    defaultLocale: true,
  },
  {
    locale: 'nl',
    magentoStoreCode: 'nl_NL',
  },
]

/** Get all available storefronts */
export const storefrontAll = storefront

/** Get the default storefront config */
export const storefrontConfigDefault = () =>
  storefront.find((l) => l.defaultLocale) ?? storefront[0]

/**
 * Get storefront config by locale (used with [store] param) In App Router, the [store] param maps
 * to the locale
 */
export function getStorefrontConfig(store: string): StorefrontConfig {
  const config = storefront.find((l) => l.locale === store)
  if (!config) {
    notFound()
  }
  return config
}

/** Get all store params for generateStaticParams */
export function generateStoreParams() {
  return storefront.map((sf) => ({ store: sf.locale }))
}
