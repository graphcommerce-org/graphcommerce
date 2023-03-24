import { SearchContextProps } from '@graphcommerce/magento-search'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-hooks'
import { applicationId, searchOnlyApiKey } from '../lib/configuration'

export const component = 'SearchContext'
export const exported = '@graphcommerce/magento-search'
export const ifConfig: IfConfig = 'demoMode'

const searchClient = algoliasearch(applicationId, searchOnlyApiKey)
const searchIndex = import.meta.graphCommerce.algoliaSearchIndex ?? ''

/**
 * Example plugin to enable algolia search if the `demoMode` config is set to true
 *
 * You might want to:
 *
 * - Remove the `ifConfig` to always enable this.
 * - Create your own plugins https://www.graphcommerce.org/docs/framework/plugins-react
 */
function AlgoliaSearchContextPlugin(props: PluginProps<SearchContextProps>) {
  const { Prev, children } = props
  return (
    <InstantSearch indexName={searchIndex} searchClient={searchClient}>
      <Prev>{children}</Prev>
    </InstantSearch>
  )
}

export const Plugin = AlgoliaSearchContextPlugin
