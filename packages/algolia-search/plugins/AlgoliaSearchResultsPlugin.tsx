// eslint-disable-next-line import/no-extraneous-dependencies
import { ProductItemsGridProps } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { useAlgoliaResults } from '../hooks/useAlgoliaResults'
import { useSearchRoute } from '../hooks/useSearchRoute'

export const component = 'ProductListItemsBase'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'demoMode'

function AlgoliaResults(props: PluginProps<ProductItemsGridProps>) {
  const { Prev } = props
  const { products } = useAlgoliaResults()
  return <Prev {...props} items={products} />
}

function AlgoliaSearchPlugin(props: PluginProps<ProductItemsGridProps>) {
  const { Prev } = props
  const search = useSearchRoute()
  if (!search) return <Prev {...props} />

  return <AlgoliaResults {...props} />
}

export const Plugin = AlgoliaSearchPlugin
