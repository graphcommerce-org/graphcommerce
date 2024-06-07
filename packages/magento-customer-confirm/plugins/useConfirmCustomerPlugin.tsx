import type { PluginConfig } from '@graphcommerce/next-config'
import { useConfirmCustomer as newUseConfirmCustomer } from '../hooks/useConfirmCustomer'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/magento-customer',
}

export function useConfirmCustomer() {
  return newUseConfirmCustomer()
}
