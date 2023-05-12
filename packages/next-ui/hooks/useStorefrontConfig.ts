import { useRouter } from 'next/compat/router'
import { storefrontAll } from '../config/storefrontConfig'

/** Automatically selects the correct storefront config based on the current locale */
export function useStorefrontConfig(locale?: string | undefined) {
  const routerLocale = useRouter()?.locale
  const config = storefrontAll.find((l) => l.locale === (locale || routerLocale))
  if (!config) throw Error(`No storefront config found for locale ${locale}`)
  return config
}
