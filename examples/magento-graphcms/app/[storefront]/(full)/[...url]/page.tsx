import { getCategoryPage } from '@graphcommerce/magento-category/server'
import {
  ProductFiltersPro,
  ProductListFiltersContainer,
  ProductFiltersProFilterChips,
  ProductFiltersProSortChip,
  ProductFiltersProLimitChip,
  ProductFiltersProAllFiltersChip,
  ProductListParamsProvider,
  ProductListSort,
  ProductListFilters,
  ProductListCount,
  ProductListItems,
  ProductListPagination,
} from '@graphcommerce/magento-product'
import { getProductListFilters, getProductListItems } from '@graphcommerce/magento-product/server'
import { StickyBelowHeader } from '@graphcommerce/next-ui'
import { setConfigContext } from '@graphcommerce/next-ui/server'
import { Container } from '@mui/material'
import { CategoryPageDocument } from '../../../../graphql/CategoryPage.gql'
import { PageProps } from '../../types'

export default async (props: PageProps) => {
  const { params } = props
  setConfigContext(props)

  const categoryPage = getCategoryPage(CategoryPageDocument, props)
  const category = await categoryPage.category
  const isLanding = category?.display_mode === 'PAGE'
  const isCategory = params && category && (await categoryPage.filterTypes)

  if (!isCategory || isLanding) return null

  const listItems = getProductListItems(categoryPage.params)
  const filters = getProductListFilters(categoryPage.params)

  return (
    <>
      {isCategory && !isLanding && (
        <>
          <StickyBelowHeader>
            {import.meta.graphCommerce.productFiltersPro ? (
              <ProductFiltersPro params={await categoryPage.params}>
                <ProductListFiltersContainer>
                  <ProductFiltersProFilterChips
                    {...(await filters).data.filters}
                    appliedAggregations={(await listItems).data.products?.aggregations}
                    filterTypes={await categoryPage.filterTypes}
                  />
                  <ProductFiltersProSortChip {...(await listItems).data.products} />
                  <ProductFiltersProLimitChip />
                  <ProductFiltersProAllFiltersChip
                    {...(await listItems).data.products}
                    {...(await filters).data.filters}
                    appliedAggregations={(await listItems).data.products?.aggregations}
                    filterTypes={await categoryPage.filterTypes}
                  />
                </ProductListFiltersContainer>
              </ProductFiltersPro>
            ) : (
              <ProductListParamsProvider value={await categoryPage.params}>
                <ProductListFiltersContainer>
                  <ProductListSort
                    sort_fields={(await listItems).data.products?.sort_fields}
                    total_count={(await listItems).data.products?.total_count}
                  />
                  <ProductListFilters
                    {...(await filters).data.filters}
                    filterTypes={await categoryPage.filterTypes}
                  />
                </ProductListFiltersContainer>
              </ProductListParamsProvider>
            )}
          </StickyBelowHeader>
          <Container maxWidth={false}>
            <ProductListCount total_count={(await listItems).data.products?.total_count} />
            <ProductListItems
              title={category.name ?? ''}
              items={(await listItems).data.products?.items}
              loadingEager={1}
            />
            <ProductListPagination
              page_info={(await listItems).data.products?.page_info}
              params={await categoryPage.params}
            />
          </Container>
        </>
      )}
    </>
  )
}
