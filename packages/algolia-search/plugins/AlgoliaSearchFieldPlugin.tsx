import { SearchFormProps } from '@graphcommerce/magento-search'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { SearchBox } from '../components/SearchBox/SearchBox'

export const component = 'SearchForm'
export const exported = '@graphcommerce/magento-search'
export const ifConfig: IfConfig = 'algoliaApplicationId'

function AlgoliaSearchFieldPlugin(props: PluginProps<SearchFormProps>) {
  const { search } = props
  return <SearchBox defaultValue={search} />
}

export const Plugin = AlgoliaSearchFieldPlugin
