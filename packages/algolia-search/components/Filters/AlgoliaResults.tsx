import { ProductItemsGridProps } from '@graphcommerce/magento-product'
import { PluginProps } from '@graphcommerce/next-config'
import { useAlgoliaResults } from '../../hooks/useAlgoliaResults'

export function AlgoliaResults(props: PluginProps<ProductItemsGridProps>) {
  const { Prev } = props
  const { products } = useAlgoliaResults()
  return <Prev {...props} items={products} />
}
