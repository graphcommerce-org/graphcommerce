import type { SearchFormProps } from '@graphcommerce/magento-search'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { SearchBox } from '../components/SearchBox/SearchBox'

export const component = 'SearchForm'
export const exported = '@graphcommerce/magento-search'
export const ifConfig: IfConfig = 'algoliaApplicationId'

function AlgoliaSearchFieldPlugin(props: PluginProps<SearchFormProps>) {
  return <SearchBox {...props} />
}

export const Plugin = AlgoliaSearchFieldPlugin
