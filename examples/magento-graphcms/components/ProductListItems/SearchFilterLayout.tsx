import {
  NoSearchResults,
  ProductFiltersPro,
  ProductFiltersProAggregations,
  ProductFiltersProAllFiltersChip,
  ProductFiltersProClearAll,
  ProductFiltersProLimitChip,
  ProductFiltersProLimitSection,
  ProductFiltersProSortChip,
  ProductFiltersProSortSection,
  ProductListCount,
  ProductListFilters,
  ProductListFiltersContainer,
  ProductListPagination,
  ProductListParamsProvider,
  ProductListSort,
  SearchForm,
  productFiltersProChipRenderer,
  productFiltersProSectionRenderer,
} from '@graphcommerce/magento-search'
import { LayoutTitle, StickyBelowHeader } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Container, Typography } from '@mui/material'
import { ProductListFilterLayoutProps } from './CategoryFilterLayout'
import { ProductListItems } from './ProductListItems'

function SearchFilterLayoutSidebar(props: Omit<ProductListFilterLayoutProps, 'category'>) {
  const { id, filters, filterTypes, params, products, title } = props

  if (!params || !products?.items || !filterTypes) return null
  const { total_count, sort_fields, page_info } = products

  const search = params.url.split('/')[1]
  const totalSearchResults =
    // (categories?.items?.length ?? 0) +
    products?.total_count ?? 0

  return (
    <ProductFiltersPro
      params={params}
      aggregations={filters?.aggregations}
      appliedAggregations={products?.aggregations}
      filterTypes={filterTypes}
      autoSubmitMd
    >
      <Container
        maxWidth={false}
        sx={(theme) => ({
          display: 'grid',
          alignItems: 'start',
          rowGap: theme.spacings.md,
          columnGap: { xs: theme.spacings.md, xl: theme.spacings.xxl },
          mb: theme.spacings.xl,

          gridTemplate: {
            xs: `"horizontalFilters" "count" "items" "pagination"`,
            md: `
              "sidebar search"      auto
              "sidebar title"      auto
              "sidebar count"      auto
              "sidebar items"      auto
              "sidebar pagination" 1fr
              /300px   auto
            `,
          },
        })}
      >
        <SearchForm
          totalResults={totalSearchResults}
          search={search}
          sx={{ gridArea: 'search', display: { xs: 'none', md: 'block' } }}
          textFieldProps={{
            autoFocus: true,
            fullWidth: true,
            placeholder: 'Search all products',
          }}
        />

        <Box
          sx={(theme) => ({
            gridArea: 'title',
            display: { xs: 'none', md: 'grid' },
            gridAutoFlow: 'row',
            rowGap: theme.spacings.xs,
          })}
        >
          <Typography variant='h3'>
            {search ? (
              <Trans id='Results for &lsquo;{search}&rsquo;' values={{ search }} />
            ) : (
              <Trans id='All products' />
            )}
          </Typography>
        </Box>

        <StickyBelowHeader sx={{ display: { md: 'none', gridArea: 'horizontalFilters' } }}>
          <ProductListFiltersContainer
            sx={(theme) => ({
              '& .ProductListFiltersContainer-scroller': {
                px: theme.page.horizontal,
                mx: `calc(${theme.page.horizontal} * -1)`,
              },
            })}
          >
            <ProductFiltersProAggregations renderer={productFiltersProChipRenderer} />
            <ProductFiltersProSortChip total_count={total_count} sort_fields={sort_fields} />
            <ProductFiltersProLimitChip />
            <ProductFiltersProAllFiltersChip total_count={total_count} sort_fields={sort_fields} />
          </ProductListFiltersContainer>
        </StickyBelowHeader>

        <ProductListCount
          total_count={total_count}
          sx={{ gridArea: 'count', width: '100%', my: 0, height: '1em' }}
        />

        <Box gridArea='items'>
          {products.items.length <= 0 ? (
            <NoSearchResults search={search} />
          ) : (
            <ProductListItems items={products.items} loadingEager={6} title={title} />
          )}
        </Box>

        <ProductListPagination
          page_info={page_info}
          params={params}
          sx={{ gridArea: 'pagination', my: 0 }}
        />

        <Box className='sidebar' sx={{ gridArea: 'sidebar', display: { xs: 'none', md: 'block' } }}>
          <ProductFiltersProClearAll
            sx={{ display: { xs: 'none', md: 'block' }, alignSelf: 'center' }}
          />
          {/* <ProductFiltersProCategorySection category={category} params={params} hideTitle /> */}
          <ProductFiltersProSortSection sort_fields={sort_fields} total_count={total_count} />
          <ProductFiltersProLimitSection />
          <ProductFiltersProAggregations renderer={productFiltersProSectionRenderer} />
        </Box>
      </Container>
    </ProductFiltersPro>
  )
}

function SearchFilterLayoutDefault(props: Omit<ProductListFilterLayoutProps, 'category'>) {
  const { filters, filterTypes, params, products, title } = props

  if (!(params && products?.items && filterTypes)) return null
  const { total_count, sort_fields, page_info } = products

  return (
    <ProductFiltersPro
      params={params}
      aggregations={filters?.aggregations}
      appliedAggregations={products?.aggregations}
      filterTypes={filterTypes}
    >
      <Box
        sx={(theme) => ({
          display: 'grid',
          rowGap: theme.spacings.sm,
          mb: theme.spacings.sm,
          gridTemplateColumns: 'minmax(0, 1fr)',
        })}
      >
        <LayoutTitle
          gutterTop
          variant='h1'
          sx={{ alignItems: { xs: 'left', md: 'center' } }}
          gutterBottom={false}
        >
          {title}
        </LayoutTitle>
      </Box>
      <StickyBelowHeader>
        <ProductListFiltersContainer>
          <ProductFiltersProAggregations renderer={productFiltersProChipRenderer} />
          <ProductFiltersProSortChip total_count={total_count} sort_fields={sort_fields} />
          <ProductFiltersProLimitChip />
          <ProductFiltersProAllFiltersChip total_count={total_count} sort_fields={sort_fields} />
        </ProductListFiltersContainer>
      </StickyBelowHeader>

      <Container maxWidth={false}>
        <ProductListCount total_count={total_count} />
        <ProductListItems items={products.items} loadingEager={6} title={title} />
        <ProductListPagination page_info={page_info} params={params} />
      </Container>
    </ProductFiltersPro>
  )
}

function SearchFiltersLayoutClassic(props: Omit<ProductListFilterLayoutProps, 'category'>) {
  const { id, filters, filterTypes, params, products, title } = props

  if (!(params && products?.items && filterTypes)) return null
  const { total_count, sort_fields, page_info } = products

  return (
    <>
      <LayoutTitle gutterTop variant='h1' sx={{ alignItems: { xs: 'center', md: 'center' } }}>
        {title}
      </LayoutTitle>
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
        <ProductListItems items={products.items} loadingEager={6} title={title} />
        <ProductListPagination page_info={page_info} params={params} />
      </Container>
    </>
  )
}

export function SearchFilterLayout(props: Omit<ProductListFilterLayoutProps, 'category'>) {
  if (import.meta.graphCommerce.productFiltersPro) {
    if (import.meta.graphCommerce.productFiltersLayout === 'SIDEBAR')
      return <SearchFilterLayoutSidebar {...props} />

    return <SearchFilterLayoutDefault {...props} />
  }

  if (!import.meta.graphCommerce.productFiltersPro) {
    return <SearchFiltersLayoutClassic {...props} />
  }

  return null
}
