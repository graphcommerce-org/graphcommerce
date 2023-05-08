import { PageOptions } from '@graphcommerce/framer-next-pages'
import { deepAwait, DeepAwait, graphqlQuery } from '@graphcommerce/graphql-mesh'
import {
  ProductFiltersPro,
  ProductFiltersProFilterChips,
  ProductFiltersProSortChip,
  ProductListFiltersContainer,
  ProductListParamsProvider,
  ProductFiltersProAllFiltersChip,
  ProductFiltersProLimitChip,
  AddProductsToCartForm,
} from '@graphcommerce/magento-product'
import { getProductList, ProductListingResult } from '@graphcommerce/magento-product/server'
import {
  CategorySearchDocument,
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
  getSearchContext,
  searchResults,
  SearchPageProps,
  GetSearchContextReturn,
} from '@graphcommerce/magento-search/server'
import { PageMeta } from '@graphcommerce/magento-store'
import {
  StickyBelowHeader,
  LayoutTitle,
  LayoutHeader,
  GetStaticProps,
} from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container, Hidden } from '@mui/material'
import { LayoutNavigation, LayoutNavigationProps, productListRenderer } from '../../components'
import { LayoutDocument, LayoutQuery } from '../../components/Layout/Layout.gql'

export type SearchResultProps = DeepAwait<GetSearchContextReturn> &
  DeepAwait<ProductListingResult> &
  CategorySearchQuery
export type RouteProps = { url: string[] }
type GetPageStaticProps = GetStaticProps<LayoutQuery, SearchResultProps, RouteProps>

function SearchResultPage(props: SearchResultProps) {
  const { products, categories, filters, productListContext } = props
  const { params, filterTypes } = productListContext
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
        <Hidden implementation='css' mdDown>
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
        </Hidden>

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

export const getStaticProps: GetPageStaticProps = enhanceStaticProps(async (context) => {
  const layout = graphqlQuery(LayoutDocument, { fetchPolicy: 'cache-first' })
  const searchContext = await getSearchContext(context)
  const result = getProductList(searchContext.productListContext)

  const categories = searchContext.productListContext.params.search
    ? graphqlQuery(CategorySearchDocument, {
        variables: { search: searchContext.productListContext.params.search },
      })
    : undefined

  if (await result.errors) return { notFound: true, revalidate: 60 * 20 }

  return {
    props: await deepAwait({
      ...searchContext,
      ...(await categories)?.data,
      ...(await layout).data,
      ...result,
      up: { href: '/', title: 'Home' },
    }),
    revalidate: 60 * 20,
  }
})
