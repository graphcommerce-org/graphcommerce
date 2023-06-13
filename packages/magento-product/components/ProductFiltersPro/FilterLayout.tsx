// eslint-disable-next-line import/no-extraneous-dependencies
import { CategoryQueryFragment } from '@graphcommerce/magento-category/queries/CategoryQueryFragment.gql'
import { StickyBelowHeader, responsiveVal } from '@graphcommerce/next-ui'
import { Box, Container, ContainerTypeMap, SxProps, Theme } from '@mui/material'
import React from 'react'
import { ProductListQuery } from '../ProductList/ProductList.gql'
import { ProductListCount as ProductListCountElement } from '../ProductListCount/ProductListCount'
import { ProductFiltersQuery } from '../ProductListFilters'
import { ProductListFiltersContainer } from '../ProductListFiltersContainer/ProductListFiltersContainer'
import { ProductListItems as ProductListItemsElement } from '../ProductListItems/ProductListItems'
import { FilterTypes, ProductListParams } from '../ProductListItems/filterTypes'
import { ProductListPagination as ProductListPaginationElement } from '../ProductListPagination/ProductListPagination'
import { ProductFiltersPro } from './ProductFiltersPro'
import { ProductFiltersProAllFiltersChip } from './ProductFiltersProAllFiltersChip'
import { ProductFiltersProAllFiltersSidebar } from './ProductFiltersProAllFiltersSidebar'
import { ProductFiltersProFilterChips } from './ProductFiltersProChips'
import { ProductFiltersProLimitChip } from './ProductFiltersProLimitChip'
import { ProductFiltersProSortChip } from './ProductFiltersProSortChip'

export interface FilterLayoutProps
  extends NonNullable<ProductListQuery>,
    NonNullable<ProductFiltersQuery> {
  ProductListItems: React.FC<React.ComponentProps<typeof ProductListItemsElement>>
  ProductListCount: React.FC<React.ComponentProps<typeof ProductListCountElement>>
  ProductListPagination: React.FC<React.ComponentProps<typeof ProductListPaginationElement>>
  filterTypes: FilterTypes
  params: ProductListParams
  category: NonNullable<NonNullable<CategoryQueryFragment['categories']>['items']>[number]
  maxWidth?: NonNullable<ContainerTypeMap['props']>['maxWidth']
  mode?: 'default' | 'sidebar'
  sx?: SxProps<Theme>
}

export function FilterLayout(props: FilterLayoutProps) {
  const {
    ProductListItems,
    ProductListCount,
    ProductListPagination,
    products,
    filterTypes,
    filters,
    params,
    category,
    maxWidth,
    mode = 'default',
    sx = [],
  } = props

  if (mode === 'sidebar') {
    return (
      <>
        <Container
          sx={[
            (theme) => ({
              display: { xs: 'none', md: 'grid' },
              gridTemplateColumns: { xs: '1fr', md: '3fr 9fr' },
              columnGap: theme.spacings.md,
              mx: 'auto',
            }),
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
          maxWidth={maxWidth}
        >
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
                mode={mode}
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
        </Container>

        <Container
          sx={[{ display: { xs: 'block', md: 'none' } }, ...(Array.isArray(sx) ? sx : [sx])]}
        >
          <StickyBelowHeader>
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
                  mode={mode}
                />
              </ProductListFiltersContainer>
            </ProductFiltersPro>
          </StickyBelowHeader>
          <ProductListCount
            sx={{ width: responsiveVal(280, 650) }}
            total_count={products?.total_count}
            mode={mode}
          />
          <ProductListItems items={products?.items} title={category?.name ?? ''} loadingEager={1} />
        </Container>
        <ProductListPagination page_info={products?.page_info} params={params} />
      </>
    )
  }

  return (
    <Container maxWidth={maxWidth} sx={Array.isArray(sx) ? sx : [sx]}>
      <StickyBelowHeader>
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
              mode={mode}
            />
          </ProductListFiltersContainer>
        </ProductFiltersPro>
      </StickyBelowHeader>
      <ProductListCount
        sx={{ width: responsiveVal(280, 650) }}
        total_count={products?.total_count}
        mode={mode}
      />
      <ProductListItems items={products?.items} title={category?.name ?? ''} loadingEager={1} />
      <ProductListPagination page_info={products?.page_info} params={params} />
    </Container>
  )
}
