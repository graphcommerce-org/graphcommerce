import { PageOptions } from '@graphcommerce/framer-next-pages'
import { Asset, HygraphPagesQuery } from '@graphcommerce/graphcms-ui'
import {
  hygraphPageContent,
  getHygraphPage,
  HygraphSinglePageReturn,
} from '@graphcommerce/graphcms-ui/server'
import { DeepAwait, deepAwait } from '@graphcommerce/graphql-mesh'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import {
  CategoryChildren,
  CategoryDescription,
  CategoryHeroNav,
  CategoryHeroNavTitle,
  CategoryMeta,
} from '@graphcommerce/magento-category'
import {
  getCategoryPage,
  GetCategoryPageResult,
  getCategoryStaticPaths,
} from '@graphcommerce/magento-category/server'
import {
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
import {
  getProductList,
  getProductListFilters,
  getProductListItems,
  ProductListingResult,
} from '@graphcommerce/magento-product/server'
import { redirectOrNotFound } from '@graphcommerce/magento-store/server'
import {
  StickyBelowHeader,
  LayoutTitle,
  LayoutHeader,
  MetaRobots,
  GetStaticProps,
} from '@graphcommerce/next-ui'
import { enhanceStaticPaths, enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { Container } from '@mui/material'
import { GetStaticPaths } from 'next'
import {
  LayoutNavigation,
  LayoutNavigationProps,
  ProductListItems,
  RowProduct,
  RowRenderer,
} from '../components'
import { LayoutDocument, LayoutQuery } from '../components/Layout/Layout.gql'
import { CategoryPageDocument, CategoryPageQuery } from '../graphql/CategoryPage.gql'

export type CategoryProps = DeepAwait<GetCategoryPageResult<CategoryPageQuery>> &
  DeepAwait<ProductListingResult> &
  DeepAwait<HygraphSinglePageReturn>

export type CategoryRoute = { url: string[] }
type GetPageStaticProps = GetStaticProps<LayoutQuery, CategoryProps, CategoryRoute>

function CategoryPage(props: CategoryProps) {
  const { category, productListContext, products, filters, page } = props
  const { filterTypes, params } = productListContext

  const isLanding = category?.display_mode === 'PAGE'
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
          {category?.name ?? page?.title}
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
            {category?.name ?? page?.title}
          </LayoutTitle>
        </Container>
      )}
      {isCategory && isLanding && (
        <CategoryHeroNav
          {...category}
          asset={page?.asset && <Asset asset={page.asset} loading='eager' />}
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

export const getStaticPaths = enhanceStaticPaths('blocking', getCategoryStaticPaths)

export const getStaticProps: GetPageStaticProps = enhanceStaticProps(async (context) => {
  const { params, locale } = context

  const layout = graphqlQuery(LayoutDocument, { fetchPolicy: 'cache-first' })

  const categoryPage = await getCategoryPage(CategoryPageDocument, context)

  const listItems = getProductListItems(categoryPage.productListContext)
  const filters = getProductListFilters(categoryPage.productListContext)
  const page = getHygraphPage(categoryPage.productListContext.params.url, categoryPage.category)

  if (!(await categoryPage.category) && !(await page.page) && !(await listItems).error)
    return redirectOrNotFound(params, locale)

  return {
    props: await deepAwait({
      ...categoryPage,
      ...(await listItems).data,
      ...(await filters).data,
      ...page,
      ...(await layout).data,
    }),
    revalidate: 60 * 20,
  }
})
