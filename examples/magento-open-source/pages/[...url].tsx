import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst, flushMeasurePerf, InContextMaskProvider } from '@graphcommerce/graphql'
import {
  appendSiblingsAsChildren,
  CategoryBreadcrumbs,
  CategoryHeroNav,
  CategoryHeroNavTitle,
  CategoryMeta,
  findParentBreadcrumbItem,
  getCategoryStaticPaths,
} from '@graphcommerce/magento-category'
import type {
  FilterTypes,
  ProductFiltersQuery,
  ProductListParams,
  ProductListQuery,
} from '@graphcommerce/magento-product'
import {
  extractUrlQuery,
  getFilterTypes,
  parseParams,
  ProductFiltersDocument,
  productListApplyCategoryDefaults,
  ProductListDocument,
  categoryDefaultsToProductListFilters,
  useProductList,
  productListLink,
} from '@graphcommerce/magento-product'
import { redirectOrNotFound, redirectTo, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { LayoutHeader, LayoutTitle, MetaRobots } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Container } from '@mui/material'
import type { GetStaticPaths } from 'next'
import type { LayoutNavigationProps } from '../components'
import {
  ProductListLayoutClassic,
  ProductListLayoutDefault,
  ProductListLayoutSidebar,
  LayoutDocument,
  LayoutNavigation,
} from '../components'
import type { CategoryPageQuery } from '../graphql/CategoryPage.gql'
import { CategoryPageDocument } from '../graphql/CategoryPage.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'

export type CategoryProps = CategoryPageQuery &
  ProductListQuery &
  ProductFiltersQuery & { filterTypes?: FilterTypes; params?: ProductListParams }
export type CategoryRoute = { url: string[] }

type GetPageStaticPaths = GetStaticPaths<CategoryRoute>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, CategoryProps, CategoryRoute>

function CategoryPage(props: CategoryProps) {
  const { categories, ...rest } = props
  const productList = useProductList({
    ...rest,
    category: categories?.items?.[0],
  })
  const { products, params, category } = productList

  const isLanding = category?.display_mode === 'PAGE'
  const isCategory = params && category && products?.items

  return (
    <InContextMaskProvider mask={productList.mask}>
      <CategoryMeta params={params} {...category} />
      <LayoutHeader floatingMd hideMd={import.meta.graphCommerce.breadcrumbs}>
        <LayoutTitle size='small' component='span'>
          {category?.name}
        </LayoutTitle>
      </LayoutHeader>
      {isCategory && isLanding && (
        <>
          {import.meta.graphCommerce.breadcrumbs && (
            <CategoryBreadcrumbs
              category={category}
              sx={(theme) => ({
                mx: theme.page.horizontal,
                height: 0,
                [theme.breakpoints.down('md')]: {
                  '& .MuiBreadcrumbs-ol': { justifyContent: 'center' },
                },
              })}
            />
          )}
          <CategoryHeroNav
            {...category}
            title={<CategoryHeroNavTitle>{category?.name}</CategoryHeroNavTitle>}
          />
        </>
      )}
      {isCategory && !isLanding && (
        <>
          {import.meta.graphCommerce.productFiltersPro &&
            import.meta.graphCommerce.productFiltersLayout === 'SIDEBAR' && (
              <ProductListLayoutSidebar
                {...productList}
                key={category.uid}
                title={category.name ?? ''}
                id={category.uid}
                category={category}
              />
            )}
          {import.meta.graphCommerce.productFiltersPro &&
            import.meta.graphCommerce.productFiltersLayout !== 'SIDEBAR' && (
              <ProductListLayoutDefault
                {...productList}
                key={category.uid}
                title={category.name ?? ''}
                id={category.uid}
                category={category}
              />
            )}
          {!import.meta.graphCommerce.productFiltersPro && (
            <ProductListLayoutClassic
              {...productList}
              key={category.uid}
              title={category.name ?? ''}
              id={category.uid}
              category={category}
            />
          )}
        </>
      )}
    </InContextMaskProvider>
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

  const path = (locale: string) => getCategoryStaticPaths(graphqlSsrClient({ locale }), locale)
  const paths = (await Promise.all(locales.map(path))).flat(1)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async (context) => {
  const { params, locale } = context
  const [url, query] = extractUrlQuery(params)
  if (!url || !query) return { notFound: true }

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const filterTypes = getFilterTypes(client)

  const staticClient = graphqlSsrClient(context)

  const categoryPage = staticClient.query({
    query: CategoryPageDocument,
    variables: { url },
  })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const productListParams = parseParams(url, query, await filterTypes)
  const filteredCategoryUid = productListParams && productListParams.filters.category_uid?.in?.[0]

  const category = categoryPage.then((res) => res.data.categories?.items?.[0])
  const waitForSiblings = appendSiblingsAsChildren(category, staticClient)
  let categoryUid = filteredCategoryUid
  if (!categoryUid) {
    categoryUid = (await category)?.uid ?? ''
    if (productListParams) productListParams.filters.category_uid = { in: [categoryUid] }
  }

  const hasCategory = !!productListParams && categoryUid

  const filters = hasCategory
    ? staticClient.query({
        query: ProductFiltersDocument,
        variables: categoryDefaultsToProductListFilters(
          await productListApplyCategoryDefaults(productListParams, (await conf).data, category),
        ),
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

  if (!hasCategory) return redirectOrNotFound(staticClient, conf, params, locale)

  if ((await products)?.errors) {
    const totalPages = (await filters)?.data.filters?.page_info?.total_pages ?? 0
    if (productListParams?.currentPage && productListParams.currentPage > totalPages) {
      const to = productListLink({ ...productListParams, currentPage: totalPages })
      return redirectTo(to, false, locale)
    }

    return { notFound: true }
  }

  const { category_url_path, category_name } = findParentBreadcrumbItem(await category) ?? {}

  const up =
    category_url_path && category_name
      ? { href: `/${category_url_path}`, title: category_name }
      : { href: '/', title: i18n._(/* i18n */ 'Home') }

  await waitForSiblings
  const result = {
    props: {
      ...(await categoryPage).data,
      ...(await products)?.data,
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
