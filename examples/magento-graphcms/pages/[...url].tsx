import { PageOptions } from '@graphcommerce/framer-next-pages'
import { Asset, hygraphPageContent, HygraphPagesQuery } from '@graphcommerce/graphcms-ui'
import { flushMeasurePerf } from '@graphcommerce/graphql'
import {
  appendSiblingsAsChildren,
  CategoryChildren,
  CategoryDescription,
  CategoryHeroNav,
  CategoryHeroNavTitle,
  CategoryMeta,
  findParentBreadcrumbItem,
  getCategoryStaticPaths,
} from '@graphcommerce/magento-category'
import {
  extractUrlQuery,
  FilterTypes,
  getFilterTypes,
  parseParams,
  ProductFiltersDocument,
  ProductFiltersQuery,
  productListApplyCategoryDefaults,
  ProductListDocument,
  ProductListParams,
  ProductListQuery,
} from '@graphcommerce/magento-product'
import { redirectOrNotFound, StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, LayoutHeader, LayoutTitle, MetaRobots } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Container } from '@mui/material'
import { GetStaticPaths } from 'next'
import {
  CategoryFilterLayout,
  LayoutDocument,
  LayoutNavigation,
  LayoutNavigationProps,
  RowProduct,
  RowRenderer,
} from '../components'
import { CategoryPageDocument, CategoryPageQuery } from '../graphql/CategoryPage.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'

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
            sx={(theme) => ({
              marginBottom: category?.description && theme.spacings.md,
            })}
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
          <CategoryFilterLayout
            categories={categories}
            params={params}
            filters={filters}
            products={products}
            filterTypes={filterTypes}
            title={category.name ?? ''}
            id={category.uid}
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
  const waitForSiblings = appendSiblingsAsChildren(category, staticClient)
  let categoryUid = filteredCategoryUid
  if (!categoryUid) {
    categoryUid = (await category)?.uid ?? ''
    if (productListParams) productListParams.filters.category_uid = { in: [categoryUid] }
  }

  const pages = hygraphPageContent(staticClient, url, category)
  const hasCategory = Boolean(productListParams && categoryUid)

  const filters = hasCategory
    ? staticClient.query({
        query: ProductFiltersDocument,
        variables: { filters: { category_uid: { eq: categoryUid } } },
      })
    : undefined
  const products = hasCategory
    ? staticClient.query({
        query: ProductListDocument,
        variables: await productListApplyCategoryDefaults(
          productListParams,
          (await conf).data,
          category,
        ),
      })
    : undefined

  const hasPage = filteredCategoryUid ? false : (await pages).data.pages.length > 0
  if (!hasCategory && !hasPage) return redirectOrNotFound(staticClient, conf, params, locale)

  if ((await products)?.errors) return { notFound: true }

  const { category_url_path, category_name } = findParentBreadcrumbItem(await category) ?? {}

  const up =
    category_url_path && category_name
      ? { href: `/${category_url_path}`, title: category_name }
      : { href: `/`, title: i18n._(/* i18n */ 'Home') }

  await waitForSiblings
  const result = {
    props: {
      ...(await categoryPage).data,
      ...(await products)?.data,
      ...(await pages).data,
      ...(await filters)?.data,
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
