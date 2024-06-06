import {
  CategoryBreadcrumbs,
  CategoryChildren,
  CategoryDescription,
} from '@graphcommerce/magento-category'
import {
  CategoryDefaultFragment,
  FilterTypes,
  ProductFilterEqualSection,
  ProductFilterRangeSection,
  ProductFiltersPro,
  ProductFiltersProAggregations,
  ProductFiltersProAllFiltersChip,
  ProductFiltersProCategorySection,
  ProductFiltersProClearAll,
  ProductFiltersProFilterChips,
  ProductFiltersProLimitChip,
  ProductFiltersProLimitSection,
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
} from '@graphcommerce/magento-product'
import { LayoutTitle, StickyBelowHeader } from '@graphcommerce/next-ui'
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
    description?: React.ReactNode
  }

function CategoryFilterLayoutSidebar(props: ProductListFilterLayoutProps) {
  const { id, filters, filterTypes, params, products, title, category } = props

  if (!params || !products?.items || !filterTypes || !category) return null
  const { total_count, sort_fields, page_info } = products

  return (
    <ProductFiltersPro
      key={id}
      params={params}
      aggregations={filters?.aggregations}
      appliedAggregations={products?.aggregations}
      filterTypes={filterTypes}
      autoSubmitMd
    >
      <CategoryBreadcrumbs
        category={category}
        sx={(theme) => ({ mx: theme.page.horizontal, mb: theme.spacings.md })}
      />

      <Container
        maxWidth={false}
        sx={(theme) => ({
          display: 'grid',
          alignItems: 'start',
          gap: theme.spacings.md,

          [theme.breakpoints.down('md')]: {
            gridTemplate: `
              "title"
              "horizontalFilters"
              "count"
              "items"
              "pagination"
            `,
          },

          [theme.breakpoints.up('md')]: {
            gridTemplate: `
              "sidebar title"      auto
              "sidebar count"      auto
              "sidebar items"      auto
              "sidebar pagination" 1fr
              
              /300px   auto
            `,
          },
          [theme.breakpoints.up('xl')]: {
            columnGap: theme.spacings.xxl,
          },
        })}
      >
        <Box className='sidebar' sx={{ gridArea: 'sidebar', display: { xs: 'none', md: 'block' } }}>
          <ProductFiltersProClearAll
            sx={{ display: { xs: 'none', md: 'block' }, alignSelf: 'center' }}
          />
          <ProductFiltersProCategorySection
            category={category}
            params={params}
            hideTitle
            // sx={{ mb: 2 }}
          />
          <ProductFiltersProSortSection
            sort_fields={sort_fields}
            total_count={total_count}
            category={category}
          />
          <ProductFiltersProLimitSection />
          <ProductFiltersProAggregations
            renderer={{
              FilterRangeTypeInput: ProductFilterRangeSection,
              FilterEqualTypeInput: ProductFilterEqualSection,
            }}
          />
        </Box>

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
          {category?.description && (
            <CategoryDescription
              textAlignMd='start'
              textAlignSm='start'
              description={category?.description}
            />
          )}
          {category?.children && (
            <CategoryChildren
              sx={(theme) => ({
                justifyContent: 'start',
                display: { xs: 'block', md: 'none' },
                '& .CategoryChildren-scroller': {
                  px: theme.page.horizontal,
                  mx: `calc(${theme.page.horizontal} * -1)`,
                },
              })}
              params={params}
            >
              {category?.children}
            </CategoryChildren>
          )}
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
            <ProductFiltersProFilterChips />
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

        <ProductListCount
          total_count={total_count}
          sx={{ gridArea: 'count', width: '100%', my: 0, height: '1em' }}
        />

        <Box gridArea='items'>
          <ProductListItems items={products.items} loadingEager={6} title={title} />
        </Box>

        <ProductListPagination
          page_info={page_info}
          params={params}
          sx={{ gridArea: 'pagination', my: 0 }}
        />
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
          <ProductFiltersProFilterChips />
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

function CategoryFiltersLayoutClassic(props: ProductListFilterLayoutProps) {
  const { id, filters, filterTypes, params, products, title, category } = props

  if (!(params && products?.items && filterTypes)) return null
  const { total_count, sort_fields, page_info } = products

  return (
    <>
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
      <CategoryDescription sx={{ textAlign: 'center' }} description={category?.description} />
      <CategoryChildren params={params}>{category?.children}</CategoryChildren>
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
    return <CategoryFiltersLayoutClassic {...props} />
  }

  return null
}
