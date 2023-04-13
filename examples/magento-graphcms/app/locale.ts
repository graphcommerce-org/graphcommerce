import { useParams } from 'next/navigation'
import { PageProps } from './[storefront]/types'

const storefrontAll = import.meta.graphCommerce.storefront

const defaultStorefrontConfig = storefrontAll.find((l) => l.defaultLocale) ?? storefrontAll[0]

/** Get the current storefront config based on the provided locale */
export const getStorefrontConfig = (locale: string | undefined = defaultStorefrontConfig.locale) =>
  storefrontAll.find((l) => l.locale === locale) ?? defaultStorefrontConfig

export const useLocale = () => {
  const locale = useParams().storefront
  return Array.isArray(locale) ? locale[0] : locale
}

export function configFromProps(props?: PageProps) {
  const storefront = props?.params?.storefront

  if (typeof storefront !== 'string') {
    throw Error('Invalid storefront provided, please pass the props ')
  }
  return getStorefrontConfig(storefront)
}
