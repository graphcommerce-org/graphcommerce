// eslint-disable-next-line import/no-extraneous-dependencies
import { ProductItemsGridProps } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { useAlgoliaResults } from '../hooks/useAlgoliaResults'

export const component = 'ProductListItemsSearch'
export const exported = '@graphcommerce/magento-search'
export const ifConfig: IfConfig = 'demoMode'

function AlgoliaSearchPlugin(props: PluginProps<ProductItemsGridProps>) {
  const { Prev, ...rest } = props
  const { products } = useAlgoliaResults()
  return <Prev {...rest} items={products} />
}

export const Plugin = AlgoliaSearchPlugin
