import { mergeDeep } from '@apollo/client/utilities'
import { Container } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import CategoryHeroNav from '@reachdigital/magento-category/CategoryHeroNav'
import { ProductListParamsProvider } from '@reachdigital/magento-category/CategoryPageContext'
import CategoryPageGrid from '@reachdigital/magento-category/CategoryPageGrid'
import getCategoryStaticPaths from '@reachdigital/magento-category/getCategoryStaticPaths'
import useCategoryPageStyles from '@reachdigital/magento-category/useCategoryPageStyles'
import {
  ProductListDocument,
  ProductListQuery,
} from '@reachdigital/magento-product-types/ProductList.gql'
import {
  FilterTypes,
  ProductListParams,
} from '@reachdigital/magento-product/ProductListItems/filterTypes'
import {
  extractUrlQuery,
  parseParams,
} from '@reachdigital/magento-product/ProductListItems/filteredProductList'
import getFilterTypes from '@reachdigital/magento-product/ProductListItems/getFilterTypes'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import { GetStaticPaths } from 'next'
import React from 'react'
import FullPageUi from '../components/AppShell/FullPageUi'
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
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

function CategoryPage(props: Props) {
  const { categories, products, filters, params, filterTypes, pages } = props
  const classes = useCategoryPageStyles(props)

  const productListClasses = useProductListStyles({ count: products?.items?.length ?? 0 })

  const category = categories?.items?.[0]
  if (!category || !products || !params || !filters || !filterTypes) return null

  const parentCategory = category.breadcrumbs?.[0]
  const isLanding = category.display_mode === 'PAGE'

  let productList = products?.items
  if (isLanding && productList) productList = products?.items?.slice(0, 8)

  return (
    <FullPageUi
      title={category.name ?? ''}
      backFallbackTitle={parentCategory?.category_name ?? 'Home'}
      backFallbackHref={parentCategory?.category_url_path ?? '/'}
      {...props}
    >
      <PageMeta
        title={category.meta_title ?? category.name ?? ''}
        metaDescription={category.meta_description ?? ''}
      />

      {isLanding ? (
        <Container className={classes.container} maxWidth={false}>
          <CategoryHeroNav
            {...category}
            asset={
              pages?.[0]?.asset && <Asset asset={pages[0].asset} width={328} loading='eager' />
            }
          />
        </Container>
      ) : (
        <ProductListParamsProvider value={params}>
          <CategoryPageGrid
            {...props}
            category={category}
            productListItems={
              <ProductListItems
                items={products?.items}
                className={productListClasses.productList}
                loadingEager={1}
              />
            }
          />
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
    </FullPageUi>
  )
}

CategoryPage.Layout = PageLayout

export default CategoryPage

registerRouteUi('/[...url]', FullPageUi)

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

  const products = client.query({
    query: ProductListDocument,
    variables: mergeDeep(productListParams, {
      filters: { category_uid: { eq: await categoryUid } },
      categoryUid: await categoryUid,
    }),
  })

  // assertAllowedParams(await params, (await products).data)
  if (!(await categoryUid) || !(await products).data) return { notFound: true }

  return {
    props: {
      ...(await categoryPage).data,
      ...(await products).data,
      filterTypes: await filterTypes,
      params: productListParams,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
