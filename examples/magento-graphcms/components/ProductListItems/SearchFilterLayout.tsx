import { useApolloClient, useQuery } from '@apollo/client'
import { MenuQueryFragment } from '@graphcommerce/magento-category'
import { SignedInMaskProvider } from '@graphcommerce/magento-customer'
import {
  FilterTypes,
  ProductListDocument,
  ProductListParams,
  toProductListParams,
  useProductFiltersPro,
  useRouterFilterParams,
} from '@graphcommerce/magento-product'
import {
  NoSearchResults,
  ProductFiltersPro,
  ProductFiltersProAggregations,
  ProductFiltersProAllFiltersChip,
  ProductFiltersProCategorySectionSearch,
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
  productListApplySearchDefaults,
  useProductList,
} from '@graphcommerce/magento-search'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { LayoutHeader, LayoutTitle, StickyBelowHeader, responsiveVal } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Container } from '@mui/material'
import { ProductListFilterLayoutProps } from './CategoryFilterLayout'
import { ProductListItems } from './ProductListItems'
import { useWatch } from 'react-hook-form'

type SearchFilterLayoutProps = Omit<ProductListFilterLayoutProps, 'category' | 'id' | 'title'> &
  MenuQueryFragment

// Ook al heb je een trage API, wil je alsnop zo snel mogelijk changes zien.
// Je wil bij alle submits een request afvuren.
// We willen alle results gebruiken die 'achter' lopen.

// Form submission -> URL will be changed -> useQuery will be updated.

// Als een request klaar is wil je alle voorgaande requests cancellen (of in ieder geval de resultaten negeren).

/**
 * 1. Je vult iets in in een search field.
 * 2. Door FormAutoSubmit wordt de submit function aangeroepen en daarmee de handleSubmit callback van ProductFiltersPro
 *    - FormAutoSubmit wacht niet op de loading state van het formulier, maar throttled wel. (de parallel prop)
 * 3. Hierin voer je GraphQL Query uit voor die search term.
 *
 */

// Server params
// Shallow URL Params
// Form params

const productListQueries: Array<Promise<unknown>> = []

type CurrentSearchProps = { params: ProductListParams }

function CurrentSearch(props: CurrentSearchProps) {
  const { params } = props
  const { form } = useProductFiltersPro()
  const resultSearch = params.search ?? ''
  const targetSearch = useWatch({ control: form.control, name: 'search' }) ?? ''

  const remaining = targetSearch.startsWith(resultSearch)
    ? targetSearch.slice(resultSearch.length)
    : ''

  return (
    <>
      , searching for{' '}
      <Box component='span' sx={{}}>
        {resultSearch}
      </Box>
      <Box component='span' sx={{ textDecoration: 'underline' }}>
        {remaining}
      </Box>
    </>
  )
}

function SearchFilterLayoutSidebar(props: SearchFilterLayoutProps) {
  const { filters, filterTypes, params, products, menu } = props
  const client = useApolloClient()

  const storeConfig = useQuery(StoreConfigDocument).data

  if (!params || !products?.items || !filterTypes) return null
  const { total_count, sort_fields, page_info } = products

  const search = `${params.search}`
  const totalSearchResults =
    // (categories?.items?.length ?? 0) +
    products?.total_count ?? 0

  const sidebarWidth = responsiveVal(200, 350, 960, 1920)

  return (
    <ProductFiltersPro
      params={params}
      aggregations={filters?.aggregations}
      appliedAggregations={products?.aggregations}
      filterTypes={filterTypes}
      autoSubmitMd
      handleSubmit={async (filterParams, next) => {
        if (!storeConfig) return

        const variables = productListApplySearchDefaults(
          toProductListParams(filterParams),
          storeConfig,
        )

        const promise = client.query({ query: ProductListDocument, variables })

        // Push the query to the queue array.
        productListQueries.push(promise)

        await promise

        // If the current request is still in the array, it may be rendered (URL may be updated)
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        if (productListQueries.includes(promise)) next()

        // Remove all requests that are before the current request
        const index = productListQueries.indexOf(promise)
        if (index > -1) {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          productListQueries.splice(0, index + 1)
        }
      }}
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
        >
          <CurrentSearch params={params} />
        </ProductListCount>

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
                  xl: { totalWidth: totalWidth('xxl'), count: 5 },
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
          <ProductFiltersProCategorySectionSearch menu={menu} hideTitle />
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
