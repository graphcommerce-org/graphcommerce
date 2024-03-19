import { getProductStaticPaths as getProductStaticPathsType } from '@graphcommerce/magento-product'
import { IfConfig } from '@graphcommerce/next-config'

export const replace = true
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'demoMode'

// eslint-disable-next-line @typescript-eslint/require-await
export const getProductStaticPaths: typeof getProductStaticPathsType = async () => [
  { params: { url: 'demo-product' } },
]
