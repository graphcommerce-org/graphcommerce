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
} from '@graphcommerce/magento-product'
import {
  CategorySearchResult,
  NoSearchResults,
  SearchDivider,
  SearchDocument,
  SearchForm,
  SearchQuery,
} from '@graphcommerce/magento-search'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  StickyBelowHeader,
  GetStaticProps,
  LayoutTitle,
  LayoutHeader,
} from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Container, Hidden } from '@mui/material'
import { GetStaticPaths } from 'next'
import { LayoutFull, LayoutFullProps, ProductListItems } from '../../components'
import { DefaultPageDocument, DefaultPageQuery } from '../../graphql/DefaultPage.gql'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

export const config = { unstable_JsPreload: false }

type Props = DefaultPageQuery &
  SearchQuery & { filterTypes: FilterTypes; params: ProductListParams }
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutFullProps, Props, RouteProps>

function SearchResultPage(props: Props) {
  const { products, categories, params, filters, filterTypes } = props
  const search = params.url.split('/')[1]
  const totalSearchResults = (categories?.items?.length ?? 0) + (products?.total_count ?? 0)
  const noSearchResults = search && (!products || (products.items && products?.items?.length <= 0))

  return (
    <>
      <PageMeta
        title={search ? t`Results for ‘${search}’` : t`Search`}
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
          {search ? <Trans>Results for &lsquo;{search}&rsquo;</Trans> : <Trans>All products</Trans>}
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
            <ProductListItems items={products?.items} loadingEager={1} />
            <ProductListPagination page_info={products?.page_info} />
          </Container>
        </ProductListParamsProvider>
      )}
    </>
  )
}

SearchResultPage.pageOptions = {
  Layout: LayoutFull,
} as PageOptions

export default SearchResultPage

export const getStaticPaths: GetPageStaticPaths = async () => {
  // Disable getStaticPaths while in development mode
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  return Promise.resolve({
    paths: [{ params: { url: [] } }],
    fallback: 'blocking',
  })
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const [search = '', query = []] = extractUrlQuery(params)

  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const filterTypes = getFilterTypes(client)

  const rootCategory = (await conf).data.storeConfig?.root_category_uid ?? ''
  const staticClient = graphqlSsrClient(locale)
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: { url: 'search', rootCategory },
  })

  const productListParams = parseParams(
    `search${search.length > 2 ? `/${search}` : search}`,
    query,
    await filterTypes,
  )

  if (!productListParams) return { notFound: true }

  const products =
    search && search.length > 2
      ? staticClient.query({
          query: SearchDocument,
          variables: { ...productListParams, categoryUid: rootCategory, search },
        })
      : staticClient.query({
          query: ProductListDocument,
          variables: { ...productListParams, categoryUid: rootCategory },
        })

  return {
    props: {
      ...(await page).data,
      ...(await products).data,
      filterTypes: await filterTypes,
      params: productListParams,
      up: { href: '/', title: 'Home' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 1,
  }
}
