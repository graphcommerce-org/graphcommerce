import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  extractUrlQuery,
  FilterTypes,
  getFilterTypes,
  parseParams,
  ProductFiltersDocument,
  ProductFiltersPro,
  ProductFiltersProAllFiltersChip,
  ProductFiltersProAllFiltersSidebar,
  ProductFiltersProFilterChips,
  ProductFiltersProLimitChip,
  ProductFiltersProSortChip,
  ProductFiltersQuery,
  ProductListCount,
  ProductListDocument,
  ProductListFilters,
  ProductListFiltersContainer,
  ProductListItems,
  ProductListPagination,
  ProductListParams,
  ProductListParamsProvider,
  ProductListQuery,
  ProductListSort,
} from '@graphcommerce/magento-product'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { StickyBelowHeader, LayoutTitle, LayoutHeader, LinkOrButton } from '@graphcommerce/next-ui'
import { GetStaticProps } from '@graphcommerce/next-ui/Page/types'
import { Box, Container, Typography } from '@mui/material'
import { GetStaticPaths } from 'next'
import { LayoutMinimal, LayoutMinimalProps } from '../../../components'
import { graphqlSsrClient, graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type Props = ProductListQuery &
  ProductFiltersQuery & { filterTypes: FilterTypes; params: ProductListParams }
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutMinimalProps, Props, RouteProps>

function MinimalLayoutSubheader(props: Props) {
  const { params, products, filters, filterTypes } = props

  return (
    <ProductListParamsProvider value={params}>
      <LayoutHeader
        primary={
          <LinkOrButton
            href='/test/minimal-page-shell'
            color='secondary'
            button={{ variant: 'pill' }}
          >
            Navigate
          </LinkOrButton>
        }
      >
        <Typography variant='h5' component='span'>
          Minimal UI
        </Typography>
      </LayoutHeader>
      <Container maxWidth='md' sx={{ height: '2000px' }}>
        <LayoutTitle>
          <Box textAlign='center' mb={3}>
            <Typography variant='h2' component='h2'>
              Minimal UI
            </Typography>
          </Box>
        </LayoutTitle>

        {import.meta.graphCommerce.productFiltersPro ? (
          <ProductFiltersPro
            params={params}
            chips={
              <ProductListFiltersContainer>
                <ProductFiltersProFilterChips
                  {...filters}
                  appliedAggregations={products?.aggregations}
                  filterTypes={filterTypes}
                />
                <ProductFiltersProSortChip {...products} />
                <ProductFiltersProLimitChip />
                <ProductFiltersProAllFiltersChip
                  {...products}
                  {...filters}
                  appliedAggregations={products?.aggregations}
                  filterTypes={filterTypes}
                />
              </ProductListFiltersContainer>
            }
            sidebar={
              import.meta.graphCommerce.productFiltersLayout === 'SIDEBAR' && (
                <ProductFiltersProAllFiltersSidebar
                  {...products}
                  {...filters}
                  appliedAggregations={products?.aggregations}
                  filterTypes={filterTypes}
                />
              )
            }
            count={<ProductListCount total_count={products?.total_count} />}
          >
            <ProductListItems title='' items={products?.items} loadingEager={1} />
            <ProductListPagination page_info={products?.page_info} params={params} />
          </ProductFiltersPro>
        ) : (
          <>
            <StickyBelowHeader>
              <ProductListParamsProvider value={params}>
                <ProductListFiltersContainer>
                  <ProductListSort
                    sort_fields={products?.sort_fields}
                    total_count={products?.total_count}
                  />
                  <ProductListFilters {...filters} filterTypes={filterTypes} />
                </ProductListFiltersContainer>
              </ProductListParamsProvider>
            </StickyBelowHeader>
            <Container maxWidth={false}>
              <ProductListCount total_count={products?.total_count} />
              <ProductListItems title='' items={products?.items} loadingEager={1} />
              <ProductListPagination page_info={products?.page_info} params={params} />
            </Container>
          </>
        )}
      </Container>
    </ProductListParamsProvider>
  )
}

MinimalLayoutSubheader.pageOptions = {
  Layout: LayoutMinimal,
} as PageOptions

export default MinimalLayoutSubheader

export const getStaticPaths: GetPageStaticPaths = async () => {
  // Disable getStaticPaths while in development mode
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  return Promise.resolve({
    paths: [{ params: { url: [] } }],
    fallback: 'blocking',
  })
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const filterTypes = getFilterTypes(client)

  const staticClient = graphqlSsrClient(locale)

  const products = staticClient.query({ query: ProductListDocument })
  const filters = staticClient.query({ query: ProductFiltersDocument })

  const [url, query] = extractUrlQuery(params)
  if (!url || !query) return { notFound: true }
  const productListParams = parseParams(url, query, await filterTypes)
  if (!productListParams) return { notFound: true }

  return {
    props: {
      ...(await products).data,
      ...(await filters).data,
      filterTypes: await filterTypes,
      params: productListParams,
      up: { href: '/', title: 'Home' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 1,
  }
}
