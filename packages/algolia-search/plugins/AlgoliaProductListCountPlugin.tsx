import { ProductCountProps } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { Index, usePagination } from 'react-instantsearch-hooks'
import { useAlgoliaSearchIndex } from '../hooks/useAlgoliaSearchIndex'

export const component = 'ProductListCountSearch'
export const exported = '@graphcommerce/magento-search'
export const ifConfig: IfConfig = 'demoMode'

function AlgoliaProductListCountPlugin(props: PluginProps<ProductCountProps>) {
  const { Prev, ...rest } = props
  const { nbHits } = usePagination()
  const searchIndex = useAlgoliaSearchIndex('_products')

  if (!searchIndex) return <Prev {...rest} />

  return (
    <Index indexName={searchIndex}>
      <Prev {...rest} total_count={nbHits} />
    </Index>
  )
}

export const Plugin = AlgoliaProductListCountPlugin
