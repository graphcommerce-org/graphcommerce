// eslint-disable-next-line import/no-extraneous-dependencies
import { ProductItemsGridProps } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { Box } from '@mui/material'
import { useHits } from 'react-instantsearch-hooks-web'
import { useAlgoliaResults } from '../hooks/useAlgoliaResults'
import { AlgoliaHit } from '../lib/types'

export const component = 'ProductListItemsBase'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'demoMode'

/**
 * Example plugin to enable algolia search if the `demoMode` config is set to true
 *
 * You might want to:
 *
 * - Remove the `ifConfig` to always enable this.
 * - Create your own plugins https://www.graphcommerce.org/docs/framework/plugins-react
 */
function AlgoliaSearchPluginPlugin(props: PluginProps<ProductItemsGridProps>) {
  const { Prev, items } = props
  const { products } = useAlgoliaResults()
  console.log(products)
  return <Prev {...props} items={products} />
}

export const Plugin = AlgoliaSearchPluginPlugin
