import { mergeDeep } from '@apollo/client/utilities'
import { Container, makeStyles, Theme } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import CategoryChildren from '@reachdigital/magento-category/CategoryChildren'
import CategoryDescription from '@reachdigital/magento-category/CategoryDescription'
import CategoryHeroNav from '@reachdigital/magento-category/CategoryHeroNav'
import { ProductListParamsProvider } from '@reachdigital/magento-category/CategoryPageContext'
import getCategoryStaticPaths from '@reachdigital/magento-category/getCategoryStaticPaths'
import useCategoryPageStyles from '@reachdigital/magento-category/useCategoryPageStyles'
import {
  ProductListDocument,
  ProductListQuery,
} from '@reachdigital/magento-product-types/ProductList.gql'
import ProductListCount from '@reachdigital/magento-product/ProductListCount'
import ProductListFilters from '@reachdigital/magento-product/ProductListFilters'
import ProductListFiltersContainer from '@reachdigital/magento-product/ProductListFiltersContainer'
import {
  FilterTypes,
  ProductListParams,
} from '@reachdigital/magento-product/ProductListItems/filterTypes'
import {
  extractUrlQuery,
  parseParams,
} from '@reachdigital/magento-product/ProductListItems/filteredProductList'
import getFilterTypes from '@reachdigital/magento-product/ProductListItems/getFilterTypes'
import ProductListPagination from '@reachdigital/magento-product/ProductListPagination'
import ProductListSort from '@reachdigital/magento-product/ProductListSort'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import clsx from 'clsx'
import { GetStaticPaths } from 'next'
import React, { PropsWithChildren } from 'react'
import FullPageUi from '../components/AppShell/FullPageUi'
import Asset from '../components/Asset'
import { CategoryPageDocument, CategoryPageQuery } from '../components/GraphQL/CategoryPage.gql'
import PageContent from '../components/PageContent'
import ProductListItems from '../components/ProductListItems/ProductListItems'
import RowProductBackstory from '../components/RowProductBackstory'
import RowProductGrid from '../components/RowProductGrid'
import RowSwipeableGrid from '../components/RowSwipeableGrid'
import apolloClient from '../lib/apolloClient'


type Props = CategoryPageQuery &
  ProductListQuery & {
    filterTypes: FilterTypes
    params: ProductListParams
  }
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

const useProductListStyles = makeStyles(
  (theme: Theme) => ({
    productList: (props: Props) => {
      let big = 3
      let index = 0
      let toggle = false
      let selector = ''
      const count = props.products?.items?.length ?? 0
      for (index = 0; index <= count; index++) {
        if (index === big) {
          selector += `& >:nth-child(${big}),`
          if (toggle === false) {
            big = index + 7
            toggle = !toggle
          } else {
            big = index + 11
            toggle = !toggle
          }
        }
      }
      selector = selector.slice(0, -1)
      return {
        [theme.breakpoints.up('xl')]: {
          [`${selector}`]: {
            gridColumn: 'span 2',
            gridRow: 'span 2;',
            '& > a > div': {
              paddingTop: `calc(100% + ${theme.spacings.lg} - 2px)`,
            },
          },
        },
      }
    },
  }),
  { name: 'ProductList' },
)

function CategoryPage(props: Props) {
  const productListClasses = useProductListStyles(props)
  const classes = useCategoryPageStyles(props)
  const { categories, products, filters, params, filterTypes, pages } = props

  const category = categories?.items?.[0]
  if (!category || !products || !params || !filters || !filterTypes) return null

  const parentCategory = category.breadcrumbs?.[0]
  const isLanding = category.display_mode === 'PAGE'

  let productList = products?.items
  if (isLanding && productList) productList = products?.items?.slice(0, 8)

  return (
    <>
      <PageMeta
        title={category.meta_title ?? category.name ?? ''}
        metaDescription={category.meta_description ?? ''}
      />
      {isLanding ? (
        <Container className={classes.container} maxWidth={false}>
          <CategoryHeroNav
            {...category}
            asset={pages?.[0]?.asset && <Asset asset={pages[0].asset} width={328} />}
          />
        </Container>
      ) : (
        <></>
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

function CategoryLayout(props: PropsWithChildren<Props>) {
  const { children, products, filters, filterTypes, params, categories } = props
  const productListClasses = useProductListStyles(props)
  const classes = useCategoryPageStyles(props)
  const category = categories?.items?.[0]
  const parentCategory = category?.breadcrumbs?.[0]
  const isLanding = category?.display_mode === 'PAGE'

  return (
    <PageLayout {...props}>
      <FullPageUi
        title={category?.name ?? ''}
        backFallbackTitle={parentCategory?.category_name ?? 'Home'}
        backFallbackHref={`/${parentCategory?.category_url_path}` ?? '/'}
        {...props}
      >
        {!isLanding && (
          <ProductListParamsProvider value={params}>
            <Container className={classes.container} maxWidth='xl'>
              <CategoryDescription {...category} className={classes.description} />
              <CategoryChildren
                classes={{ container: classes.childCategories }}
                params={params}
                {...category}
              />
              <ProductListFiltersContainer>
                <ProductListSort {...products} />
                <ProductListFilters {...filters} filterTypes={filterTypes} />
              </ProductListFiltersContainer>
              <ProductListCount {...products} />
              <ProductListItems
                {...products}
                className={clsx(classes.items, productListClasses.productList)}
              />
              <ProductListPagination {...products} className={classes.pagination} />
            </Container>
          </ProductListParamsProvider>
        )}
        {children}
      </FullPageUi>
    </PageLayout>
  )
}

CategoryPage.Layout = CategoryLayout

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
  const staticClient = apolloClient(locale)

  const conf = client.query({ query: StoreConfigDocument })
  const filterTypes = getFilterTypes(client)

  const categoryPage = staticClient.query({ query: CategoryPageDocument, variables: { url } })
  const rootCategory = categoryPage.then((res) => res.data.categories?.items?.[0]?.uid ?? '')

  const productListParams = parseParams(url, query, await filterTypes)

  if (!productListParams || !(await rootCategory)) return { notFound: true }

  // console.log((await categoryPage).data.menu)
  const products = client.query({
    query: ProductListDocument,
    variables: mergeDeep(productListParams, {
      filters: { category_uid: { eq: await rootCategory } },
      rootCategory: await rootCategory,
    }),
  })

  // assertAllowedParams(await params, (await products).data)
  if (!(await rootCategory) || !(await products).data) return { notFound: true }

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
