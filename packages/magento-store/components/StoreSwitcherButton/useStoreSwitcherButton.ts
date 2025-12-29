import { useQuery } from '@graphcommerce/graphql'
import { useCookie } from '@graphcommerce/next-ui'
import { useRouter } from 'next/router'
import { StoreConfigDocument } from '../../graphql'

export function useShowStoreSwitcherButton(options?: Record<string, never>) {
  const config = useQuery(StoreConfigDocument)
  const country = config.data?.storeConfig?.locale?.split('_')?.[1]?.toLowerCase() ?? ''
  const router = useRouter()
  const multiLocale = (router.locales?.length ?? 0) > 1
  const multiCurrency =
    new Set(config.data?.storeConfig?.currency?.available_currency_codes ?? []).size > 1

  const [currency] = useCookie('Magento-Content-Currency')

  return {
    show: multiLocale || multiCurrency,
    multiCurrency,
    country,
    multiLocale,
    currency: currency ?? config.data?.storeConfig?.default_display_currency_code,
    storeName: config.data?.storeConfig?.store_name,
    onClick: () => router.push('/switch-stores'),
  }
}
