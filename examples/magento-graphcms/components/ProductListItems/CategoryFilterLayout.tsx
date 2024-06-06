import {
  CategoryBreadcrumbs,
  CategoryChildren,
  CategoryDescription,
} from '@graphcommerce/magento-category'
import {
  CategoryDefaultFragment,
  FilterTypes,
  ProductFiltersPro,
  ProductFiltersProAllFiltersChip,
  ProductFiltersProAllFiltersSidebar,
  ProductFiltersProClearAll,
  ProductFiltersProFilterChips,
  ProductFiltersProLayoutSidebar,
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
        sx={(theme) => ({ mx: theme.page.horizontal, mb: theme.spacings.md })}
      />
      <ProductFiltersProLayoutSidebar
        clearAll={<ProductFiltersProClearAll />}
        horizontalFilters={
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
        }
        sidebarFilters={
          <ProductFiltersProAllFiltersSidebar
            total_count={total_count}
            sort_fields={sort_fields}
            category={category}
            {...props}
          />
        }
        count={<ProductListCount total_count={total_count} sx={{ width: 'unset' }} />}
        pagination={<ProductListPagination page_info={page_info} params={params} />}
        items={<ProductListItems items={products.items} loadingEager={6} title={title} />}
      >
        <Box
          sx={(theme) => ({
            display: 'grid',
            rowGap: theme.spacings.sm,
            gridTemplateColumns: 'minmax(0, 1fr)',
          })}
        >
          <Typography variant='h1'>{title}</Typography>
          <CategoryDescription
            textAlignMd='start'
            textAlignSm='start'
            description={category?.description}
          />
          <CategoryChildren sx={{ justifyContent: 'start' }} params={params}>
            {category?.children}
          </CategoryChildren>
        </Box>
      </ProductFiltersProLayoutSidebar>
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
