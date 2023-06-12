import { PageOptions } from '@graphcommerce/framer-next-pages'
import { Asset, hygraphPageContent, HygraphPagesQuery } from '@graphcommerce/graphcms-ui'
import { flushMeasurePerf } from '@graphcommerce/graphql'
import {
  CategoryChildren,
  CategoryDescription,
  CategoryHeroNav,
  CategoryHeroNavTitle,
  CategoryMeta,
  getCategoryStaticPaths,
} from '@graphcommerce/magento-category'
import {
  extractUrlQuery,
  FilterLayout,
  FilterTypes,
  getFilterTypes,
  parseParams,
  ProductFiltersDocument,
  ProductFiltersQuery,
  ProductListCount,
  ProductListDocument,
  ProductListPagination,
  ProductListParams,
  ProductListQuery,
} from '@graphcommerce/magento-product'
import { StoreConfigDocument, redirectOrNotFound } from '@graphcommerce/magento-store'
import { LayoutTitle, LayoutHeader, GetStaticProps, MetaRobots } from '@graphcommerce/next-ui'
import { Container, useTheme } from '@mui/material'
import { GetStaticPaths } from 'next'
import {
  LayoutNavigation,
  LayoutNavigationProps,
  ProductListItems,
  RowProduct,
  RowRenderer,
} from '../components'
import { LayoutDocument } from '../components/Layout/Layout.gql'
import { CategoryPageDocument, CategoryPageQuery } from '../graphql/CategoryPage.gql'
import { graphqlSsrClient, graphqlSharedClient } from '../lib/graphql/graphqlSsrClient'

export type CategoryProps = CategoryPageQuery &
  HygraphPagesQuery &
  ProductListQuery &
  ProductFiltersQuery & { filterTypes?: FilterTypes; params?: ProductListParams }
export type CategoryRoute = { url: string[] }

type GetPageStaticPaths = GetStaticPaths<CategoryRoute>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, CategoryProps, CategoryRoute>

function CategoryPage(props: CategoryProps) {
  const { categories, products, filters, params, filterTypes, pages } = props

  const category = categories?.items?.[0]
  const isLanding = category?.display_mode === 'PAGE'
  const page = pages?.[0]
  const isCategory = params && category && products?.items && filterTypes
  const theme = useTheme()

  return (
    <>
      <CategoryMeta
        params={params}
        title={page?.metaTitle}
        metaDescription={page?.metaDescription}
        metaRobots={page?.metaRobots.toLowerCase().split('_') as MetaRobots[]}
        canonical={page?.url ? `/${page.url}` : undefined}
        {...category}
      />
      <LayoutHeader floatingMd>
        <LayoutTitle size='small' component='span'>
          {category?.name ?? page.title}
        </LayoutTitle>
      </LayoutHeader>
      {!isLanding && (
        <Container maxWidth={false}>
          <LayoutTitle
            variant='h1'
            gutterTop
            sx={{
              marginBottom: category?.description && theme.spacings.md,
            }}
            gutterBottom={
              !isCategory || (!category?.description && category?.children?.length === 0)
            }
          >
            {category?.name ?? page.title}
          </LayoutTitle>
        </Container>
      )}
      {isCategory && isLanding && (
        <CategoryHeroNav
          {...category}
          asset={pages?.[0]?.asset && <Asset asset={pages[0].asset} loading='eager' />}
          title={<CategoryHeroNavTitle>{category?.name}</CategoryHeroNavTitle>}
        />
      )}
      {isCategory && !isLanding && (
        <>
          <CategoryDescription description={category.description} />
          <CategoryChildren params={params}>{category.children}</CategoryChildren>
          <FilterLayout
            mode='sidebar'
            maxWidth='lg'
            ProductListItems={ProductListItems}
            ProductListCount={ProductListCount}
            ProductListPagination={ProductListPagination}
            products={products}
            filters={filters}
            params={params}
            filterTypes={filterTypes}
            category={category}
          />
        </>
      )}
      {page && (
        <RowRenderer
          content={page.content}
          renderer={{
            RowProduct: (rowProps) => (
              <RowProduct
                {...rowProps}
                {...products?.items?.[0]}
                items={products?.items?.slice(0, 8)}
              />
            ),
          }}
        />
      )}
    </>
  )
}

const pageOptions: PageOptions<LayoutNavigationProps> = {
  Layout: LayoutNavigation,
}
CategoryPage.pageOptions = pageOptions

export default CategoryPage

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  // Disable getStaticPaths while in development mode
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = (loc: string) => getCategoryStaticPaths(graphqlSsrClient(loc), loc)
  const paths = (await Promise.all(locales.map(path))).flat(1)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const [url, query] = extractUrlQuery(params)
  if (!url || !query) return { notFound: true }

  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const filterTypes = getFilterTypes(client)

  const staticClient = graphqlSsrClient(locale)

  const categoryPage = staticClient.query({
    query: CategoryPageDocument,
    variables: { url },
  })
  const layout = staticClient.query({ query: LayoutDocument, fetchPolicy: 'cache-first' })

  const productListParams = parseParams(url, query, await filterTypes)
  const filteredCategoryUid = productListParams && productListParams.filters.category_uid?.in?.[0]

  const category = categoryPage.then((res) => res.data.categories?.items?.[0])
  let categoryUid = filteredCategoryUid
  if (!categoryUid) {
    categoryUid = (await category)?.uid ?? ''
    if (productListParams) productListParams.filters.category_uid = { in: [categoryUid] }
  }

  const pages = hygraphPageContent(staticClient, url, category)
  const hasPage = filteredCategoryUid ? false : (await pages).data.pages.length > 0
  const hasCategory = Boolean(productListParams && categoryUid)

  if (!productListParams || !(hasPage || hasCategory))
    return redirectOrNotFound(staticClient, conf, params, locale)

  if (!hasCategory) {
    return {
      props: {
        ...(await categoryPage).data,
        ...(await pages).data,
        ...(await layout).data,
        apolloState: await conf.then(() => client.cache.extract()),
      },
      revalidate: 60 * 20,
    }
  }

  const filters = staticClient.query({
    query: ProductFiltersDocument,
    variables: { filters: { category_uid: { eq: categoryUid } } },
  })
  const products = staticClient.query({
    query: ProductListDocument,
    variables: {
      pageSize: (await conf).data.storeConfig?.grid_per_page ?? 24,
      ...productListParams,
      filters: { ...productListParams.filters, category_uid: { eq: categoryUid } },
    },
  })

  if ((await products).errors) return { notFound: true }

  const { category_name, category_url_path } =
    (await categoryPage).data.categories?.items?.[0]?.breadcrumbs?.[0] ?? {}

  const up =
    category_url_path && category_name
      ? { href: `/${category_url_path}`, title: category_name }
      : { href: `/`, title: 'Home' }

  const result = {
    props: {
      ...(await categoryPage).data,
      ...(await products).data,
      ...(await pages).data,
      ...(await filters).data,
      ...(await layout).data,
      filterTypes: await filterTypes,
      params: productListParams,
      apolloState: await conf.then(() => client.cache.extract()),
      up,
    },
    revalidate: 60 * 20,
  }
  flushMeasurePerf()
  return result
}
