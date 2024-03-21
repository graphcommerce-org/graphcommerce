import { ProductPageNameProps } from '@graphcommerce/magento-product'
import { PluginConfig } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'replace',
  module: '@graphcommerce/magento-product',
  ifConfig: 'demoMode',
}

export function ProductPageName(props: ProductPageNameProps) {
  const { product } = props
  return <div>Complete overrides {product.url_key}</div>
}
