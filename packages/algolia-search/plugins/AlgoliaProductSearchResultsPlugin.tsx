// eslint-disable-next-line import/no-extraneous-dependencies
import type { ProductItemsGridProps } from '@graphcommerce/magento-product'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { Index } from 'react-instantsearch-hooks-web'
import { useAlgoliaProductResults } from '../hooks/useAlgoliaProductResults'
import { useAlgoliaSearchIndexConfig } from '../hooks/useAlgoliaSearchIndexConfig'

export const component = 'ProductListItemsBase'
export const exported = '@graphcommerce/magento-search'
export const ifConfig: IfConfig = 'algoliaApplicationId'

function AlgoliaProductSearchPlugin(props: PluginProps<ProductItemsGridProps>) {
  const { Prev, ...rest } = props
  const { products } = useAlgoliaProductResults()
  const searchIndex = useAlgoliaSearchIndexConfig('_products')?.searchIndex

  if (!searchIndex) return <Prev {...rest} />

  return (
    <Index indexName={searchIndex}>
      <Prev {...rest} items={products} />
    </Index>
  )
}

export const Plugin = AlgoliaProductSearchPlugin
