import type { ProdustListItemConfigurableProps } from '@graphcommerce/magento-product-configurable'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product-configurable',
  ifConfig: 'demoMode',
}

export function ProductListItemConfigurable(props: PluginProps<ProdustListItemConfigurableProps>) {
  const { Prev, ...rest } = props
  return <Prev {...rest} swatchLocations={{ bottomRight: ['dominant_color'] }} />
}
