import {
  CategoryBreadcrumbs,
  CategoryDescription,
  CategoryChildren,
} from '@graphcommerce/magento-category'
import {
  ProductListParamsProvider,
  ProductListFiltersContainer,
  ProductListSort,
  ProductListFilters,
  ProductListCount,
  ProductListPagination,
} from '@graphcommerce/magento-product'
import { LayoutTitle, memoDeep, StickyBelowHeader, Container } from '@graphcommerce/next-ui'
import { ProductListItems } from '../ProductListItems'
import { ProductListLayoutProps } from './types'
import { Trans } from '@lingui/macro'

export const ProductListLayoutClassic = memoDeep(function ProductListLayoutClassic(
  props: ProductListLayoutProps,
) {
  const { filters, filterTypes, params, products, title, category } = props

  if (!(params && products?.items && filterTypes)) return null
  const { total_count, sort_fields, page_info } = products

  return (
    <>
      {import.meta.graphCommerce.breadcrumbs && category && (
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
            })}
            gutterBottom={!category?.description && category?.children?.length === 0}
          >
            {title}
          </LayoutTitle>
          <CategoryDescription
            sx={(theme) => ({ textAlign: 'center', mb: theme.spacings.sm })}
            category={category}
          />
          <CategoryChildren
            params={params}
            sx={(theme) => ({ justifyContent: 'center', mb: theme.spacings.sm })}
          >
            {category?.children}
          </CategoryChildren>
        </>
      ) : (
        <LayoutTitle gutterTop variant='h1'>
          <Trans>Search</Trans> {params.search}
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
