import { PageOptions } from '@graphcommerce/framer-next-pages'
import { Asset } from '@graphcommerce/graphcms-ui'
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
import {
  StickyBelowHeader,
  LayoutTitle,
  LayoutHeader,
  GetStaticProps,
  MetaRobots,
  PageMeta,
} from '@graphcommerce/next-ui'
import { Container } from '@mui/material'
import { GetStaticPaths } from 'next'
import {
  LayoutFull,
  LayoutFullProps,
  ProductListItems,
  sxLargeItem,
  RowProduct,
  RowRenderer,
} from '../components'
import { CategoryPageDocument, CategoryPageQuery } from '../graphql/CategoryPage.gql'
import { graphqlSsrClient, graphqlSharedClient } from '../lib/graphql/graphqlSsrClient'

export const config = { unstable_JsPreload: false }

type Props = CategoryPageQuery &
  ProductListQuery & {
    filterTypes: FilterTypes
    params: ProductListParams
  }
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutFullProps, Props, RouteProps>

function CategoryPage(props: Props) {
  const { categories, products, filters, params, filterTypes, pages } = props

  const category = categories?.items?.[0]
  if (!category || !products || !params || !filters || !filterTypes) return null

  const isLanding = category.display_mode === 'PAGE'

  let productList = products?.items
  if (isLanding && productList) productList = products?.items?.slice(0, 8)

  const product = products?.items?.[0]
  const page = pages?.[0]

  return (
    <>
      {page ? (
        <PageMeta
          title={page?.metaTitle ?? ''}
          metaDescription={page?.metaDescription ?? ''}
          metaRobots={page?.metaRobots.toLowerCase().split('_').flat(1) as MetaRobots[]}
        />
      ) : (
        <CategoryMeta params={params} {...category} />
      )}

      <LayoutHeader floatingMd>
        <LayoutTitle size='small' component='span'>
          {category?.name}
        </LayoutTitle>
      </LayoutHeader>

      {isLanding ? (
        <CategoryHeroNav
          {...category}
          asset={pages?.[0]?.asset && <Asset asset={pages[0].asset} loading='eager' />}
          title={<CategoryHeroNavTitle>{category?.name}</CategoryHeroNavTitle>}
        />
      ) : (
        <ProductListParamsProvider value={params}>
          <LayoutTitle
            variant='h1'
            gutterTop
            gutterBottom={!category.description && category.children?.length === 0}
          >
            {category?.name}
          </LayoutTitle>
          <CategoryDescription description={category.description} />
          <CategoryChildren params={params}>{category.children}</CategoryChildren>

          <StickyBelowHeader>
            <ProductListFiltersContainer>
              <ProductListSort
                sort_fields={products?.sort_fields}
                total_count={products?.total_count}
              />
              <ProductListFilters aggregations={filters?.aggregations} filterTypes={filterTypes} />
            </ProductListFiltersContainer>
          </StickyBelowHeader>
          <Container maxWidth={false}>
            <ProductListCount total_count={products?.total_count} />
            <ProductListItems items={products?.items} loadingEager={1} sx={sxLargeItem} />
            <ProductListPagination page_info={products?.page_info} />
          </Container>
        </ProductListParamsProvider>
      )}

      {page && (
        <RowRenderer
          content={page.content}
          renderer={{
            RowProduct: (rowProps) => <RowProduct {...rowProps} {...product} items={productList} />,
          }}
        />
      )}
    </>
  )
}

CategoryPage.pageOptions = {
  Layout: LayoutFull,
} as PageOptions

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
    variables: { url, rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '' },
  })
  const categoryUid = categoryPage.then((res) => res.data.categories?.items?.[0]?.uid ?? '')

  const productListParams = parseParams(url, query, await filterTypes)
  if (!productListParams || !(await categoryUid)) return { notFound: true }

  const products = staticClient.query({
    query: ProductListDocument,
    variables: {
      ...productListParams,
      filters: { ...productListParams.filters, category_uid: { eq: await categoryUid } },
      categoryUid: await categoryUid,
    },
  })

  // assertAllowedParams(await params, (await products).data)
  if (!(await categoryUid) || !(await products).data) return { notFound: true }

  const { category_name, category_url_path } =
    (await categoryPage).data.categories?.items?.[0]?.breadcrumbs?.[0] ?? {}

  const up =
    category_url_path && category_name
      ? { href: `/${category_url_path}`, title: category_name }
      : { href: `/`, title: 'Home' }

  return {
    props: {
      ...(await categoryPage).data,
      ...(await products).data,
      filterTypes: await filterTypes,
      params: productListParams,
      apolloState: await conf.then(() => client.cache.extract()),
      up,
    },
    revalidate: 60 * 20,
  }
}
