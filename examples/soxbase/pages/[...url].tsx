import { Container, makeStyles, Theme } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import CategoryChildren from '@reachdigital/magento-category/CategoryChildren'
import CategoryDescription from '@reachdigital/magento-category/CategoryDescription'
import CategoryHeroNav from '@reachdigital/magento-category/CategoryHeroNav'
import { ProductListParamsProvider } from '@reachdigital/magento-category/CategoryPageContext'
import getCategoryStaticPaths from '@reachdigital/magento-category/getCategoryStaticPaths'
import useCategoryPageStyles from '@reachdigital/magento-category/useCategoryPageStyles'
import getFilteredProductList, {
  CategoryPageProps,
  extractUrlQuery,
} from '@reachdigital/magento-product-types/filteredProductList'
import ProductListCount from '@reachdigital/magento-product/ProductListCount'
import ProductListFilters from '@reachdigital/magento-product/ProductListFilters'
import ProductListFiltersContainer from '@reachdigital/magento-product/ProductListFiltersContainer'
import ProductListPagination from '@reachdigital/magento-product/ProductListPagination'
import ProductListSort from '@reachdigital/magento-product/ProductListSort'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import clsx from 'clsx'
import NextError from 'next/error'
import React from 'react'
import FullPageUi from '../components/AppShell/FullPageUi'
import Asset from '../components/Asset'
import { CategoryPageDocument, CategoryPageQuery } from '../components/GraphQL/CategoryPage.gql'
import PageContent from '../components/PageContent'
import ProductListItems from '../components/ProductListItems/ProductListItems'
import RowProductBackstory from '../components/RowProductBackstory'
import RowProductGrid from '../components/RowProductGrid'
import RowSwipeableGrid from '../components/RowSwipeableGrid'
import apolloClient from '../lib/apolloClient'

type Props = CategoryPageQuery & CategoryPageProps
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
  if (!category || !products || !params || !filters || !filterTypes)
    return <NextError statusCode={503} title='Loading skeleton' />

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
            asset={pages?.[0]?.asset && <Asset asset={pages[0].asset} width={328} />}
          />
        </Container>
      ) : (
        <ProductListParamsProvider value={params}>
          <Container className={classes.container} maxWidth='xl'>
            <CategoryDescription
              name={category.name}
              description={category.description}
              className={classes.description}
            />
            <CategoryChildren classes={{ container: classes.childCategories }} params={params}>
              {category.children}
            </CategoryChildren>

            <ProductListFiltersContainer>
              <ProductListSort sort_fields={products.sort_fields} />
              <ProductListFilters aggregations={filters.aggregations} filterTypes={filterTypes} />
            </ProductListFiltersContainer>

            <ProductListCount total_count={products?.total_count} />
            <ProductListItems
              items={products.items}
              className={clsx(classes.items, productListClasses.productList)}
            />
            <ProductListPagination page_info={products.page_info} className={classes.pagination} />
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
    </FullPageUi>
  )
}

CategoryPage.Layout = PageLayout

export default CategoryPage

registerRouteUi('/[...url]', FullPageUi)

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  // Disable getStaticPaths while in development mode
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = (loc: string) => getCategoryStaticPaths(apolloClient(localeToStore(loc)), loc)
  const paths = (await Promise.all(locales.map(path))).flat(1)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const [url, query] = extractUrlQuery(params)
  if (!url || !query) return { notFound: true }

  const client = apolloClient(localeToStore(locale))
  const config = client.query({ query: StoreConfigDocument })

  const staticClient = apolloClient(localeToStore(locale))

  const categoryPage = staticClient.query({ query: CategoryPageDocument, variables: { url } })
  const rootCategory = categoryPage.then((res) => res.data.categories?.items?.[0]?.uid ?? '')
  const productList = await getFilteredProductList({ url, query, rootCategory, staticClient })

  if (!(await rootCategory) || !productList) return { notFound: true }

  return {
    props: {
      ...(await categoryPage).data,
      ...productList,
      apolloState: await config.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
