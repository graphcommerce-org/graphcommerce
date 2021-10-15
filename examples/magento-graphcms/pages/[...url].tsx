import { mergeDeep } from '@apollo/client/utilities'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  CategoryChildren,
  CategoryHeroNav,
  CategoryHeroNavTitle,
  CategoryMeta,
  getCategoryStaticPaths,
} from '@graphcommerce/magento-category'
import {
  extractUrlQuery,
  FilterTypes,
  getFilterTypes,
  parseParams,
  ProductListCount,
  ProductListDocument,
  ProductListFilters,
  ProductListFiltersContainer,
  ProductListPagination,
  ProductListParams,
  ProductListParamsProvider,
  ProductListQuery,
  ProductListSort,
} from '@graphcommerce/magento-product'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { AppShellSticky, AppShellTitle, GetStaticProps, Title } from '@graphcommerce/next-ui'
import { Container } from '@material-ui/core'
import { GetStaticPaths } from 'next'
import React from 'react'
import FullPageShell, { FullPageShellProps } from '../components/AppShell/FullPageShell'
import FullPageShellHeader from '../components/AppShell/FullPageShellHeader'
import Asset from '../components/Asset'
import { CategoryPageDocument, CategoryPageQuery } from '../components/GraphQL/CategoryPage.gql'
import PageContent from '../components/PageContent'
import ProductListItems from '../components/ProductListItems/ProductListItems'
import useProductListStyles from '../components/ProductListItems/useProductListStyles'
import RowProduct from '../components/Row/RowProduct'
import Backstory from '../components/Row/RowProduct/variant/Backstory'
import Feature from '../components/Row/RowProduct/variant/Feature'
import FeatureBoxed from '../components/Row/RowProduct/variant/FeatureBoxed'
import Grid from '../components/Row/RowProduct/variant/Grid'
import Related from '../components/Row/RowProduct/variant/Related'
import Reviews from '../components/Row/RowProduct/variant/Reviews'
import Specs from '../components/Row/RowProduct/variant/Specs'
import Swipeable from '../components/Row/RowProduct/variant/Swipeable'
import Upsells from '../components/Row/RowProduct/variant/Upsells'
import apolloClient from '../lib/apolloClient'

export const config = { unstable_JsPreload: false }

type Props = CategoryPageQuery &
  ProductListQuery & {
    filterTypes: FilterTypes
    params: ProductListParams
  } & Pick<FullPageShellProps, 'backFallbackHref' | 'backFallbackTitle'>
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props, RouteProps>

function CategoryPage(props: Props) {
  const {
    categories,
    products,

    filters,
    params,
    filterTypes,
    pages,
    backFallbackHref,
    backFallbackTitle,
  } = props
  const productListClasses = useProductListStyles({ count: products?.items?.length ?? 0 })

  const category = categories?.items?.[0]
  if (!category || !products || !params || !filters || !filterTypes) return null

  const isLanding = category.display_mode === 'PAGE'

  let productList = products?.items
  if (isLanding && productList) productList = products?.items?.slice(0, 8)

  const product = products?.items?.[0]
  const aggregations = typeProducts?.aggregations

  return (
    <>
      <CategoryMeta params={params} {...category} />
      <FullPageShellHeader
        backFallbackHref={backFallbackHref}
        backFallbackTitle={backFallbackTitle}
      >
        <Title size='small'>{category?.name}</Title>
      </FullPageShellHeader>

      {isLanding ? (
        <CategoryHeroNav
          {...category}
          asset={pages?.[0]?.asset && <Asset asset={pages[0].asset} loading='eager' />}
          title={<CategoryHeroNavTitle>{category?.name}</CategoryHeroNavTitle>}
        />
      ) : (
        <ProductListParamsProvider value={params}>
          <Container maxWidth='xl'>
            <AppShellTitle>{category?.name}</AppShellTitle>

            <CategoryChildren params={params}>{category.children}</CategoryChildren>

            <AppShellSticky headerFill='mobile-only'>
              <ProductListFiltersContainer>
                <ProductListSort
                  sort_fields={products?.sort_fields}
                  total_count={products?.total_count}
                />
                <ProductListFilters
                  aggregations={filters?.aggregations}
                  filterTypes={filterTypes}
                />
              </ProductListFiltersContainer>
            </AppShellSticky>

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

      {/* todo: only allow rendering Grid, Swipeable and Backstory here */}
      {pages?.[0] && (
        <PageContent
          renderer={{
            RowProduct: (rowProps) => (
              <RowProduct
                {...rowProps}
                renderer={{
                  Specs: (rowProductProps) => <Specs {...rowProductProps} {...product} />,
                  Backstory: (rowProductProps) => <Backstory {...rowProductProps} />,
                  Feature: (rowProductProps) => <Feature {...rowProductProps} {...product} />,
                  FeatureBoxed: (rowProductProps) => (
                    <FeatureBoxed {...rowProductProps} {...product} />
                  ),
                  Grid: (rowProductProps) => <Grid {...rowProductProps} {...product} />,
                  Related: (rowProductProps) => <Related {...rowProductProps} {...product} />,
                  Reviews: (rowProductProps) => <Reviews {...rowProductProps} {...product} />,
                  Upsells: (rowProductProps) => <Upsells {...rowProductProps} {...product} />,
                  Swipeable: (rowProductProps) => <Swipeable {...rowProductProps} {...product} />,
                }}
              />
            ),
          }}
          content={pages?.[0].content}
        />
      )}
    </>
  )
}

CategoryPage.pageOptions = {
  SharedComponent: FullPageShell,
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
