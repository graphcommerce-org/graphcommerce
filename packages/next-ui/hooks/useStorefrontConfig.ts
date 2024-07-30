import { useRouter } from 'next/router'
import { storefrontConfig } from '../utils/storefrontConfig'

/** Automatically selects the correct storefront config based on the current locale */
export function useStorefrontConfig(locale?: string | undefined) {
  const routerLocale = useRouter().locale
  const config = storefrontConfig(locale ?? routerLocale)
  if (!config) throw Error(`No storefront config found for locale ${locale}`)
  return config
}
