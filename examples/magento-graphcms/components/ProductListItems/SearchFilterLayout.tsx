import {
  ProductFiltersPro,
  ProductFiltersProAllFiltersChip,
  ProductFiltersProAllFiltersSidebar,
  ProductFiltersProClearAll,
  ProductFiltersProFilterChips,
  ProductFiltersProLayoutSidebar,
  ProductFiltersProLimitChip,
  ProductFiltersProSortChip,
  ProductListCount,
  ProductListFilters,
  ProductListFiltersContainer,
  ProductListItemsBase,
  ProductListPagination,
  ProductListParamsProvider,
  ProductListSort,
  useProductList,
} from '@graphcommerce/magento-search'
import { StickyBelowHeader } from '@graphcommerce/next-ui'
import { Container } from '@mui/material'
import { ProductListFilterLayoutProps } from './CategoryFilterLayout'
import { productListRenderer } from './productListRenderer'

export function SearchFilterLayout(props: ProductListFilterLayoutProps) {
  const { params, filters, products, filterTypes, title, id, mask } = useProductList(props)

  if (!(params && products?.items && filterTypes)) return null

  const { total_count, sort_fields, page_info } = products

  const items = (
    <ProductListItemsBase
      renderers={productListRenderer}
      items={products.items}
      loadingEager={6}
      title={title}
    />
  )

  if (import.meta.graphCommerce.productFiltersPro) {
    const horizontalFilters = (
      <ProductListFiltersContainer>
        <ProductFiltersProFilterChips />
        <ProductFiltersProSortChip total_count={total_count} sort_fields={sort_fields} />
        <ProductFiltersProLimitChip />
        <ProductFiltersProAllFiltersChip total_count={total_count} sort_fields={sort_fields} />
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
              />
            }
            count={<ProductListCount total_count={total_count} />}
            pagination={<ProductListPagination page_info={page_info} params={params} />}
            items={items}
          />
        ) : (
          <>
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
