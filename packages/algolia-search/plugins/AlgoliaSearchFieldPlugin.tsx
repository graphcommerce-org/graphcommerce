import { SearchContextProps, SearchFormProps } from '@graphcommerce/magento-search'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { SearchBox } from '../components/SearchBox/SearchBox'

export const component = 'SearchForm'
export const exported = '@graphcommerce/magento-search'
export const ifConfig: IfConfig = 'demoMode'

/**
 * Example plugin to enable algolia search if the `demoMode` config is set to true
 *
 * You might want to:
 *
 * - Remove the `ifConfig` to always enable this.
 * - Create your own plugins https://www.graphcommerce.org/docs/framework/plugins-react
 */
function AlgoliaSearchFieldPlugin(props: PluginProps<SearchFormProps>) {
  const { Prev, search } = props

  return <SearchBox defaultValue={search} />
}

export const Plugin = AlgoliaSearchFieldPlugin
