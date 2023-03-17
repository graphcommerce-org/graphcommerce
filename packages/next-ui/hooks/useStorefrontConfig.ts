import { useRouter } from 'next/router'

export const storefrontAll = import.meta.graphCommerce.storefront

/** Get the current storefront config based on the provided locale */
export const storefrontConfig = (locale?: string | undefined) =>
  storefrontAll.find((l) => l.locale === locale)

export const storefrontConfigDefault = () =>
  storefrontAll.find((l) => l.defaultLocale) ?? storefrontAll[0]

/** Automatically selects the correct storefront config based on the current locale */
export function useStorefrontConfig(locale?: string | undefined) {
  const routerLocale = useRouter().locale
  const config = storefrontConfig(locale ?? routerLocale)
  if (!config) throw Error(`No storefront config found for locale ${locale}`)
  return config
}
