import type { AddProductsToCartFormProps } from '@graphcommerce/magento-product'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'

export const component = 'AddProductsToCartForm'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'demoMode'

function DemoAddProductsToCartForm(props: PluginProps<AddProductsToCartFormProps>) {
  const { Prev, redirect = 'added', ...rest } = props
  return <Prev {...rest} redirect={redirect} />
}

export const Plugin = DemoAddProductsToCartForm
