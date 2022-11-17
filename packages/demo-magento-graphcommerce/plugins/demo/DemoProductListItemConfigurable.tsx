import type { ProdustListItemConfigurableProps } from '@graphcommerce/magento-product-configurable'
import type { PluginProps } from '@graphcommerce/next-config'

export const component = 'ProductListItemConfigurable'
export const exported = '@graphcommerce/magento-product-configurable'
export const ifEnv = 'DEMO_MAGENTO_GRAPHCOMMERCE'

function DemoProductListItemConfigurable(props: PluginProps<ProdustListItemConfigurableProps>) {
  const { Prev, ...rest } = props
  return <Prev {...rest} swatchLocations={{ bottomRight: ['dominant_color'] }} />
}
export const Plugin = DemoProductListItemConfigurable
