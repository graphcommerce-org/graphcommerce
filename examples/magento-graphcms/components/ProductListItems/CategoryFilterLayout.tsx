import {
  CategoryChildren,
  CategoryDescription,
  CategoryQueryFragment,
} from '@graphcommerce/magento-category'
import {
  CategoryDefaultFragment,
  FilterTypes,
  ProductFiltersPro,
  ProductFiltersProAllFiltersChip,
  ProductFiltersProAllFiltersSidebar,
  ProductFiltersProClearAll,
  ProductFiltersProFilterChips,
  ProductFiltersProLayoutSidebar,
  ProductFiltersProLimitChip,
  ProductFiltersProSortChip,
  ProductFiltersQuery,
  ProductListCount,
  ProductListFilters,
  ProductListFiltersContainer,
  ProductListPagination,
  ProductListParams,
  ProductListParamsProvider,
  ProductListQuery,
  ProductListSort,
} from '@graphcommerce/magento-product'
import { LayoutTitle, StickyBelowHeader } from '@graphcommerce/next-ui'
import { Box, Container } from '@mui/material'
import { CategoryPageQuery } from '../../graphql/CategoryPage.gql'
import { ProductListItems } from './ProductListItems'

export type ProductListFilterLayoutProps = ProductListQuery &
  ProductFiltersQuery & {
    filterTypes?: FilterTypes
    params?: ProductListParams
    id: string
    title: string
    category?: CategoryDefaultFragment &
      NonNullable<NonNullable<CategoryPageQuery['categories']>['items']>[number]
    categories?: CategoryQueryFragment['categories']
    description?: React.ReactNode
  }

export function CategoryFilterLayout(props: ProductListFilterLayoutProps) {
  const { params, filters, products, filterTypes, title, id, category } = props

  if (!(params && products?.items && filterTypes)) return null

  const { total_count, sort_fields, page_info } = products

  const items = <ProductListItems items={products.items} loadingEager={6} title={title} />

  if (import.meta.graphCommerce.productFiltersPro) {
    const horizontalFilters = (
      <ProductListFiltersContainer>
        <ProductFiltersProFilterChips />
        <ProductFiltersProSortChip
          total_count={total_count}
          sort_fields={sort_fields}
          category={category}
        />
        <ProductFiltersProLimitChip />
        <ProductFiltersProAllFiltersChip
          total_count={total_count}
          sort_fields={sort_fields}
          category={category}
        />
      </ProductListFiltersContainer>
    )

    return (
      <ProductFiltersPro
        key={id}
        params={params}
        aggregations={filters?.aggregations}
        appliedAggregations={products?.aggregations}
        filterTypes={filterTypes}
      >
        {import.meta.graphCommerce.productFiltersLayout === 'SIDEBAR' ? (
          <ProductFiltersProLayoutSidebar
            clearAll={<ProductFiltersProClearAll />}
            horizontalFilters={horizontalFilters}
            sidebarFilters={
              <ProductFiltersProAllFiltersSidebar
                total_count={total_count}
                sort_fields={sort_fields}
                category={category}
                {...props}
              />
            }
            count={<ProductListCount total_count={total_count} />}
            pagination={<ProductListPagination page_info={page_info} params={params} />}
            items={items}
          >
            <LayoutTitle
              gutterTop
              variant='h1'
              sx={(theme) => ({
                mb: (category?.description || category?.children) && theme.spacings.md,
                alignItems: { xs: 'center', md: 'flex-start' },
              })}
              gutterBottom={!category?.description && category?.children?.length === 0}
            >
              {title}
            </LayoutTitle>
            <CategoryDescription
              textAlignMd='start'
              sx={{ p: 0, ml: 0, textAlign: { xs: 'center', md: 'left' } }}
              description={category?.description}
            />
            <CategoryChildren
              sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
              params={params}
            >
              {category?.children}
            </CategoryChildren>
          </ProductFiltersProLayoutSidebar>
        ) : (
          <>
            <Box
              sx={(theme) => ({
                display: 'grid',
                rowGap: theme.spacings.sm,
                mb: theme.spacings.sm,
              })}
            >
              <LayoutTitle
                gutterTop
                variant='h1'
                sx={{ alignItems: { xs: 'center', md: 'center' } }}
                gutterBottom={false}
              >
                {title}
              </LayoutTitle>
              <CategoryDescription
                textAlignMd='center'
                textAlignSm='center'
                sx={(theme) => ({ px: theme.page.horizontal })}
                description={category?.description}
              />
              <CategoryChildren sx={{ justifyContent: 'center' }} params={params}>
                {category?.children}
              </CategoryChildren>
            </Box>
            <StickyBelowHeader>{horizontalFilters}</StickyBelowHeader>

            <Container maxWidth={false}>
              <ProductListCount total_count={total_count} />
              {items}
              <ProductListPagination page_info={page_info} params={params} />
            </Container>
          </>
        )}
      </ProductFiltersPro>
    )
  }

  if (!import.meta.graphCommerce.productFiltersPro) {
    return (
      <>
        <LayoutTitle
          gutterTop
          variant='h1'
          sx={(theme) => ({
            mb: (category?.description || category?.children) && theme.spacings.md,
            alignItems: { xs: 'center', md: 'center' },
          })}
          gutterBottom={!category?.description && category?.children?.length === 0}
        >
          {title}
        </LayoutTitle>
        <CategoryDescription sx={{ textAlign: 'center' }} description={category?.description} />
        <CategoryChildren params={params}>{category?.children}</CategoryChildren>
        <StickyBelowHeader>
          <ProductListParamsProvider value={params}>
            <ProductListFiltersContainer>
              <ProductListSort sort_fields={sort_fields} total_count={total_count} />
              <ProductListFilters {...filters} filterTypes={filterTypes} />
            </ProductListFiltersContainer>
          </ProductListParamsProvider>
        </StickyBelowHeader>
        <Container maxWidth={false}>
          <ProductListCount total_count={total_count} />
          {items}
          <ProductListPagination page_info={page_info} params={params} />
        </Container>
      </>
    )
  }

  return null
}
