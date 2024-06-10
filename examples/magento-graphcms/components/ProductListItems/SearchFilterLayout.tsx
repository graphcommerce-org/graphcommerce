import { SignedInMaskProvider } from '@graphcommerce/magento-customer'
import {
  NoSearchResults,
  ProductFiltersPro,
  ProductFiltersProAggregations,
  ProductFiltersProAllFiltersChip,
  ProductFiltersProClearAll,
  ProductFiltersProLimitChip,
  ProductFiltersProLimitSection,
  ProductFiltersProSearchField,
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
  useProductList,
} from '@graphcommerce/magento-search'
import { LayoutHeader, LayoutTitle, StickyBelowHeader } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Container } from '@mui/material'
import { ProductListFilterLayoutProps } from './CategoryFilterLayout'
import { ProductListItems } from './ProductListItems'
import { i18n } from '@lingui/core'

type SearchFilterLayoutProps = Omit<ProductListFilterLayoutProps, 'category' | 'id' | 'title'>

function SearchFilterLayoutSidebar(props: SearchFilterLayoutProps) {
  const { filters, filterTypes, params, products } = props

  if (!params || !products?.items || !filterTypes) return null
  const { total_count, sort_fields, page_info } = products

  const search = `${params.search}`
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
              "sidebar count"      auto
              "sidebar items"      auto
              "sidebar pagination" 1fr
              /300px   auto
            `,
          },
        })}
      >
        <ProductFiltersProSearchField
          sx={{ gridArea: 'search', display: { xs: 'none', md: 'block' } }}
          fullWidth
          placeholder={i18n._(/* i18n*/ `Search all products...`)}
        />

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
            <ProductListItems items={products.items} loadingEager={6} title={`Search ${search}`} />
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

function SearchFilterLayoutDefault(props: SearchFilterLayoutProps) {
  const { filters, filterTypes, params, products } = props

  if (!(params && products?.items && filterTypes)) return null
  const { total_count, sort_fields, page_info } = products
  const search = `${params.search}`

  return (
    <ProductFiltersPro
      params={params}
      aggregations={filters?.aggregations}
      appliedAggregations={products?.aggregations}
      filterTypes={filterTypes}
      autoSubmitMd
    >
      <LayoutHeader floatingMd switchPoint={0}>
        <ProductFiltersProSearchField
          variant='outlined'
          autoComplete='off'
          size='small'
          placeholder={i18n._(/* i18n*/ `Search all products...`)}
          sx={{ width: '81vw' }}
        />
      </LayoutHeader>

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
          {search ? (
            <Trans id='Results for &lsquo;{search}&rsquo;' values={{ search }} />
          ) : (
            <Trans id='All products' />
          )}
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
        <ProductListItems items={products.items} loadingEager={6} title={`Search ${search}`} />
        <ProductListPagination page_info={page_info} params={params} />
      </Container>
    </ProductFiltersPro>
  )
}

function SearchFiltersLayoutClassic(props: SearchFilterLayoutProps) {
  const { filters, filterTypes, params, products } = props

  if (!(params && products?.items && filterTypes)) return null
  const { total_count, sort_fields, page_info } = products
  const search = `${params.search}`

  return (
    <>
      <LayoutHeader floatingMd switchPoint={0}>
        <SearchForm
          search={search}
          textFieldProps={{
            variant: 'outlined',
            autoComplete: 'off',
            size: 'small',
            placeholder: i18n._(/* i18n*/ `Search all products...`),
            sx: { width: '81vw' },
          }}
        />
      </LayoutHeader>
      <LayoutTitle gutterTop variant='h1' sx={{ alignItems: { xs: 'center', md: 'center' } }}>
        Search {params.search}
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
        <ProductListItems items={products.items} loadingEager={6} title={`Search ${search}`} />
        <ProductListPagination page_info={page_info} params={params} />
      </Container>
    </>
  )
}

export function SearchFilterLayout(props: SearchFilterLayoutProps) {
  const { mask, ...rest } = useProductList(props)

  return (
    <SignedInMaskProvider mask={mask}>
      {import.meta.graphCommerce.productFiltersPro &&
        import.meta.graphCommerce.productFiltersLayout === 'SIDEBAR' && (
          <SearchFilterLayoutSidebar {...rest} />
        )}
      {import.meta.graphCommerce.productFiltersPro &&
        import.meta.graphCommerce.productFiltersLayout !== 'SIDEBAR' && (
          <SearchFilterLayoutDefault {...rest} />
        )}
      {!import.meta.graphCommerce.productFiltersPro && <SearchFiltersLayoutClassic {...rest} />}
    </SignedInMaskProvider>
  )
}
