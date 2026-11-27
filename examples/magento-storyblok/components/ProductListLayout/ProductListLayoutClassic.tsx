import {
  CategoryBreadcrumbs,
  CategoryChildren,
  CategoryDescription,
} from '@graphcommerce/magento-category'
import {
  ProductListCount,
  ProductListFilters,
  ProductListFiltersContainer,
  ProductListPagination,
  ProductListParamsProvider,
  ProductListSort,
} from '@graphcommerce/magento-product'
import { breadcrumbs } from '@graphcommerce/next-config/config'
import { Container, LayoutTitle, memoDeep, StickyBelowHeader } from '@graphcommerce/next-ui'
import { ProductListItems, productListRenderer } from '../ProductListItems'
import type { ProductListLayoutProps } from './types'

export const ProductListLayoutClassic = memoDeep(function ProductListLayoutClassic(
  props: ProductListLayoutProps,
) {
  const { filters, filterTypes, params, products, title, category } = props

  if (!(params && products?.items && filterTypes)) return null
  const { total_count, sort_fields, page_info } = products

  return (
    <>
      {breadcrumbs && category && (
        <Container maxWidth={false}>
          <CategoryBreadcrumbs
            category={category}
            sx={(theme) => ({ mx: theme.page.horizontal, mb: theme.spacings.md })}
          />
        </Container>
      )}

      {category ? (
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
          <CategoryDescription
            sx={(theme) => ({ textAlign: 'center', mb: theme.spacings.sm })}
            category={category}
            productListRenderer={productListRenderer}
          />
          <CategoryChildren
            params={params}
            sx={(theme) => ({ justifyContent: 'center', mb: theme.spacings.sm })}
          >
            {category?.children}
          </CategoryChildren>
        </>
      ) : (
        <LayoutTitle gutterTop variant='h1' sx={{ alignItems: { xs: 'center', md: 'center' } }}>
          Search {params.search}
        </LayoutTitle>
      )}
      <StickyBelowHeader>
        <ProductListParamsProvider value={params}>
          <ProductListFiltersContainer>
            <ProductListSort sort_fields={sort_fields} total_count={total_count} />
            <ProductListFilters aggregations={filters?.aggregations} filterTypes={filterTypes} />
          </ProductListFiltersContainer>
        </ProductListParamsProvider>
      </StickyBelowHeader>
      <Container maxWidth={false}>
        <ProductListCount total_count={total_count} />
        <ProductListItems
          {...products}
          loadingEager={6}
          title={(params.search ? `Search ${params.search}` : title) ?? ''}
        />
        <ProductListPagination page_info={page_info} params={params} />
      </Container>
    </>
  )
})
