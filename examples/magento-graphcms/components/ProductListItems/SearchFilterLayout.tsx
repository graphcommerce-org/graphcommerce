import { MenuQueryFragment } from '@graphcommerce/magento-category'
import { SignedInMaskProvider } from '@graphcommerce/magento-customer'
import {
  ProductFiltersProLimitSection,
  ProductFiltersProSortSection,
  ProductListSuggestions,
} from '@graphcommerce/magento-product'
import {
  NoSearchResults,
  ProductFiltersPro,
  ProductFiltersProAggregations,
  ProductFiltersProAllFiltersChip,
  ProductFiltersProCategorySectionSearch,
  ProductFiltersProClearAll,
  ProductFiltersProLimitChip,
  ProductFiltersProSearchField,
  ProductFiltersProSearchTerm,
  ProductFiltersProSortChip,
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
import { LayoutHeader, LayoutTitle, StickyBelowHeader, responsiveVal } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/macro'
import { Box, Container, Typography } from '@mui/material'
import { ProductListFilterLayoutProps } from './CategoryFilterLayout'
import { ProductListItems } from './ProductListItems'

type SearchFilterLayoutProps = Omit<ProductListFilterLayoutProps, 'category' | 'id' | 'title'> &
  MenuQueryFragment

type LayoutProps = ReturnType<typeof useProductList<SearchFilterLayoutProps>>

function SearchFilterLayoutSidebar(props: LayoutProps) {
  const { filters, filterTypes, params, products, menu, handleSubmit } = props

  if (!params || !products?.items || !filterTypes) return null
  const { total_count, sort_fields, page_info } = products
  const search = `${params.search}`
  const sidebarWidth = responsiveVal(200, 350, 960, 1920)

  return (
    <ProductFiltersPro
      params={params}
      aggregations={filters?.aggregations}
      appliedAggregations={products?.aggregations}
      filterTypes={filterTypes}
      autoSubmitMd
      handleSubmit={handleSubmit}
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
              /${sidebarWidth}   auto
            `,
          },
        })}
      >
        <Box
          sx={(theme) => ({
            gridArea: 'search',
            display: 'grid',
            gridAutoFlow: 'row',
            rowGap: theme.spacings.xs,
          })}
        >
          <Typography variant='h2'>
            <ProductFiltersProSearchTerm params={params}>
              <Trans>All products</Trans>
            </ProductFiltersProSearchTerm>
          </Typography>
          <ProductListSuggestions products={products} />
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
            <ProductListItems
              items={products.items}
              loadingEager={6}
              title={`Search ${search}`}
              calcColumns={(theme) => {
                const totalWidth = (spacing: string) =>
                  `calc(100vw - (${theme.page.horizontal} * 2 + ${sidebarWidth} + ${theme.spacings[spacing]}))`
                return {
                  xs: { count: 2 },
                  md: { totalWidth: totalWidth('md'), count: 3 },
                  lg: { totalWidth: totalWidth('md'), count: 4 },
                }
              }}
            />
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
          <ProductFiltersProCategorySectionSearch menu={menu} defaultExpanded />
          <ProductFiltersProSortSection sort_fields={sort_fields} total_count={total_count} />
          <ProductFiltersProLimitSection />
          <ProductFiltersProAggregations renderer={productFiltersProSectionRenderer} />
        </Box>
      </Container>
    </ProductFiltersPro>
  )
}

function SearchFilterLayoutDefault(props: LayoutProps) {
  const { filters, filterTypes, params, products, handleSubmit } = props

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
      handleSubmit={handleSubmit}
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

      <Container
        maxWidth={false}
        sx={(theme) => ({
          display: 'grid',
          rowGap: theme.spacings.sm,
          mb: theme.spacings.sm,
          gridAutoFlow: 'row',
          justifyItems: { xs: 'left', md: 'center' },
        })}
      >
        <LayoutTitle
          gutterTop
          variant='h1'
          sx={{ display: { xs: 'none', md: 'block' } }}
          // sx={{ alignItems: { xs: 'left', md: 'center' } }}
          gutterBottom={false}
        >
          <ProductFiltersProSearchTerm params={params}>
            <Trans>All products</Trans>
          </ProductFiltersProSearchTerm>
        </LayoutTitle>
        <ProductListSuggestions products={products} />
      </Container>

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
        {products.items.length <= 0 ? (
          <NoSearchResults search={search} />
        ) : (
          <ProductListItems items={products.items} loadingEager={6} title={`Search ${search}`} />
        )}
        <ProductListPagination page_info={page_info} params={params} />
      </Container>
    </ProductFiltersPro>
  )
}

function SearchFiltersLayoutClassic(props: LayoutProps) {
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
  const productList = useProductList(props)

  return (
    <SignedInMaskProvider mask={productList.mask}>
      {import.meta.graphCommerce.productFiltersPro &&
        import.meta.graphCommerce.productFiltersLayout === 'SIDEBAR' && (
          <SearchFilterLayoutSidebar {...productList} />
        )}
      {import.meta.graphCommerce.productFiltersPro &&
        import.meta.graphCommerce.productFiltersLayout !== 'SIDEBAR' && (
          <SearchFilterLayoutDefault {...productList} />
        )}
      {!import.meta.graphCommerce.productFiltersPro && (
        <SearchFiltersLayoutClassic {...productList} />
      )}
    </SignedInMaskProvider>
  )
}
