import { CategorySearchResult, SearchFormProps } from '@graphcommerce/magento-search'
import { PluginProps } from '@graphcommerce/next-config'
import { Index } from 'react-instantsearch-hooks'
import { useAlgoliaCategoryResults } from '../hooks/useAlgoliaCategoryResults'
import { useAlgoliaSearchIndex } from '../hooks/useAlgoliaSearchIndex'

export const component = 'SearchForm'
export const exported = '@graphcommerce/magento-search'

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
  const searchIndex = useAlgoliaSearchIndex('_categories')

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
