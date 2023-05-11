import { PageOptions } from '@graphcommerce/framer-next-pages'
import { deepAwait, graphqlQuery } from '@graphcommerce/graphql-mesh'
import {
  ProductFiltersPro,
  ProductFiltersProFilterChips,
  ProductFiltersProSortChip,
  ProductListFiltersContainer,
  ProductListParamsProvider,
  ProductFiltersProAllFiltersChip,
  ProductFiltersProLimitChip,
  AddProductsToCartForm,
  ProductFiltersQuery,
  ProductListQuery,
} from '@graphcommerce/magento-product'
import { getProductListFilters, getProductListItems } from '@graphcommerce/magento-product/server'
import {
  CategorySearchQuery,
  CategorySearchResult,
  NoSearchResults,
  ProductListCountSearch,
  ProductListFiltersSearch,
  ProductListItemsSearch,
  ProductListPaginationSearch,
  ProductListSortSearch,
  SearchContext,
  SearchDivider,
  SearchForm,
} from '@graphcommerce/magento-search'
import {
  getSearchCategories,
  getSearchContext,
  ResolvedGetSearchContextReturn,
} from '@graphcommerce/magento-search/server'
import { PageMeta } from '@graphcommerce/magento-store'
import { StickyBelowHeader, LayoutTitle, LayoutHeader } from '@graphcommerce/next-ui'
import { enhanceStaticProps, notFound } from '@graphcommerce/next-ui/server'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Container } from '@mui/material'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { LayoutNavigation, LayoutNavigationProps, productListRenderer } from '../../components'
import { getLayout } from '../../components/Layout/layout'
import { LayoutDocument } from '../../components/Layout/Layout.gql'

export type SearchResultProps = ResolvedGetSearchContextReturn &
  CategorySearchQuery &
  ProductListQuery &
  ProductFiltersQuery

export type RouteProps = { url: string[] }

function SearchResultPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { products, categories, filters, params, filterTypes } = props

  const search = params.search ?? ''
  const totalSearchResults = (categories?.items?.length ?? 0) + (products?.total_count ?? 0)
  const noSearchResults = search && (products?.items?.length ?? 0) <= 0

  return (
    <>
      <PageMeta
        title={
          search
            ? i18n._(/* i18n */ 'Results for ‘{search}’', { search })
            : i18n._(/* i18n */ 'Search')
        }
        metaRobots={['noindex']}
        canonical='/search'
      />

      <SearchContext>
        <LayoutHeader floatingMd switchPoint={0}>
          <LayoutTitle size='small'>
            <SearchForm
              totalResults={totalSearchResults}
              search={search}
              textFieldProps={{ variant: 'standard' }}
            />
          </LayoutTitle>
        </LayoutHeader>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <LayoutTitle gutterBottom={false} gutterTop={false}>
            {search ? (
              <Trans id='Results for &lsquo;{search}&rsquo;' values={{ search }} />
            ) : (
              <Trans id='All products' />
            )}
          </LayoutTitle>

          <Container maxWidth='sm'>
            <SearchForm
              totalResults={totalSearchResults}
              search={search}
              textFieldProps={{ autoFocus: true }}
            />

            {categories?.items?.map((category) => (
              <CategorySearchResult key={category?.url_path} search={search} {...category} />
            ))}
          </Container>
          <SearchDivider />
        </Box>

        {noSearchResults && <NoSearchResults search={search} />}
        {products && products.items && products?.items?.length > 0 && (
          <>
            <StickyBelowHeader>
              {import.meta.graphCommerce.productFiltersPro ? (
                <ProductFiltersPro params={params}>
                  <ProductListFiltersContainer>
                    <ProductFiltersProFilterChips
                      {...filters}
                      appliedAggregations={products.aggregations}
                      filterTypes={filterTypes}
                    />
                    <ProductFiltersProSortChip {...products} />
                    <ProductFiltersProLimitChip />
                    <ProductFiltersProAllFiltersChip
                      {...products}
                      {...filters}
                      appliedAggregations={products.aggregations}
                      filterTypes={filterTypes}
                    />
                  </ProductListFiltersContainer>
                </ProductFiltersPro>
              ) : (
                <ProductListParamsProvider value={params}>
                  <ProductListFiltersContainer>
                    <ProductListSortSearch
                      sort_fields={products?.sort_fields}
                      total_count={products?.total_count}
                    />
                    <ProductListFiltersSearch {...filters} filterTypes={filterTypes} />
                  </ProductListFiltersContainer>
                </ProductListParamsProvider>
              )}
            </StickyBelowHeader>
            <Container maxWidth={false}>
              <ProductListCountSearch total_count={products?.total_count} />
              <AddProductsToCartForm>
                <ProductListItemsSearch
                  renderers={productListRenderer}
                  title={`Search ${search}`}
                  items={products?.items}
                  loadingEager={1}
                />
              </AddProductsToCartForm>
              <ProductListPaginationSearch page_info={products?.page_info} params={params} />
            </Container>
          </>
        )}
      </SearchContext>
    </>
  )
}

const pageOptions: PageOptions<LayoutNavigationProps> = {
  Layout: LayoutNavigation,
}

SearchResultPage.pageOptions = pageOptions

export default SearchResultPage

export const getStaticProps = enhanceStaticProps(getLayout, async (context) => {
  const layout = graphqlQuery(LayoutDocument, { fetchPolicy: 'cache-first' })
  const searchContext = getSearchContext(context)
  const listItems = getProductListItems(searchContext.params)
  const filters = getProductListFilters(searchContext.params)
  const searchCategories = getSearchCategories(searchContext.params)

  if ((await listItems).error) return notFound()

  return {
    props: await deepAwait({
      ...(await layout).data,
      ...searchContext,
      ...searchCategories,
      ...(await listItems).data,
      ...(await filters).data,
      up: { href: '/', title: 'Home' },
    }),
    revalidate: 60 * 20,
  }
})
