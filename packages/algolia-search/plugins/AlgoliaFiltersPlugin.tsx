import { ProductFiltersProps } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { AlgoliaFilters } from '../components/Filters/AlgoliaFilters'

export const component = 'ProductListFiltersSearch'
export const exported = '@graphcommerce/magento-search'
export const ifConfig: IfConfig = 'demoMode'

function AlgoliaFiltersPlugin(props: PluginProps<ProductFiltersProps>) {
  const { Prev, ...rest } = props
  return <AlgoliaFilters {...rest} />
}

export const Plugin = AlgoliaFiltersPlugin
