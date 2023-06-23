import { SearchContextProps } from '@graphcommerce/magento-search'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, InstantSearchSSRProvider } from 'react-instantsearch-hooks-web'
import { useAlgoliaSearchIndexConfig } from '../hooks/useAlgoliaSearchIndexConfig'
import { applicationId, searchOnlyApiKey } from '../lib/configuration'

export const component = 'SearchContext'
export const exported = '@graphcommerce/magento-search'
export const ifConfig: IfConfig = 'algoliaApplicationId'

const searchClient = algoliasearch(applicationId, searchOnlyApiKey)

function AlgoliaSearchContextPlugin(props: PluginProps<SearchContextProps>) {
  const { Prev, serverProps, isNext = true, ...rest } = props
  const searchIndex = useAlgoliaSearchIndexConfig('_products')?.searchIndex

  if (!searchIndex)
    throw Error(
      '(@graphcommerce/algolia-plugin): No search index with "_products" suffix provided. Please add the search index to the Graphcommerce config',
    )

  return (
    <InstantSearchSSRProvider {...(typeof serverProps === 'object' ? serverProps : {})}>
      <InstantSearch searchClient={searchClient} indexName={searchIndex}>
        {isNext && <Prev {...rest} />}
      </InstantSearch>
    </InstantSearchSSRProvider>
  )
}

export const Plugin = AlgoliaSearchContextPlugin
