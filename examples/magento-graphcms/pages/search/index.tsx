import { PageOptions } from '@graphcommerce/framer-next-pages'
import { flushMeasurePerf } from '@graphcommerce/graphql'
import {
  ProductListDocument,
  extractUrlQuery,
  parseParams,
  FilterTypes,
  ProductListParams,
  getFilterTypes,
  ProductFiltersDocument,
  ProductListQuery,
  ProductFiltersQuery,
} from '@graphcommerce/magento-product'
import {
  CategorySearchDocument,
  CategorySearchQuery,
  CategorySearchResult,
  CategorySearchResults,
  NoSearchResults,
  SearchContext,
  SearchDivider,
  SearchForm,
} from '@graphcommerce/magento-search'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, LayoutTitle, LayoutHeader, FormRow } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import {
  LayoutDocument,
  LayoutNavigation,
  LayoutNavigationProps,
  SearchFilterLayout,
} from '../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

type SearchResultProps = ProductListQuery &
  ProductFiltersQuery &
  CategorySearchQuery & { filterTypes: FilterTypes; params: ProductListParams }
type RouteProps = { url: string[] }
export type GetPageStaticProps = GetStaticProps<
  LayoutNavigationProps,
  SearchResultProps,
  RouteProps
>

function SearchResultPage(props: SearchResultProps) {
  const { products, categories, params, filters, filterTypes } = props
  const search = params.url.split('/')[1]
  const totalSearchResults = (categories?.items?.length ?? 0) + (products?.total_count ?? 0)
  const noSearchResults = search && (!products || (products.items && products?.items?.length <= 0))

  return (
    <>
      <PageMeta
        title={
          search
            ? i18n._(/* i18n */ 'Results for ‘{search}’', { search })
            : i18n._(/* i18n */ 'Search')
        }
        metaRobots={['noindex']}
        canonical='/search'
      />

      <SearchContext>
        <LayoutHeader
          floatingMd
          switchPoint={0}
          sx={{ '& .LayoutHeaderContent-center': { overflow: 'visible' } }}
        >
          <SearchForm
            totalResults={totalSearchResults}
            search={search}
            textFieldProps={{ variant: 'standard', autoComplete: 'off', size: 'small' }}
          />
        </LayoutHeader>

        <LayoutTitle
          gutterBottom={false}
          gutterTop={false}
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          {search ? (
            <Trans id='Results for &lsquo;{search}&rsquo;' values={{ search }} />
          ) : (
            <Trans id='All products' />
          )}
        </LayoutTitle>
        <Container maxWidth='sm' sx={{ display: { xs: 'none', md: 'block' } }}>
          <FormRow>
            <SearchForm
              totalResults={totalSearchResults}
              search={search}
              textFieldProps={{ autoFocus: true, fullWidth: true }}
            />
          </FormRow>

          <CategorySearchResults>
            {categories?.items?.map((category) => (
              <CategorySearchResult key={category?.url_path} search={search} {...category} />
            ))}
          </CategorySearchResults>
        </Container>

        <SearchDivider sx={{ display: { xs: 'none', md: 'block' } }} />

        {noSearchResults && (
          <Container>
            <NoSearchResults search={search} />
          </Container>
        )}
        {products && products.items && products?.items?.length > 0 && (
          <SearchFilterLayout
            params={params}
            filters={filters}
            products={products}
            filterTypes={filterTypes}
            id={search}
            title={`Search ${search}`}
          />
        )}
      </SearchContext>
    </>
  )
}

const pageOptions: PageOptions<LayoutNavigationProps> = {
  Layout: LayoutNavigation,
}

SearchResultPage.pageOptions = pageOptions

export default SearchResultPage

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const [searchShort = '', query = []] = extractUrlQuery(params)
  const search = searchShort.length >= 3 ? searchShort : ''

  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const filterTypes = getFilterTypes(client)

  const staticClient = graphqlSsrClient(locale)
  const layout = staticClient.query({ query: LayoutDocument, fetchPolicy: 'cache-first' })

  const productListParams = parseParams(
    search ? `search/${search}` : 'search',
    query,
    await filterTypes,
    search,
  )

  if (!productListParams) return { notFound: true, revalidate: 60 * 20 }

  const filters = staticClient.query({ query: ProductFiltersDocument, variables: { search } })

  const products = staticClient.query({
    query: ProductListDocument,
    variables: { ...productListParams, search, pageSize: 12 },
  })

  const categories = search
    ? staticClient.query({ query: CategorySearchDocument, variables: { search } })
    : undefined

  const result = {
    props: {
      ...(await products).data,
      ...(await filters).data,
      ...(await categories)?.data,
      ...(await layout)?.data,
      filterTypes: await filterTypes,
      params: productListParams,
      up: { href: '/', title: 'Home' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
  flushMeasurePerf()
  return result
}
