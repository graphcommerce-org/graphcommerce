'use client'

import { type usePrivateQueryContext as usePrivateQueryContextType } from '@graphcommerce/graphql'
import { useCustomerSession } from '@graphcommerce/magento-customer/hooks/useCustomerSession'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { useCookie } from '@graphcommerce/next-ui/utils/cookieHooks'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/graphql',
}

export const usePrivateQueryContext: FunctionPlugin<typeof usePrivateQueryContextType> = (
  prev,
  ...args
) => {
  const awaiting = useCustomerSession().query.loading
  const [currencyCode] = useCookie('Magento-Content-Currency')
  const res = prev(...args)
  if (!currencyCode || awaiting) return res
  return { ...res, currencyCode }
}
