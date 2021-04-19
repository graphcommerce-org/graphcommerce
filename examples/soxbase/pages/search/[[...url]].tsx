import { mergeDeep } from '@apollo/client/utilities'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import CategoryPageGrid from '@reachdigital/magento-category/CategoryPageGrid'
import {
  FilterTypes,
  ProductListParams,
} from '@reachdigital/magento-product/ProductListItems/filterTypes'
import {
  extractUrlQuery,
  parseParams,
} from '@reachdigital/magento-product/ProductListItems/filteredProductList'
import getFilterTypes from '@reachdigital/magento-product/ProductListItems/getFilterTypes'
import NoSearchResults from '@reachdigital/magento-search/NoSearchResults'
import { SearchDocument, SearchQuery } from '@reachdigital/magento-search/Search.gql'
import SearchPageHeader from '@reachdigital/magento-search/SearchPageHeader'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import { GetStaticPaths } from 'next'
import React from 'react'
import FullPageUi from '../../components/AppShell/FullPageUi'
import { DefaultPageDocument, DefaultPageQuery } from '../../components/GraphQL/DefaultPage.gql'
import ProductListItems from '../../components/ProductListItems/ProductListItems'
import useProductListStyles from '../../components/ProductListItems/useProductListStyles'
import apolloClient from '../../lib/apolloClient'

export const config = { unstable_JsPreload: false }

type Props = DefaultPageQuery &
  SearchQuery & { filterTypes: FilterTypes; params: ProductListParams }
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

function SearchIndexPage(props: Props) {
  const { products, categories, params } = props
  const productListClasses = useProductListStyles({ count: products?.items?.length ?? 0 })
  const search = params.url.split('/')[1]
  const totalSearchResults = (categories?.items?.length ?? 0) + (products?.total_count ?? 0)

  return (
    <FullPageUi title='Search' backFallbackHref='/' backFallbackTitle='Home' {...props}>
      <PageMeta title='Search' metaDescription='Search results' metaRobots={['noindex']} />

      <SearchPageHeader
        categories={categories}
        totalSearchResults={totalSearchResults}
        search={search}
      />

      {products && products.items && products?.items?.length > 0 && (
        <CategoryPageGrid
          {...props}
          title={`Search results for ${search}`}
          productListItems={
            <ProductListItems
              items={products?.items}
              className={productListClasses.productList}
              loadingEager={1}
            />
          }
        />
      )}

      {search && (!products || (products.items && products?.items?.length <= 0)) && (
        <NoSearchResults />
      )}
    </FullPageUi>
  )
}

SearchIndexPage.Layout = PageLayout

registerRouteUi('/search/[[...url]]', FullPageUi)

export default SearchIndexPage

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

  const productListParams = parseParams(`search/${search}`, query, await filterTypes)

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
      : { data: undefined }

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
