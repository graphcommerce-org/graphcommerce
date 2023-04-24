import { SearchContextProps } from '@graphcommerce/magento-search'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { useStorefrontConfig } from '@graphcommerce/next-ui'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, InstantSearchSSRProviderProps } from 'react-instantsearch-hooks'
import { applicationId, searchOnlyApiKey } from '../lib/configuration'

export const component = 'SearchContext'
export const exported = '@graphcommerce/magento-search'
export const ifConfig: IfConfig = 'demoMode'

const searchClient = algoliasearch(applicationId, searchOnlyApiKey)

function AlgoliaSearchContextPlugin(
  props: PluginProps<SearchContextProps & InstantSearchSSRProviderProps>,
) {
  const { Prev, initialResults, ...rest } = props
  const { searchIndex } = useStorefrontConfig().algoliaSearchIndexConfig[0]

  return (
    <InstantSearch searchClient={searchClient} indexName={searchIndex}>
      <Prev {...rest} />
    </InstantSearch>
  )
}

export const Plugin = AlgoliaSearchContextPlugin
