import { PageOptions } from '@graphcommerce/framer-next-pages'
import { Asset } from '@graphcommerce/graphcms-ui'
import { cacheFirst, flushMeasurePerf, InContextMaskProvider } from '@graphcommerce/graphql'
import {
  PageQuery,
  PageDocument,
  isPageRedirect,
  pageRedirect,
  PageRows,
  isPageNotFound,
  pageRedirectOrNotFound,
  isPageFound,
} from '@graphcommerce/graphql-gc-api'
import {
  appendSiblingsAsChildren,
  CategoryBreadcrumbs,
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
  categoryDefaultsToProductListFilters,
  useProductList,
} from '@graphcommerce/magento-product'
import { redirectOrNotFound, StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, LayoutHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Container } from '@mui/material'
import { GetStaticPaths } from 'next'
import {
  ProductListLayoutClassic,
  ProductListLayoutDefault,
  ProductListLayoutSidebar,
  LayoutDocument,
  LayoutNavigation,
  LayoutNavigationProps,
} from '../components'
import { CategoryPageDocument, CategoryPageQuery } from '../graphql/CategoryPage.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'

export type CategoryProps = CategoryPageProps | RegularPageProps

type CategoryPageProps = PageQuery &
  ProductListQuery &
  ProductFiltersQuery & {
    category: NonNullable<NonNullable<NonNullable<CategoryPageQuery['categories']>['items']>[0]>
    filterTypes?: FilterTypes
    params?: ProductListParams
  }

type RegularPageProps = { page: NonNullable<PageQuery['page']> }

export type CategoryRoute = { url: string[] }

type GetPageStaticPaths = GetStaticPaths<CategoryRoute>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, CategoryProps, CategoryRoute>

function isCategoryPage(props: CategoryProps): props is CategoryPageProps {
  return (props as CategoryPageProps).category !== undefined
}

function CategoryLanding(props: CategoryPageProps) {
  const { page, ...rest } = props
  const productList = useProductList(rest)
  const { params, category } = productList

  return (
    <InContextMaskProvider mask={productList.mask}>
      <CategoryMeta params={params} {...category} />
      <LayoutHeader floatingMd>
        <LayoutTitle size='small' component='span'>
          {category.name}
        </LayoutTitle>
      </LayoutHeader>

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
        asset={page?.asset && <Asset asset={page.asset} loading='eager' />}
        title={<CategoryHeroNavTitle>{category?.name}</CategoryHeroNavTitle>}
      />

      <PageRows page={page} />
    </InContextMaskProvider>
  )
}

function CategoryProductList(props: CategoryPageProps) {
  const { page, ...rest } = props
  const productList = useProductList(rest)
  const { params, category } = productList

  return (
    <InContextMaskProvider mask={productList.mask}>
      <CategoryMeta params={params} {...category} />
      <LayoutHeader floatingMd>
        <LayoutTitle size='small' component='span'>
          {category.name}
        </LayoutTitle>
      </LayoutHeader>

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

      <PageRows page={page} />
    </InContextMaskProvider>
  )
}

function RegularPage(props: RegularPageProps) {
  const { page } = props
  return (
    <>
      <Container maxWidth={false}>
        <LayoutTitle variant='h1' gutterTop gutterBottom>
          {page.title}
        </LayoutTitle>
      </Container>

      <PageRows page={page} />
    </>
  )
}

function CategoryPage(props: CategoryProps) {
  if (isCategoryPage(props)) {
    const { category } = props
    if (category.display_mode === 'PAGE') return <CategoryLanding {...props} />
    return <CategoryProductList {...props} />
  }

  return <RegularPage {...props} />
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
  const [url, query] = extractUrlQuery(context.params)
  if (!url || !query) return { notFound: true }

  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)

  const conf = client.query({ query: StoreConfigDocument })
  const pageQuery = client.query({ query: PageDocument, variables: { input: { href: `/${url}` } } })
  const categoryPage = staticClient.query({ query: CategoryPageDocument, variables: { url } })
  const layout = staticClient.query({ query: LayoutDocument })
  const filterTypes = getFilterTypes(client)
  const params = parseParams(url, query, await filterTypes)

  const filteredCategoryUid = params && params.filters.category_uid?.in?.[0]

  const categoryPromise = categoryPage.then((res) => res.data.categories?.items?.[0])
  const waitForSiblings = appendSiblingsAsChildren(categoryPromise, staticClient)

  let categoryUid = filteredCategoryUid
  if (!categoryUid) {
    categoryUid = (await categoryPromise)?.uid ?? ''
    if (params) params.filters.category_uid = { in: [categoryUid] }
  }

  const hasCategory = !!params && categoryUid

  const filters = hasCategory
    ? staticClient.query({
        query: ProductFiltersDocument,
        variables: categoryDefaultsToProductListFilters(
          await productListApplyCategoryDefaults(params, (await conf).data, categoryPromise),
        ),
      })
    : undefined

  const products = hasCategory
    ? staticClient.query({
        query: ProductListDocument,
        variables: await productListApplyCategoryDefaults(
          params,
          (await conf).data,
          categoryPromise,
        ),
      })
    : undefined

  const parent = findParentBreadcrumbItem(await categoryPromise)
  const up = parent
    ? { href: `/${parent.category_url_path}`, title: parent.category_name }
    : { href: `/`, title: i18n._(/* i18n */ 'Home') }

  const pageResult = (await pageQuery).data
  const category = await categoryPromise

  if (!category && pageResult) {
    if (isPageRedirect(pageResult)) return pageRedirect(pageResult)

    const result = {
      props: {
        page: pageResult.page,
        apolloState: await conf.then(() => client.cache.extract()),
      },
      revalidate: 60 * 20,
    }
    flushMeasurePerf()
    return result
  }

  if (!pageResult.page && !category) {
    return redirectOrNotFound(staticClient, conf, context.params)
  }

  if ((await products)?.errors) return { notFound: true }

  await waitForSiblings
  const result = {
    props: {
      category,
      page: pageResult.page,

      ...(await products)?.data,
      ...(await filters)?.data,
      ...(await layout).data,
      filterTypes: await filterTypes,
      params,
      apolloState: await conf.then(() => client.cache.extract()),
      up,
    },
    revalidate: 60 * 20,
  }
  flushMeasurePerf()
  return result
}
