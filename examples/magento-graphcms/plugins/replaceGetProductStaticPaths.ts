import { getProductStaticPaths as getProductStaticPathsType } from '@graphcommerce/magento-product'
import { PluginConfig } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'replace',
  module: '@graphcommerce/magento-product',
  ifConfig: 'demoMode',
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getProductStaticPaths: typeof getProductStaticPathsType = async () => [
  { params: { url: 'demo-product' } },
]
