'use client'

import { type usePrivateQueryContext as usePrivateQueryContextType } from '@graphcommerce/graphql'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { useCustomerSession } from '../hooks/useCustomerSession'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/graphql',
}

export const usePrivateQueryContext: FunctionPlugin<typeof usePrivateQueryContextType> = (
  prev,
  ...args
) => {
  const { loggedIn } = useCustomerSession()
  const res = prev(...args)
  if (!loggedIn) return res
  return { ...res, loggedIn: true }
}
