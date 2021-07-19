import { mergeDeep } from '@apollo/client/utilities'
import { Container } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import {
  CategoryChildren,
  CategoryDescription,
  CategoryHeroNav,
  CategoryMeta,
  getCategoryStaticPaths,
  ProductListParamsProvider,
} from '@reachdigital/magento-category'

import {
  ProductListCount,
  ProductListFilters,
  ProductListFiltersContainer,
  ProductListPagination,
  ProductListSort,
  ProductListDocument,
  ProductListQuery,
  FilterTypes,
  ProductListParams,
  extractUrlQuery,
  parseParams,
  getFilterTypes,
} from '@reachdigital/magento-product'

import { StoreConfigDocument } from '@reachdigital/magento-store'
import { GetStaticProps } from '@reachdigital/next-ui'
import { GetStaticPaths } from 'next'
import React from 'react'
import FullPageShell, { FullPageShellProps } from '../components/AppShell/FullPageShell'
import Asset from '../components/Asset'
import { CategoryPageDocument, CategoryPageQuery } from '../components/GraphQL/CategoryPage.gql'
import PageContent from '../components/PageContent'
import ProductListItems from '../components/ProductListItems/ProductListItems'
import useProductListStyles from '../components/ProductListItems/useProductListStyles'
import RowProductBackstory from '../components/RowProductBackstory'
import RowProductGrid from '../components/RowProductGrid'
import RowSwipeableGrid from '../components/RowSwipeableGrid'
import apolloClient from '../lib/apolloClient'

export const config = { unstable_JsPreload: false }

type Props = CategoryPageQuery &
  ProductListQuery & {
    filterTypes: FilterTypes
    params: ProductListParams
  }
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props, RouteProps>

function CategoryPage(props: Props) {
  const { categories, products, filters, params, filterTypes, pages } = props
  const productListClasses = useProductListStyles({ count: products?.items?.length ?? 0 })

  const category = categories?.items?.[0]
  if (!category || !products || !params || !filters || !filterTypes) return null

  const isLanding = category.display_mode === 'PAGE'

  let productList = products?.items
  if (isLanding && productList) productList = products?.items?.slice(0, 8)

  return (
    <>
      <CategoryMeta params={params} {...category} />

      {isLanding ? (
        <Container maxWidth={false}>
          <CategoryHeroNav
            {...category}
            asset={pages?.[0]?.asset && <Asset asset={pages[0].asset} loading='eager' />}
          />
        </Container>
      ) : (
        <ProductListParamsProvider value={params}>
          <Container maxWidth='xl'>
            <CategoryDescription name={category?.name} description={category?.description} />

            <CategoryChildren params={params}>{category.children}</CategoryChildren>

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

      {pages?.[0] && (
        <PageContent
          renderer={{
            RowProductBackstory: (p) => <RowProductBackstory {...p} items={productList} />,
            RowProductGrid: (p) => <RowProductGrid {...p} items={productList} />,
            RowSwipeableGrid: (p) => <RowSwipeableGrid {...p} items={productList} />,
          }}
          content={pages?.[0]?.content}
        />
      )}
    </>
  )
}

CategoryPage.pageOptions = {
  SharedComponent: FullPageShell,
  sharedKey: () => 'page',
} as PageOptions

export default CategoryPage

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  // Disable getStaticPaths while in development mode
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = (loc: string) => getCategoryStaticPaths(apolloClient(loc), loc)
  const paths = (await Promise.all(locales.map(path))).flat(1)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const [url, query] = extractUrlQuery(params)
  if (!url || !query) return { notFound: true }

  const client = apolloClient(locale, true)
  const conf = client.query({ query: StoreConfigDocument })
  const filterTypes = getFilterTypes(client)

  const staticClient = apolloClient(locale)
  const categoryPage = staticClient.query({
    query: CategoryPageDocument,
    variables: { url, rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '' },
  })
  const categoryUid = categoryPage.then((res) => res.data.categories?.items?.[0]?.uid ?? '')

  const productListParams = parseParams(url, query, await filterTypes)
  if (!productListParams || !(await categoryUid)) return { notFound: true }

  const products = staticClient.query({
    query: ProductListDocument,
    variables: mergeDeep(productListParams, {
      filters: { category_uid: { eq: await categoryUid } },
      categoryUid: await categoryUid,
    }),
  })

  // assertAllowedParams(await params, (await products).data)
  if (!(await categoryUid) || !(await products).data) return { notFound: true }

  const { category_name, category_url_path } =
    (await categoryPage).data.categories?.items?.[0]?.breadcrumbs?.[0] ?? {}

  const backFallbackHref = category_url_path ? `/${category_url_path}` : null
  const backFallbackTitle = category_name || null

  return {
    props: {
      ...(await categoryPage).data,
      ...(await products).data,
      filterTypes: await filterTypes,
      params: productListParams,
      apolloState: await conf.then(() => client.cache.extract()),
      backFallbackHref,
      backFallbackTitle,
    },
    revalidate: 60 * 20,
  }
}
