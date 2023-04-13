import { ProductCountProps } from '@graphcommerce/magento-product'
import { PluginProps } from '@graphcommerce/next-config'
import { usePagination } from 'react-instantsearch-hooks'

export function ProductListCount(props: PluginProps<ProductCountProps>) {
  const { Prev, ...rest } = props
  const { nbHits } = usePagination()

  return <Prev {...rest} total_count={nbHits} />
}
