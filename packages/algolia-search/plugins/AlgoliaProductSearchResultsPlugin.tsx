// eslint-disable-next-line import/no-extraneous-dependencies
import { ProductItemsGridProps } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { Index } from 'react-instantsearch-hooks'
import { useAlgoliaProductResults } from '../hooks/useAlgoliaProductResults'
import { useAlgoliaSearchIndex } from '../hooks/useAlgoliaSearchIndex'

export const component = 'ProductListItemsSearch'
export const exported = '@graphcommerce/magento-search'
export const ifConfig: IfConfig = 'demoMode'

function AlgoliaProductSearchPlugin(props: PluginProps<ProductItemsGridProps>) {
  const { Prev, ...rest } = props
  const { products } = useAlgoliaProductResults()
  const searchIndex = useAlgoliaSearchIndex('_products')

  if (!searchIndex) return <Prev {...rest} />

  return (
    <Index indexName={searchIndex}>
      <Prev {...rest} items={products} />
    </Index>
  )
}

export const Plugin = AlgoliaProductSearchPlugin
