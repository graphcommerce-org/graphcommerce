import type { GraphCommerceStorefrontConfig } from '@graphcommerce/next-config'
import { storefront } from '@graphcommerce/next-config/config'
import { notFound } from 'next/navigation'

export type { GraphCommerceStorefrontConfig }

/** Get all available storefronts */
export const storefrontAll = storefront

/** Get the default storefront config */
export const storefrontConfigDefault = () =>
  storefront.find((l) => l.defaultLocale) ?? storefront[0]

/** Get storefront config by locale - used in RSC with params.store */
export function storefrontConfig(
  locale: string | undefined,
): GraphCommerceStorefrontConfig | undefined {
  return storefront.find((l) => l.locale === locale)
}

/**
 * Get storefront config by locale - throws notFound() if not found Use this in RSC pages/layouts
 * where you have params.store
 */
export function getStorefrontConfig(store: string): GraphCommerceStorefrontConfig {
  const config = storefrontConfig(store)
  if (!config) {
    notFound()
  }
  return config
}

/** Get all store params for generateStaticParams */
export function generateStoreParams() {
  return storefront.map((sf) => ({ store: sf.locale }))
}
