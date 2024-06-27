import {
  CategoryBreadcrumbs,
  CategoryChildren,
  CategoryDescription,
} from '@graphcommerce/magento-category'
import {
  CategoryDefaultFragment,
  FilterTypes,
  ProductFiltersPro,
  ProductFiltersProAggregations,
  ProductFiltersProAllFiltersChip,
  ProductFiltersProCategorySection,
  ProductFiltersProClearAll,
  ProductFiltersProLimitChip,
  ProductFiltersProLimitSection,
  ProductFiltersProNoResults,
  ProductFiltersProSortChip,
  ProductFiltersProSortSection,
  ProductFiltersQuery,
  ProductListCount,
  ProductListFilters,
  ProductListFiltersContainer,
  ProductListPagination,
  ProductListParams,
  ProductListParamsProvider,
  ProductListQuery,
  ProductListSort,
  productFiltersProChipRenderer,
  productFiltersProSectionRenderer,
} from '@graphcommerce/magento-product'
import { LayoutTitle, StickyBelowHeader, responsiveVal } from '@graphcommerce/next-ui'
import { Box, Container, Typography } from '@mui/material'
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
  }

function CategoryFilterLayoutSidebar(props: ProductListFilterLayoutProps) {
  const { id, filters, filterTypes, params, products, title, category } = props

  if (!params || !products?.items || !filterTypes || !category) return null
  const { total_count, sort_fields, page_info } = products

  const sidebarWidth = responsiveVal(200, 350, 960, 1920)

  return (
    <ProductFiltersPro
      key={id}
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
          <Typography variant='h1'>{title}</Typography>

          <CategoryDescription
            textAlignMd='start'
            textAlignSm='start'
            description={category?.description}
          />

          <CategoryChildren
            sx={(theme) => ({
              display: { xs: 'grid', md: 'none' },
              justifyContent: 'start',
              '& .CategoryChildren-scroller': {
                px: theme.page.horizontal,
                mx: `calc(${theme.page.horizontal} * -1)`,
              },
            })}
            params={params}
          >
            {category?.children}
          </CategoryChildren>
        </Box>

        <ProductListCount
          total_count={total_count}
          sx={{ gridArea: 'count', width: '100%', my: 0, height: '1em' }}
        />

        <Box sx={{ gridArea: 'items' }}>
          {products.items.length <= 0 ? (
            <ProductFiltersProNoResults />
          ) : (
            <ProductListItems
              items={products.items}
              loadingEager={6}
              title={title}
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
        </StickyBelowHeader>

        <Box sx={{ gridArea: 'sidebar', display: { xs: 'none', md: 'block' } }}>
          <ProductFiltersProClearAll
            sx={{ display: { xs: 'none', md: 'block' }, alignSelf: 'center' }}
          />
          <ProductFiltersProCategorySection category={category} params={params} hideTitle />
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
}

function CategoryFilterLayoutDefault(props: ProductListFilterLayoutProps) {
  const { id, filters, filterTypes, params, products, title, category } = props

  if (!(params && products?.items && filterTypes)) return null
  const { total_count, sort_fields, page_info } = products

  return (
    <ProductFiltersPro
      key={id}
      params={params}
      aggregations={filters?.aggregations}
      appliedAggregations={products?.aggregations}
      filterTypes={filterTypes}
    >
      {import.meta.graphCommerce.breadcrumbs && (
        <CategoryBreadcrumbs
          category={category}
          sx={(theme) => ({
            height: 0,
            mx: theme.page.horizontal,
            [theme.breakpoints.down('md')]: {
              '& .MuiBreadcrumbs-ol': { justifyContent: 'center' },
            },
          })}
        />
      )}

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
        <CategoryDescription
          textAlignMd='center'
          textAlignSm='center'
          sx={(theme) => ({ px: theme.page.horizontal })}
          description={category?.description}
        />
        <CategoryChildren
          sx={(theme) => ({
            justifyContent: 'center',
            '& .CategoryChildren-scroller': { px: theme.page.horizontal },
          })}
          params={params}
        >
          {category?.children}
        </CategoryChildren>
      </Box>
      <StickyBelowHeader>
        <ProductListFiltersContainer>
          <ProductFiltersProAggregations renderer={productFiltersProChipRenderer} />
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
      </StickyBelowHeader>

      <Container maxWidth={false}>
        <ProductListCount total_count={total_count} />
        <ProductListItems items={products.items} loadingEager={6} title={title} />
        <ProductListPagination page_info={page_info} params={params} />
      </Container>
    </ProductFiltersPro>
  )
}

function CategoryFilterLayoutClassic(props: ProductListFilterLayoutProps) {
  const { id, filters, filterTypes, params, products, title, category } = props

  if (!(params && products?.items && filterTypes)) return null
  const { total_count, sort_fields, page_info } = products

  return (
    <>
      {import.meta.graphCommerce.breadcrumbs && (
        <CategoryBreadcrumbs
          category={category}
          sx={(theme) => ({ mx: theme.page.horizontal, mb: theme.spacings.md })}
        />
      )}
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
      <CategoryDescription
        sx={(theme) => ({ textAlign: 'center', mb: theme.spacings.sm })}
        description={category?.description}
      />
      <CategoryChildren
        params={params}
        sx={(theme) => ({ justifyContent: 'center', mb: theme.spacings.sm })}
      >
        {category?.children}
      </CategoryChildren>
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

export function CategoryFilterLayout(props: ProductListFilterLayoutProps) {
  if (import.meta.graphCommerce.productFiltersPro) {
    if (import.meta.graphCommerce.productFiltersLayout === 'SIDEBAR')
      return <CategoryFilterLayoutSidebar {...props} />

    return <CategoryFilterLayoutDefault {...props} />
  }

  if (!import.meta.graphCommerce.productFiltersPro) {
    return <CategoryFilterLayoutClassic {...props} />
  }

  return null
}
