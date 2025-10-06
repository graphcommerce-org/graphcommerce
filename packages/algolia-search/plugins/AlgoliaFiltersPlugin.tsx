import type { ProductFiltersProps } from '@graphcommerce/magento-product'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { AlgoliaFilters } from '../components/Filters/AlgoliaFilters'

export const component = 'ProductListFilters'
export const exported = '@graphcommerce/magento-search'
export const ifConfig: IfConfig = 'algoliaApplicationId'

function AlgoliaFiltersPlugin(props: PluginProps<ProductFiltersProps>) {
  const { Prev, ...rest } = props
  return <AlgoliaFilters {...rest} />
}

export const Plugin = AlgoliaFiltersPlugin
