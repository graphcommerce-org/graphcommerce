import type { MultiCartIconProps } from '@graphcommerce/magento-multi-cart'
import type { PluginConfig } from '@graphcommerce/next-config'
import { icon404, iconBookmark } from '@graphcommerce/next-ui'

export const config: PluginConfig = {
  type: 'replace',
  module: '@graphcommerce/magento-multi-cart',
}

export function useMultiCartIcon(options: MultiCartIconProps) {
  if (options.config.id === 'bestellijsten') {
    return iconBookmark
  }

  return icon404
}
