import { useQuery } from '@graphcommerce/graphql'
import { useCookie } from '@graphcommerce/next-ui'
import { useRouter } from 'next/router'
import { StoreConfigDocument } from '../../graphql'

export function useShowStoreSwitcherButton(options?: Record<string, never>) {
  const config = useQuery(StoreConfigDocument)
  const country = config.data?.storeConfig?.locale?.split('_')?.[1]?.toLowerCase() ?? ''
  const router = useRouter()
  const multiLocale = (router.locales?.length ?? 0) > 1
  const availableCurrencies = config.data?.storeConfig?.currency?.available_currency_codes ?? []
  const multiCurrency = new Set(availableCurrencies).size > 1

  const [cookieCurrency] = useCookie('Magento-Content-Currency')

  // Validate cookie currency against available currencies
  const currency =
    cookieCurrency && availableCurrencies.includes(cookieCurrency)
      ? cookieCurrency
      : config.data?.storeConfig?.default_display_currency_code

  return {
    show: multiLocale || multiCurrency,
    multiCurrency,
    country,
    multiLocale,
    currency,
    storeName: config.data?.storeConfig?.store_name,
    onClick: () => router.push('/switch-stores'),
  }
}
