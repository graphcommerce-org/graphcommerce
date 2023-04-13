import { ProductCountProps } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { usePagination } from 'react-instantsearch-hooks'

export const component = 'ProductListCountSearch'
export const exported = '@graphcommerce/magento-search'
export const ifConfig: IfConfig = 'demoMode'

function AlgoliaProductListCountPlugin(props: PluginProps<ProductCountProps>) {
  const { Prev, ...rest } = props
  const { nbHits } = usePagination()
  return <Prev {...rest} total_count={nbHits} />
}

export const Plugin = AlgoliaProductListCountPlugin
