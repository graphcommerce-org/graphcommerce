import { AddProductsToCartFormProps } from '@graphcommerce/magento-product'
import { PluginConfig, PluginProps } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
  ifConfig: 'demoMode',
}

/**
 * Example plugin to enable crosssells if the `demoMode` config is set to true
 *
 * You might want to:
 *
 * - Remove the `ifConfig` to always enable this.
 * - Create your own plugins https://www.graphcommerce.org/docs/framework/plugins-react
 */
function EnableCrossselsPlugin(props: PluginProps<AddProductsToCartFormProps>) {
  const { Prev, redirect = 'added', ...rest } = props
  return <Prev {...rest} redirect={redirect} />
}

export const AddProductsToCartForm = EnableCrossselsPlugin
