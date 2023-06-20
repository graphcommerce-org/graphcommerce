import {
  AddProductsToCartForm,
  FilterTypes,
  ProductFiltersPro,
  ProductFiltersProAllFiltersChip,
  ProductFiltersProAllFiltersSidebar,
  ProductFiltersProClearAll,
  ProductFiltersProFilterChips,
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
import {
  ProductListSortSearch,
  ProductListFiltersSearch,
  ProductListCountSearch,
  ProductListItemsSearch,
  ProductListPaginationSearch,
} from '@graphcommerce/magento-search'
import { StickyBelowHeader } from '@graphcommerce/next-ui'
import { Container } from '@mui/material'
import { CategoryPageQuery } from '../../graphql/CategoryPage.gql'
import { ProductListItems } from './ProductListItems'
import { productListRenderer } from './productListRenderer'

export type ProductListFilterLayoutProps = ProductListQuery &
  ProductFiltersQuery & {
    filterTypes?: FilterTypes
    params?: ProductListParams
  }

type CategoryWithFilterProps = ProductListFilterLayoutProps & {
  category: NonNullable<NonNullable<CategoryPageQuery['categories']>['items']>[number]
}

export function CategoryFilterLayout(props: CategoryWithFilterProps) {
  const { params, filters, products, filterTypes, category } = props

  if (!(params && category && products?.items && filterTypes)) return null

  return import.meta.graphCommerce.productFiltersPro ? (
    <ProductFiltersPro
      key={category.name ?? ''}
      params={params}
      topleft={
        import.meta.graphCommerce.productFiltersLayout === 'SIDEBAR' && (
          <ProductFiltersProClearAll
            aggregations={filters?.aggregations}
            appliedAggregations={products?.aggregations}
            filterTypes={filterTypes}
          />
        )
      }
      topbar={
        <ProductListFiltersContainer>
          <ProductFiltersProFilterChips
            aggregations={filters?.aggregations}
            appliedAggregations={products?.aggregations}
            filterTypes={filterTypes}
          />
          <ProductFiltersProSortChip {...products} />
          <ProductFiltersProLimitChip />
          <ProductFiltersProAllFiltersChip
            {...products}
            aggregations={filters?.aggregations}
            appliedAggregations={products?.aggregations}
            filterTypes={filterTypes}
          />
        </ProductListFiltersContainer>
      }
      sidebar={
        import.meta.graphCommerce.productFiltersLayout === 'SIDEBAR' && (
          <ProductFiltersProAllFiltersSidebar
            {...products}
            aggregations={filters?.aggregations}
            appliedAggregations={products?.aggregations}
            filterTypes={filterTypes}
          />
        )
      }
      beforeContent={<ProductListCount total_count={products?.total_count} />}
      afterContent={<ProductListPagination page_info={products?.page_info} params={params} />}
    >
      <ProductListItems title={category.name ?? ''} items={products?.items} loadingEager={1} />
    </ProductFiltersPro>
  ) : (
    <>
      <StickyBelowHeader>
        <ProductListParamsProvider value={params}>
          <ProductListFiltersContainer>
            <ProductListSort
              sort_fields={products?.sort_fields}
              total_count={products?.total_count}
            />
            <ProductListFilters {...filters} filterTypes={filterTypes} />
          </ProductListFiltersContainer>
        </ProductListParamsProvider>
      </StickyBelowHeader>
      <Container maxWidth={false}>
        <ProductListCount total_count={products?.total_count} />
        <ProductListItems title={category.name ?? ''} items={products?.items} loadingEager={1} />
        <ProductListPagination page_info={products?.page_info} params={params} />
      </Container>
    </>
  )
}

type SearchFilterLayoutProps = ProductListFilterLayoutProps & {
  title: string
}

export function SearchFilterLayout(props: SearchFilterLayoutProps) {
  const { params, filters, products, filterTypes, title } = props

  if (!(params && products?.items && filterTypes)) return null

  return import.meta.graphCommerce.productFiltersPro ? (
    <ProductFiltersPro
      params={params}
      topleft={
        import.meta.graphCommerce.productFiltersLayout === 'SIDEBAR' && (
          <ProductFiltersProClearAll
            aggregations={filters?.aggregations}
            appliedAggregations={products?.aggregations}
            filterTypes={filterTypes}
          />
        )
      }
      topbar={
        <ProductListFiltersContainer>
          <ProductFiltersProFilterChips
            aggregations={filters?.aggregations}
            appliedAggregations={products?.aggregations}
            filterTypes={filterTypes}
          />
          <ProductFiltersProSortChip {...products} />
          <ProductFiltersProLimitChip />
          <ProductFiltersProAllFiltersChip
            {...products}
            aggregations={filters?.aggregations}
            appliedAggregations={products?.aggregations}
            filterTypes={filterTypes}
          />
        </ProductListFiltersContainer>
      }
      sidebar={
        import.meta.graphCommerce.productFiltersLayout === 'SIDEBAR' && (
          <ProductFiltersProAllFiltersSidebar
            {...products}
            aggregations={filters?.aggregations}
            appliedAggregations={products?.aggregations}
            filterTypes={filterTypes}
          />
        )
      }
      beforeContent={<ProductListCount total_count={products?.total_count} />}
      afterContent={<ProductListPagination page_info={products?.page_info} params={params} />}
    >
      <ProductListItems title={title} items={products?.items} loadingEager={1} />
    </ProductFiltersPro>
  ) : (
    <>
      <StickyBelowHeader>
        <ProductListParamsProvider value={params}>
          <ProductListFiltersContainer>
            <ProductListSortSearch
              sort_fields={products?.sort_fields}
              total_count={products?.total_count}
            />
            <ProductListFiltersSearch {...filters} filterTypes={filterTypes} />
          </ProductListFiltersContainer>
        </ProductListParamsProvider>
      </StickyBelowHeader>
      <Container maxWidth={false}>
        <ProductListCountSearch total_count={products?.total_count} />
        <AddProductsToCartForm>
          <ProductListItemsSearch
            renderers={productListRenderer}
            title={title}
            items={products?.items}
            loadingEager={1}
          />
        </AddProductsToCartForm>
        <ProductListPaginationSearch page_info={products?.page_info} params={params} />
      </Container>
    </>
  )
}
