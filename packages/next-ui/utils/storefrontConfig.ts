import { storefront } from '@graphcommerce/next-config/config'

export const storefrontAll = storefront

/** Get the current storefront config based on the provided locale */
export const storefrontConfig = (locale?: string | undefined) =>
  storefront.find((l) => l.locale === locale)

export const storefrontConfigDefault = () =>
  storefront.find((l) => l.defaultLocale) ?? storefrontAll[0]
