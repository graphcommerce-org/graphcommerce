import { CategorySearchResult, SearchFormProps } from '@graphcommerce/magento-search'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { Index } from 'react-instantsearch-hooks-web'
import { useAlgoliaCategoryResults } from '../hooks/useAlgoliaCategoryResults'
import { useAlgoliaSearchIndexConfig } from '../hooks/useAlgoliaSearchIndexConfig'

export const component = 'SearchForm'
export const exported = '@graphcommerce/magento-search'
export const ifConfig: IfConfig = 'algoliaApplicationId'

function CategoryHits() {
  const { categories, search } = useAlgoliaCategoryResults()

  if (!search || search.length <= 0) return null

  return (
    <>
      {categories.map((category) => (
        <CategorySearchResult
          breadcrumbs={[category]}
          search={search}
          url_path={category.category_url_path}
        />
      ))}
    </>
  )
}

function AlgoliaCategorySearchPlugin(props: PluginProps<SearchFormProps>) {
  const { Prev, ...rest } = props
  const searchIndex = useAlgoliaSearchIndexConfig('_categories')?.searchIndex

  if (!searchIndex) return <Prev {...rest} />

  return (
    <>
      <Prev {...rest} />
      <Index indexName={searchIndex}>
        <CategoryHits />
      </Index>
    </>
  )
}

export const Plugin = AlgoliaCategorySearchPlugin
