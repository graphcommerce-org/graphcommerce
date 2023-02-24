import type {} from '@graphcommerce/next-config'
import { useRouter } from 'next/router'

export const i18nAll = import.meta.graphCommerce.i18n

/** Get the current i18n config based on the provided locale */
export const i18nConfig = (locale?: string | undefined) => i18nAll.find((l) => l.locale === locale)

export const i18nConfigDefault = () => i18nAll.find((l) => l.defaultLocale) ?? i18nAll[0]

/** Automatically selects the correct i18n config based on the current locale */
export function useI18nConfig(locale?: string | undefined) {
  const routerLocale = useRouter().locale
  const config = i18nConfig(locale ?? routerLocale)
  if (!config) throw Error(`No i18n config found for locale ${locale}`)
  return config
}
