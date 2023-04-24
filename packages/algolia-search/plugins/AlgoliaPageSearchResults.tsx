import { CategorySearchResult, SearchFormProps } from '@graphcommerce/magento-search'
import { PluginProps } from '@graphcommerce/next-config'
import { Index } from 'react-instantsearch-hooks'
import { useAlgoliaPageResults } from '../hooks/useAlgoliaPageResults'
import { useAlgoliaSearchIndex } from '../hooks/useAlgoliaSearchIndex'

export const component = 'SearchForm'
export const exported = '@graphcommerce/magento-search'

function PageHits() {
  const { pages, search } = useAlgoliaPageResults()

  if (!search || search.length <= 0) return null

  return (
    <>
      {pages.map((page) => (
        <CategorySearchResult
          breadcrumbs={[
            {
              category_uid: page.objectID,
              category_level: page.url.split('/').length,
              category_name: page.name,
              category_url_path: page.url,
            },
          ]}
          search={search}
          url_path={page.url}
        />
      ))}
    </>
  )
}

function AlgoliaPageSearchPlugin(props: PluginProps<SearchFormProps>) {
  const { Prev, ...rest } = props
  const searchIndex = useAlgoliaSearchIndex('_pages')

  if (!searchIndex) return <Prev {...rest} />

  return (
    <>
      <Prev {...rest} />
      <Index indexName={searchIndex}>
        <PageHits />
      </Index>
    </>
  )
}

export const Plugin = AlgoliaPageSearchPlugin
