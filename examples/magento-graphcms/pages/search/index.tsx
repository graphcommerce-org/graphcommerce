import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  ProductFiltersPro,
  ProductFiltersProFilterChips,
  ProductFiltersProSortChip,
  ProductListFiltersContainer,
  ProductListParamsProvider,
  ProductListDocument,
  extractUrlQuery,
  parseParams,
  FilterTypes,
  ProductListParams,
  getFilterTypes,
  ProductFiltersDocument,
  ProductListQuery,
  ProductFiltersQuery,
  ProductFiltersProAllFiltersChip,
  ProductFiltersProLimitChip,
  AddProductsToCartForm,
  ProductFiltersProAllFiltersSidebar,
} from '@graphcommerce/magento-product'
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
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  StickyBelowHeader,
  GetStaticProps,
  LayoutTitle,
  LayoutHeader,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Container, Hidden } from '@mui/material'
import { LayoutNavigation, LayoutNavigationProps, productListRenderer } from '../../components'
import { LayoutDocument } from '../../components/Layout/Layout.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

type SearchResultProps = ProductListQuery &
  ProductFiltersQuery &
  CategorySearchQuery & { filterTypes: FilterTypes; params: ProductListParams }
type RouteProps = { url: string[] }
export type GetPageStaticProps = GetStaticProps<
  LayoutNavigationProps,
  SearchResultProps,
  RouteProps
>

function SearchResultPage(props: SearchResultProps) {
  const { products, categories, params, filters, filterTypes } = props
  const search = params.url.split('/')[1]
  const totalSearchResults = (categories?.items?.length ?? 0) + (products?.total_count ?? 0)
  const noSearchResults = search && (!products || (products.items && products?.items?.length <= 0))

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
            {import.meta.graphCommerce.productFiltersPro ? (
              <>
                {import.meta.graphCommerce.productFiltersLayout === 'SIDEBAR' ? (
                  <ProductFiltersPro params={params}>
                    <StickyBelowHeader sx={{ display: { xs: 'block', md: 'none' } }}>
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
                    </StickyBelowHeader>
                    <Container
                      maxWidth={false}
                      sx={(theme) => ({
                        display: 'grid',
                        gridTemplate: {
                          xs: `
            "count"      auto
            "items"      1fr
            "pagination" auto
            `,
                          md: `
            "sidebar count"      auto
            "sidebar items"      1fr
            "sidebar pagination" auto
            /300px   auto
            `,
                        },
                        columnGap: theme.spacings.md,
                      })}
                    >
                      <Box sx={{ gridArea: 'sidebar', display: { xs: 'none', md: 'block' } }}>
                        <ProductFiltersProAllFiltersSidebar
                          {...products}
                          {...filters}
                          appliedAggregations={products?.aggregations}
                          filterTypes={filterTypes}
                        />
                      </Box>
                      <ProductListCountSearch
                        total_count={products?.total_count}
                        sx={() => ({
                          gridArea: 'count',
                          mt: { md: 0 },
                          width: '100%',
                        })}
                      />

                      <AddProductsToCartForm>
                        <ProductListItemsSearch
                          sx={{
                            gridArea: 'items',
                            gridTemplateColumns: { xs: `1fr 1fr`, lg: `1fr 1fr 1fr` },
                          }}
                          renderers={productListRenderer}
                          title={`Search ${search}`}
                          items={products?.items}
                          loadingEager={1}
                        />
                      </AddProductsToCartForm>
                      <ProductListPaginationSearch
                        page_info={products?.page_info}
                        params={params}
                        sx={{ gridArea: 'pagination' }}
                      />
                    </Container>
                  </ProductFiltersPro>
                ) : (
                  <>
                    <ProductFiltersPro params={params}>
                      <StickyBelowHeader>
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
                      </StickyBelowHeader>
                    </ProductFiltersPro>
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
                      <ProductListPaginationSearch
                        page_info={products?.page_info}
                        params={params}
                      />
                    </Container>
                  </>
                )}
              </>
            ) : (
              <>
                <StickyBelowHeader>
                  <ProductListParamsProvider value={params}>
                    <ProductListFiltersContainer>
                      <ProductListSortSearch
                        sort_fields={products?.sort_fields}
                        total_count={products?.total_count}
                      />
                      <ProductListFiltersSearch {...filters} filterTypes={filterTypes} />
                    </ProductListFiltersContainer>
                  </ProductListParamsProvider>
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

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const [searchShort = '', query = []] = extractUrlQuery(params)
  const search = searchShort.length >= 3 ? searchShort : ''

  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const filterTypes = getFilterTypes(client)

  const staticClient = graphqlSsrClient(locale)
  const layout = staticClient.query({ query: LayoutDocument })

  const productListParams = parseParams(
    search ? `search/${search}` : 'search',
    query,
    await filterTypes,
    search,
  )

  if (!productListParams) return { notFound: true, revalidate: 60 * 20 }

  const filters = staticClient.query({ query: ProductFiltersDocument, variables: { search } })

  const products = staticClient.query({
    query: ProductListDocument,
    variables: { ...productListParams, search, pageSize: 12 },
  })

  const categories = search
    ? staticClient.query({ query: CategorySearchDocument, variables: { search } })
    : undefined

  return {
    props: {
      ...(await products).data,
      ...(await filters).data,
      ...(await categories)?.data,
      ...(await layout)?.data,
      filterTypes: await filterTypes,
      params: productListParams,
      up: { href: '/', title: 'Home' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
