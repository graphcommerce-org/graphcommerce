import { storefrontAll, storefrontConfig, storefrontConfigDefault } from '@graphcommerce/next-ui'

export function defaultLocale(): string {
  return storefrontConfigDefault().locale
}

export function localeToStore(locale?: string | null | undefined) {
  if (!locale) return storefrontConfigDefault().magentoStoreCode
  return storefrontConfig(locale)?.magentoStoreCode
}

export function storeToLocale(store?: string | null | undefined) {
  return storefrontAll.find((l) => l.magentoStoreCode === store)?.locale
}
