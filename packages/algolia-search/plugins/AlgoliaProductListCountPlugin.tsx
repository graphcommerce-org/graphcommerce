import { ProductCountProps } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { Index, usePagination } from 'react-instantsearch-hooks-web'
import { useAlgoliaSearchIndexConfig } from '../hooks/useAlgoliaSearchIndexConfig'

export const component = 'ProductListCountSearch'
export const exported = '@graphcommerce/magento-search'
export const ifConfig: IfConfig = 'algoliaApplicationId'

function AlgoliaProductListCountPlugin(props: PluginProps<ProductCountProps>) {
  const { Prev, ...rest } = props
  const { nbHits } = usePagination()
  const searchIndex = useAlgoliaSearchIndexConfig('_products')?.searchIndex

  if (!searchIndex) return <Prev {...rest} />

  return (
    <Index indexName={searchIndex}>
      <Prev {...rest} total_count={nbHits} />
    </Index>
  )
}

export const Plugin = AlgoliaProductListCountPlugin
