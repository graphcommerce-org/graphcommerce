import { Asset } from '@graphcommerce/graphcms-ui'
import { getHygraphPage } from '@graphcommerce/graphcms-ui/server'
import {
  CategoryChildren,
  CategoryDescription,
  CategoryHeroNav,
  CategoryHeroNavTitle,
} from '@graphcommerce/magento-category'
import { getCategoryPage } from '@graphcommerce/magento-category/server'
import {
  ProductFiltersPro,
  ProductListFiltersContainer,
  ProductFiltersProFilterChips,
  ProductFiltersProSortChip,
  ProductFiltersProLimitChip,
  ProductFiltersProAllFiltersChip,
  ProductListParamsProvider,
  ProductListSort,
  ProductListFilters,
  ProductListCount,
  ProductListPagination,
} from '@graphcommerce/magento-product'
import {
  getPageSize,
  getProductListFilters,
  getProductListItems,
} from '@graphcommerce/magento-product/server'
import { LayoutHeader, LayoutTitle, StickyBelowHeader } from '@graphcommerce/next-ui'
import { setConfigContext } from '@graphcommerce/next-ui/server'
import { Container, Skeleton } from '@mui/material'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { ProductListItems } from '../../../../components'
import { RowRenderer } from '../../../../components/GraphCMS'
import { CategoryPageDocument } from '../../../../graphql/CategoryPage.gql'
import { PageProps } from '../../types'

export const generateMetadata = async (props: PageProps) => {
  setConfigContext(props)
  const categoryPage = getCategoryPage(CategoryPageDocument, props)

  const category = await categoryPage.category

  return {
    title: category?.meta_title ?? category?.name,
    description: category?.meta_description,
  } satisfies Metadata
}

export default async (props: PageProps) => {
  setConfigContext(props)

  const categoryPage = getCategoryPage(CategoryPageDocument, props)

  const hygraphPage = getHygraphPage(categoryPage.params, categoryPage.category)
  const category = await categoryPage.category
  const params = await categoryPage.params
  const filterTypes = await categoryPage.filterTypes

  const isLanding = category?.display_mode === 'PAGE'
  const isCategory = params && category && (await categoryPage.filterTypes)

  const page = await hygraphPage.page
  if (!category && !page) return notFound()

  const listItems = getProductListItems(params)
  const listFilters = getProductListFilters(params)

  const pageSize = await getPageSize(params)
  const ProductListSkeleton = () => (
    <>
      <StickyBelowHeader>
        {import.meta.graphCommerce.productFiltersPro ? (
          <ProductFiltersPro params={params}>
            <ProductListFiltersContainer>
              <ProductFiltersProFilterChips
                aggregations={Object.entries(filterTypes)
                  .slice(0, 9)
                  .map(([attribute_code]) => ({
                    attribute_code,
                    label: <Skeleton variant='text' width={attribute_code.length * 7} />,
                  }))}
                filterTypes={filterTypes}
              />
            </ProductListFiltersContainer>
          </ProductFiltersPro>
        ) : (
          <ProductListParamsProvider value={params}>
            <ProductListFiltersContainer>
              <ProductListSort />
              <ProductListFilters filterTypes={filterTypes} />
            </ProductListFiltersContainer>
          </ProductListParamsProvider>
        )}
      </StickyBelowHeader>
      <Container maxWidth={false}>
        <ProductListCount total_count={category?.product_count} />
        <ProductListItems
          title={category?.name ?? ''}
          items={Array(pageSize)
            .fill(0)
            .map((v, index) => ({
              uid: `${index}`,
              __typename: 'VirtualProduct',
              name: '',
              rating_summary: 0,
              price_range: { minimum_price: { final_price: {}, regular_price: {} } },
            }))}
          loadingEager={1}
        />
        <ProductListPagination
          page_info={{ current_page: params.currentPage, total_pages: 1 }}
          params={params}
        />
      </Container>
    </>
  )

  const ProductList = async () => {
    const { filters } = (await listFilters).data
    const { products } = (await listItems).data

    return (
      <>
        <StickyBelowHeader>
          {import.meta.graphCommerce.productFiltersPro ? (
            <ProductFiltersPro params={params}>
              <ProductListFiltersContainer>
                <ProductFiltersProFilterChips
                  {...filters}
                  appliedAggregations={products?.aggregations}
                  filterTypes={filterTypes}
                />
                <ProductFiltersProSortChip {...products} />
                <ProductFiltersProLimitChip />
                <ProductFiltersProAllFiltersChip
                  {...products}
                  {...filters}
                  appliedAggregations={products?.aggregations}
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
          <ProductListItems title={category?.name ?? ''} items={products?.items} loadingEager={1} />
          <ProductListPagination page_info={products?.page_info} params={params} />
        </Container>
      </>
    )
  }

  return (
    <>
      <LayoutHeader floatingMd floatingSm />

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
            sx={{ marginBottom: category?.description && `var(--spacings-md)` }}
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

          <Suspense fallback={<ProductListSkeleton />}>
            <ProductList />
          </Suspense>
        </>
      )}

      {page && (
        <RowRenderer
          {...page}
          // renderer={{
          //   RowProduct: async (rowProps) => {
          //     const listItems = getProductListItems(params)
          //     return (
          //       <RowProduct
          //         {...rowProps}
          //         {...(await listItems).data.products?.items?.[0]}
          //         items={(await listItems).data.products?.items?.slice(0, 8)}
          //       />
          //     )
          //   },
          // }}
        />
      )}
    </>
  )
}
