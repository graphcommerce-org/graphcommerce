import {
  CategoryBreadcrumbs,
  CategoryChildren,
  CategoryDescription,
} from '@graphcommerce/magento-category'
import {
  ProductFiltersPro,
  ProductFiltersProAggregations,
  ProductFiltersProAllFiltersChip,
  productFiltersProChipRenderer,
  ProductFiltersProLimitChip,
  ProductFiltersProNoResults,
  ProductFiltersProSortChip,
  ProductListCount,
  ProductListFiltersContainer,
  ProductListPagination,
  ProductListSuggestions,
} from '@graphcommerce/magento-product'
import { ProductFiltersProSearchTerm } from '@graphcommerce/magento-search'
import { Container, LayoutTitle, memoDeep, StickyBelowHeader } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Typography } from '@mui/material'
import { ProductListItems } from '../ProductListItems'
import { ProductListLayoutProps, useLayoutConfiguration } from './types'

export const ProductListLayoutDefault = memoDeep((props: ProductListLayoutProps) => {
  const { id, filters, filterTypes, params, products, title, category, handleSubmit } = props

  if (!(params && products?.items && filterTypes)) return null
  const { total_count, sort_fields, page_info } = products

  const configuration = useLayoutConfiguration(false)

  return (
    <ProductFiltersPro
      key={id}
      params={params}
      aggregations={filters?.aggregations}
      appliedAggregations={products?.aggregations}
      filterTypes={filterTypes}
      handleSubmit={handleSubmit}
    >
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
        {import.meta.graphCommerce.breadcrumbs && category && (
          <CategoryBreadcrumbs
            category={category}
            sx={(theme) => ({
              height: 0,
              [theme.breakpoints.down('md')]: {
                '& .MuiBreadcrumbs-ol': { justifyContent: 'center' },
              },
            })}
          />
        )}

        {category ? (
          <>
            <LayoutTitle gutterTop variant='h1' gutterBottom={false}>
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
          </>
        ) : (
          <>
            <Typography
              variant='h1'
              sx={(theme) => ({
                mt: { xs: theme.spacings.sm, md: 0 },
                typography: { xs: 'h3', md: 'h3' },
              })}
            >
              <ProductFiltersProSearchTerm params={params}>
                <Trans>All products</Trans>
              </ProductFiltersProSearchTerm>
            </Typography>
            <ProductListSuggestions products={products} />
          </>
        )}
      </Container>

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
        {products.items.length <= 0 ? (
          <ProductFiltersProNoResults />
        ) : (
          <ProductListItems
            {...products}
            loadingEager={6}
            title={(params.search ? `Search ${params.search}` : title) ?? ''}
            columns={configuration.columns}
          />
        )}
        <ProductListPagination page_info={page_info} params={params} />
      </Container>
    </ProductFiltersPro>
  )
})
