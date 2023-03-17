import type { ProdustListItemConfigurableProps } from '@graphcommerce/magento-product-configurable'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'

export const component = 'ProductListItemConfigurable'
export const exported = '@graphcommerce/magento-product-configurable'
export const ifConfig: IfConfig = 'demoMode'

function DemoProductListItemConfigurable(props: PluginProps<ProdustListItemConfigurableProps>) {
  const { Prev, ...rest } = props
  return <Prev {...rest} swatchLocations={{ bottomRight: ['dominant_color'] }} />
}
export const Plugin = DemoProductListItemConfigurable
