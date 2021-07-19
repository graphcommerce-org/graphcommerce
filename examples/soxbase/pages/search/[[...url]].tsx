import { mergeDeep } from '@apollo/client/utilities'
import { Container } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { CategoryDescription, ProductListParamsProvider } from '@reachdigital/magento-category'
import {
  ProductListCount,
  ProductListFilters,
  ProductListFiltersContainer,
  ProductListPagination,
  ProductListSort,
} from '@reachdigital/magento-product'
import { ProductListDocument } from '@reachdigital/magento-product/ProductList/ProductList.gql'
import {
  FilterTypes,
  ProductListParams,
} from '@reachdigital/magento-product/ProductListItems/filterTypes'
import {
  extractUrlQuery,
  parseParams,
} from '@reachdigital/magento-product/ProductListItems/filteredProductList'
import { getFilterTypes } from '@reachdigital/magento-product/ProductListItems/getFilterTypes'
import {
  CategorySearchResult,
  NoSearchResults,
  SearchDivider,
  SearchDocument,
  SearchForm,
  SearchQuery,
} from '@reachdigital/magento-search'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import { GetStaticProps } from '@reachdigital/next-ui'
import { GetStaticPaths } from 'next'
import React from 'react'
import FullPageShell, { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import { DefaultPageDocument, DefaultPageQuery } from '../../components/GraphQL/DefaultPage.gql'
import ProductListItems from '../../components/ProductListItems/ProductListItems'
import useProductListStyles from '../../components/ProductListItems/useProductListStyles'
import apolloClient from '../../lib/apolloClient'

export const config = { unstable_JsPreload: false }

type Props = DefaultPageQuery &
  SearchQuery & { filterTypes: FilterTypes; params: ProductListParams }
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props, RouteProps>

function SearchResultPage(props: Props) {
  const { products, categories, params, filters, filterTypes } = props
  const productListClasses = useProductListStyles({ count: products?.items?.length ?? 0 })
  const search = params.url.split('/')[1]
  const totalSearchResults = (categories?.items?.length ?? 0) + (products?.total_count ?? 0)
  const noSearchResults = search && (!products || (products.items && products?.items?.length <= 0))

  return (
    <>
      <PageMeta
        title={search ? `Results for '${search}'` : 'Search'}
        metaRobots={['noindex']}
        canonical='/search'
      />

      <Container maxWidth='sm'>
        <SearchForm totalResults={totalSearchResults} search={search} />
        {categories?.items?.map((category) => (
          <CategorySearchResult key={category?.url_path} search={search} {...category} />
        ))}

        {noSearchResults && <NoSearchResults search={search} />}
      </Container>

      <SearchDivider />

      {products && products.items && products?.items?.length > 0 && (
        <ProductListParamsProvider value={params}>
          <Container maxWidth='xl'>
            <CategoryDescription
              name={typeof search !== 'undefined' ? `Results for '${search}'` : 'All products'}
            />

            <ProductListFiltersContainer>
              <ProductListSort sort_fields={products?.sort_fields} />
              <ProductListFilters aggregations={filters?.aggregations} filterTypes={filterTypes} />
            </ProductListFiltersContainer>

            <ProductListCount total_count={products?.total_count} />

            <ProductListItems
              items={products?.items}
              className={productListClasses.productList}
              loadingEager={1}
            />

            <ProductListPagination page_info={products?.page_info} />
          </Container>
        </ProductListParamsProvider>
      )}
    </>
  )
}

SearchResultPage.pageOptions = {
  SharedComponent: FullPageShell,
  sharedKey: () => 'page',
} as PageOptions

export default SearchResultPage

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  // Disable getStaticPaths while in development mode
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  return {
    paths: [{ params: { url: [] } }],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const [search = '', query = []] = extractUrlQuery(params)

  const client = apolloClient(locale, true)
  const conf = client.query({ query: StoreConfigDocument })
  const filterTypes = getFilterTypes(client)

  const rootCategory = (await conf).data.storeConfig?.root_category_uid ?? ''
  const staticClient = apolloClient(locale)
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
      ? client.query({
          query: SearchDocument,
          variables: mergeDeep(productListParams, {
            categoryUid: rootCategory,
            search,
          }),
        })
      : client.query({
          query: ProductListDocument,
          variables: mergeDeep(productListParams, {
            categoryUid: rootCategory,
          }),
        })

  return {
    props: {
      ...(await page).data,
      ...(await products).data,
      filterTypes: await filterTypes,
      params: productListParams,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 1,
  }
}
