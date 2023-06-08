// eslint-disable-next-line import/no-extraneous-dependencies
import { CategoryQueryFragment } from '@graphcommerce/magento-category/queries/CategoryQueryFragment.gql'
import { StickyBelowHeader, responsiveVal } from '@graphcommerce/next-ui'
import { Box, Container } from '@mui/material'
import React from 'react'
import { ProductListQuery } from '../ProductList/ProductList.gql'
import { ProductListCount as ProductListCountElement } from '../ProductListCount/ProductListCount'
import { ProductFiltersQuery, ProductListFilters } from '../ProductListFilters'
import { ProductListFiltersContainer } from '../ProductListFiltersContainer/ProductListFiltersContainer'
import { ProductListItems as ProductListItemsElement } from '../ProductListItems/ProductListItems'
import { ProductListParamsProvider } from '../ProductListItems/ProductListParamsProvider'
import { FilterTypes, ProductListParams } from '../ProductListItems/filterTypes'
import { ProductListPagination as ProductListPaginationElement } from '../ProductListPagination/ProductListPagination'
import { ProductListSort } from '../ProductListSort'
import { ProductFiltersPro } from './ProductFiltersPro'
import { ProductFiltersProAllFiltersChip } from './ProductFiltersProAllFiltersChip'
import { ProductFiltersProAllFiltersSidebar } from './ProductFiltersProAllFiltersSidebar'
import { ProductFiltersProFilterChips } from './ProductFiltersProChips'
import { ProductFiltersProLimitChip } from './ProductFiltersProLimitChip'
import { ProductFiltersProSortChip } from './ProductFiltersProSortChip'

export interface FilterLayoutProps
  extends NonNullable<ProductListQuery>,
    NonNullable<ProductFiltersQuery> {
  mode: 'default' | 'sidebar'
  ProductListItems: React.FC<React.ComponentProps<typeof ProductListItemsElement>>
  ProductListCount: React.FC<React.ComponentProps<typeof ProductListCountElement>>
  ProductListPagination: React.FC<React.ComponentProps<typeof ProductListPaginationElement>>
  filterTypes: FilterTypes
  params: ProductListParams
  category: NonNullable<NonNullable<CategoryQueryFragment['categories']>['items']>[number]
}

export function FilterLayout(props: FilterLayoutProps) {
  const {
    mode,
    ProductListItems,
    ProductListCount,
    ProductListPagination,
    products,
    filterTypes,
    filters,
    params,
    category,
  } = props

  if (mode === 'sidebar' && import.meta.graphCommerce.productFiltersPro) {
    return (
      <Container maxWidth='lg'>
        <Box
          sx={(theme) => ({
            display: 'grid',
            gridTemplateColumns: '3fr 9fr',
            columnGap: theme.spacings.md,
            [theme.breakpoints.down('md')]: { display: 'flex' },
          })}
        >
          {/* Here comes the filters */}
          <Box
            sx={(theme) => ({
              [theme.breakpoints.down('md')]: { display: 'none' },
            })}
          >
            <ProductFiltersPro params={params}>
              <ProductFiltersProAllFiltersSidebar
                {...products}
                {...filters}
                appliedAggregations={products?.aggregations}
                filterTypes={filterTypes}
              />
            </ProductFiltersPro>
          </Box>
          <Box>
            <ProductListCount total_count={products?.total_count} mode={mode} />
            <ProductListItems
              items={products?.items}
              title={category?.name ?? ''}
              loadingEager={1}
            />
          </Box>
        </Box>
        <ProductListPagination page_info={products?.page_info} params={params} />
      </Container>
    )
  }

  return (
    <Container>
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
      <ProductListCount
        sx={{ width: responsiveVal(280, 650) }}
        total_count={products?.total_count}
        mode={mode}
      />
      <ProductListItems items={products?.items} title={category?.name ?? ''} loadingEager={1} />
    </Container>
  )
}
