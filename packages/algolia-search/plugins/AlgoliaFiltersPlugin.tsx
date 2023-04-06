import { ProductFiltersProps } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { useRouter } from 'next/router'
import { FilterChip } from '../components/FilterChip/FilterChip'

export const component = 'ProductListFilters'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'demoMode'

function AlgoliaFilters(props: ProductFiltersProps) {
  const { filterTypes, aggregations } = props
  if (!aggregations) return null
  return aggregations.map((agg) => (
    <FilterChip attribute={agg?.attribute_code ?? ''} title={agg?.label ?? ''} />
  ))
}

/**
 * Example plugin to enable algolia search if the `demoMode` config is set to true
 *
 * You might want to:
 *
 * - Remove the `ifConfig` to always enable this.
 * - Create your own plugins https://www.graphcommerce.org/docs/framework/plugins-react
 */
function AlgoliaFiltersPlugin(props: PluginProps<ProductFiltersProps>) {
  const { Prev } = props
  const router = useRouter()
  if (!router.asPath.includes('/search')) return <Prev {...props} />

  return <AlgoliaFilters {...props} />
}

export const Plugin = AlgoliaFiltersPlugin
