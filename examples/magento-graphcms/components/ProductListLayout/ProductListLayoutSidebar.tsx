import { CategoryDescription, CategoryBreadcrumbs } from '@graphcommerce/magento-category'
import {
  ProductFiltersPro,
  ProductListSuggestions,
  ProductListCount,
  ProductFiltersProNoResults,
  ProductListPagination,
  ProductListFiltersContainer,
  ProductFiltersProAggregations,
  productFiltersProChipRenderer,
  ProductFiltersProSortChip,
  ProductFiltersProLimitChip,
  ProductFiltersProAllFiltersChip,
  ProductFiltersProClearAll,
  ProductFiltersProCategorySection,
  ProductFiltersProSortSection,
  ProductFiltersProLimitSection,
  productFiltersProSectionRenderer,
} from '@graphcommerce/magento-product'
import {
  ProductFiltersProSearchTerm,
  ProductFiltersProCategorySectionSearch,
} from '@graphcommerce/magento-search'
import { memoDeep, responsiveVal, StickyBelowHeader } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Box, Container, Typography } from '@mui/material'
import { ProductListItems } from '../ProductListItems'
import { ProductListLayoutProps } from './types'

export const ProductListLayoutSidebar = memoDeep((props: ProductListLayoutProps) => {
  const {
    filters,
    filterTypes,
    params,
    products,
    handleSubmit,
    category,
    title,
    menu,
    maxWidth = false,
  } = props

  if (!params || !products?.items || !filterTypes) return null
  const { total_count, sort_fields, page_info } = products
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
      {import.meta.graphCommerce.breadcrumbs && category && (
        <CategoryBreadcrumbs
          category={category}
          sx={(theme) => ({
            mb: theme.spacings.sm,
            mx: theme.page.horizontal,
            [theme.breakpoints.down('md')]: {
              '& .MuiBreadcrumbs-ol': { justifyContent: 'center' },
            },
          })}
        />
      )}

      <Container
        maxWidth={maxWidth}
        sx={(theme) => ({
          display: 'grid',
          alignItems: 'start',
          rowGap: theme.spacings.md,
          columnGap: { xs: theme.spacings.md, xl: theme.spacings.xxl },
          mb: theme.spacings.xl,
          gridTemplate: {
            xs: `"title" "horizontalFilters" "count" "items" "pagination"`,
            md: `
              "sidebar title"      auto
              "sidebar count"      auto
              "sidebar items"      auto
              "sidebar pagination" 1fr
              /${sidebarWidth}   auto
            `,
          },
        })}
      >
        <Box
          className='title'
          sx={(theme) => ({
            gridArea: 'title',
            display: 'grid',
            gridAutoFlow: 'row',
            rowGap: theme.spacings.xs,
          })}
        >
          {category ? (
            <>
              <Typography variant='h1'>{title}</Typography>

              <CategoryDescription
                textAlignMd='start'
                textAlignSm='start'
                description={category?.description}
              />
            </>
          ) : (
            <>
              <Typography variant='h2'>
                <ProductFiltersProSearchTerm params={params}>
                  <Trans>All products</Trans>
                </ProductFiltersProSearchTerm>
              </Typography>
              <ProductListSuggestions products={products} />
            </>
          )}
        </Box>

        <ProductListCount
          total_count={total_count}
          sx={{ gridArea: 'count', width: '100%', my: 0, height: '1em' }}
        />

        <Box sx={{ gridArea: 'items' }}>
          {products.items.length <= 0 ? (
            <ProductFiltersProNoResults search={params.search} />
          ) : (
            <ProductListItems
              {...products}
              loadingEager={6}
              title={(params.search ? `Search ${params.search}` : title) ?? ''}
              columns={(theme) => {
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

        <StickyBelowHeader sx={{ gridArea: 'horizontalFilters', display: { md: 'none' } }}>
          <ProductListFiltersContainer
            sx={(theme) => ({
              '& .ProductListFiltersContainer-scroller': {
                px: theme.page.horizontal,
                mx: `calc(${theme.page.horizontal} * -1)`,
              },
            })}
          >
            <ProductFiltersProAggregations renderer={productFiltersProChipRenderer} />
            {products.items.length > 0 && (
              <>
                <ProductFiltersProSortChip
                  total_count={total_count}
                  sort_fields={sort_fields}
                  category={category}
                />
                <ProductFiltersProLimitChip />
              </>
            )}

            <ProductFiltersProAllFiltersChip
              total_count={total_count}
              sort_fields={sort_fields}
              category={category}
            />
          </ProductListFiltersContainer>
        </StickyBelowHeader>

        <Box
          sx={(theme) => ({
            gridArea: 'sidebar',
            display: { xs: 'none', md: 'block' },
            mt: import.meta.graphCommerce.breadcrumbs === true ? 0 : theme.spacings.lg,
          })}
        >
          <ProductFiltersProClearAll
            sx={{ display: { xs: 'none', md: 'block' }, alignSelf: 'center' }}
          />
          <>
            {category ? (
              <ProductFiltersProCategorySection
                category={category}
                params={params}
                hideBreadcrumbs
              />
            ) : (
              <ProductFiltersProCategorySectionSearch menu={menu} defaultExpanded />
            )}
          </>

          <ProductFiltersProSortSection
            sort_fields={sort_fields}
            total_count={total_count}
            category={category}
          />
          <ProductFiltersProLimitSection />

          <ProductFiltersProAggregations renderer={productFiltersProSectionRenderer} />
        </Box>
      </Container>
    </ProductFiltersPro>
  )
})
