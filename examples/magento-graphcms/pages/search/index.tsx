import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  ProductListCount,
  ProductListFilters,
  ProductListFiltersContainer,
  ProductListPagination,
  ProductListParamsProvider,
  ProductListSort,
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
  NoSearchResults,
  SearchDivider,
  SearchForm,
} from '@graphcommerce/magento-search'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  StickyBelowHeader,
  GetStaticProps,
  LayoutTitle,
  LayoutHeader,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container, Hidden } from '@mui/material'
import { LayoutNavigation, LayoutNavigationProps, ProductListItems } from '../../components'
import { LayoutDocument } from '../../components/Layout/Layout.gql'
import { DefaultPageDocument, DefaultPageQuery } from '../../graphql/DefaultPage.gql'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type SearchResultProps = DefaultPageQuery &
  ProductListQuery &
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
      <LayoutHeader floatingMd switchPoint={0}>
        <LayoutTitle size='small'>
          <SearchForm
            totalResults={totalSearchResults}
            search={search}
            textFieldProps={{ variant: 'standard' }}
          />
        </LayoutTitle>
      </LayoutHeader>

      <Hidden implementation='css' mdDown>
        <LayoutTitle gutterBottom={false} gutterTop={false}>
          {search ? (
            <Trans id='Results for &lsquo;{search}&rsquo;' values={{ search }} />
          ) : (
            <Trans id='All products' />
          )}
        </LayoutTitle>

        <Container maxWidth='sm'>
          <SearchForm
            totalResults={totalSearchResults}
            search={search}
            textFieldProps={{ autoFocus: true }}
          />

          {categories?.items?.map((category) => (
            <CategorySearchResult key={category?.url_path} search={search} {...category} />
          ))}
        </Container>
        <SearchDivider />
      </Hidden>

      {noSearchResults && <NoSearchResults search={search} />}
      {products && products.items && products?.items?.length > 0 && (
        <ProductListParamsProvider value={params}>
          <StickyBelowHeader>
            <ProductListFiltersContainer>
              <ProductListSort sort_fields={products?.sort_fields} />
              <ProductListFilters aggregations={filters?.aggregations} filterTypes={filterTypes} />
            </ProductListFiltersContainer>
          </StickyBelowHeader>
          <Container maxWidth={false}>
            <ProductListCount total_count={products?.total_count} />
            <ProductListItems title={`Search ${search}`} items={products?.items} loadingEager={1} />
            <ProductListPagination page_info={products?.page_info} />
          </Container>
        </ProductListParamsProvider>
      )}
    </>
  )
}

const pageOptions: PageOptions<LayoutNavigationProps> = {
  Layout: LayoutNavigation,
  sharedKey: () => 'search',
}

SearchResultPage.pageOptions = pageOptions

export default SearchResultPage

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const [searchShort = '', query = []] = extractUrlQuery(params)
  const search = searchShort.length >= 3 ? searchShort : undefined

  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const filterTypes = getFilterTypes(client)

  const staticClient = graphqlSsrClient(locale)
  const page = staticClient.query({ query: DefaultPageDocument, variables: { url: 'search' } })
  const layout = staticClient.query({ query: LayoutDocument })

  const productListParams = parseParams(
    search ? `search/${search}` : 'search',
    query,
    await filterTypes,
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

  return {
    props: {
      ...(await page).data,
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
}
