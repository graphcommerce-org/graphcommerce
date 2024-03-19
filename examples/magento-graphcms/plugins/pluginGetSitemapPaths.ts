import { getSitemapPaths as getSitemapPathsType } from '@graphcommerce/magento-product'
import { IfConfig, MethodPlugin } from '@graphcommerce/next-config'

export const method = 'getSitemapPaths'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'demoMode'

export const plugin: MethodPlugin<typeof getSitemapPathsType> = (prev, ...args) => {
  console.log('getSitemapPaths plugin ran!')
  return prev(...args)
}
