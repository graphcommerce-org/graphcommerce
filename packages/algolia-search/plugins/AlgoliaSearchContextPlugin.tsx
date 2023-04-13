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

function AlgoliaSearchContextPlugin(props: PluginProps<SearchContextProps>) {
  const { Prev, ...rest } = props
  return (
    <InstantSearch indexName={searchIndex} searchClient={searchClient}>
      <Prev {...rest} />
    </InstantSearch>
  )
}

export const Plugin = AlgoliaSearchContextPlugin
