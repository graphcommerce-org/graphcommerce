import { AddProductsToCartFormProps } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'

export const component = 'AddProductsToCartForm'
export const exported = '@graphcommerce/magento-product/components/AddProductsToCartForm'
export const ifConfig: IfConfig = 'demoMode'

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

export const Plugin = EnableCrossselsPlugin
