import { PageOptions } from '@graphcommerce/framer-next-pages'
import { Asset, HygraphPagesQuery } from '@graphcommerce/graphcms-ui'
import { hygraphPageContent } from '@graphcommerce/graphcms-ui/server'
import {
  CategoryChildren,
  CategoryDescription,
  CategoryHeroNav,
  CategoryHeroNavTitle,
  CategoryMeta,
  getCategoryStaticPaths,
} from '@graphcommerce/magento-category'
import { categoryPageProps, CategoryPageProps } from '@graphcommerce/magento-category/server'
import {
  extractUrlQuery,
  ProductFiltersPro,
  ProductFiltersProAllFiltersChip,
  ProductFiltersProFilterChips,
  ProductFiltersProLimitChip,
  ProductFiltersProSortChip,
  ProductListCount,
  ProductListFilters,
  ProductListFiltersContainer,
  ProductListPagination,
  ProductListParamsProvider,
  ProductListSort,
} from '@graphcommerce/magento-product'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { redirectOrNotFound, storeConfig } from '@graphcommerce/magento-store/server'
import {
  StickyBelowHeader,
  LayoutTitle,
  LayoutHeader,
  MetaRobots,
  PageMeta,
} from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { Container } from '@mui/material'
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
import {
  graphqlSsrClient,
  graphqlSharedClient,
  graphqlQuery,
} from '../lib/graphql/graphqlSsrClient'

export type CategoryProps = CategoryPageProps<CategoryPageQuery> & HygraphPagesQuery
export type CategoryRoute = { url: string[] }

type GetPageStaticPaths = GetStaticPaths<CategoryRoute>

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
          <StickyBelowHeader>
            {import.meta.graphCommerce.productFiltersPro ? (
              <ProductFiltersPro params={params}>
                <ProductListFiltersContainer>
                  <ProductFiltersProFilterChips
                    {...filters}
                    appliedAggregations={products.aggregations}
                    filterTypes={filterTypes}
                  />
                  <ProductFiltersProSortChip {...products} />
                  <ProductFiltersProLimitChip />
                  <ProductFiltersProAllFiltersChip
                    {...products}
                    {...filters}
                    appliedAggregations={products.aggregations}
                    filterTypes={filterTypes}
                  />
                </ProductListFiltersContainer>
              </ProductFiltersPro>
            ) : (
              <ProductListParamsProvider value={params}>
                <ProductListFiltersContainer>
                  <ProductListSort
                    sort_fields={products?.sort_fields}
                    total_count={products?.total_count}
                  />
                  <ProductListFilters {...filters} filterTypes={filterTypes} />
                </ProductListFiltersContainer>
              </ProductListParamsProvider>
            )}
          </StickyBelowHeader>
          <Container maxWidth={false}>
            <ProductListCount total_count={products?.total_count} />
            <ProductListItems
              title={category.name ?? ''}
              items={products?.items}
              loadingEager={1}
            />
            <ProductListPagination page_info={products?.page_info} params={params} />
          </Container>
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

export const getStaticProps = enhanceStaticProps<
  LayoutNavigationProps,
  CategoryProps,
  CategoryRoute
>(async (context) => {
  const { params, locale } = context
  const [url, query] = extractUrlQuery(params)
  if (!url || !query || !locale) return { notFound: true }

  const layout = graphqlQuery(LayoutDocument, { fetchPolicy: 'cache-first' })

  const categoryPageData = categoryPageProps(CategoryPageDocument, context)
  const pages = hygraphPageContent(url, categoryPageData.category)
  const hasPage = (await pages).data.pages.length > 0

  const awaited = await categoryPageData.props
  if (!awaited && !hasPage) return redirectOrNotFound(params, locale)

  return {
    props: {
      ...awaited,
      ...(await pages).data,
      ...(await layout).data,
    },
    revalidate: 60 * 20,
  }
})
