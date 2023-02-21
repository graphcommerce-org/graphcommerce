import { i18nAll, i18nConfig, i18nConfigDefault } from '@graphcommerce/next-ui'

export function defaultLocale(): string {
  return i18nConfigDefault().locale
}

export function localeToStore(locale?: string | null | undefined) {
  if (!locale) return i18nConfigDefault().magentoStoreCode
  return i18nConfig(locale)?.magentoStoreCode
}

export function storeToLocale(store?: string | null | undefined) {
  return i18nAll.find((l) => l.magentoStoreCode === store)?.locale
}
