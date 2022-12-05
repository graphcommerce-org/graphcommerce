import type { AddProductsToCartFormProps } from '@graphcommerce/magento-product'
import type { PluginProps } from '@graphcommerce/next-config'

export const component = 'AddProductsToCartForm'
export const exported = '@graphcommerce/magento-product'
export const ifEnv = 'DEMO_MAGENTO_GRAPHCOMMERCE'

function DemoAddProductsToCartForm(props: PluginProps<AddProductsToCartFormProps>) {
  const { Prev, redirect = 'added', ...rest } = props
  return <Prev {...rest} redirect={redirect} />
}

export const Plugin = DemoAddProductsToCartForm
