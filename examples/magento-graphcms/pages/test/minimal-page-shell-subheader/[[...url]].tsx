import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  FilterTypes,
  ProductFiltersDocument,
  ProductFiltersPro,
  ProductFiltersProAllFiltersChip,
  ProductFiltersProFilterChips,
  ProductFiltersProLimitChip,
  ProductFiltersProSortChip,
  ProductFiltersQuery,
  ProductListDocument,
  ProductListFilters,
  ProductListFiltersContainer,
  ProductListParams,
  ProductListParamsProvider,
  ProductListQuery,
  ProductListSort,
} from '@graphcommerce/magento-product'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { StickyBelowHeader, LayoutTitle, LayoutHeader, LinkOrButton } from '@graphcommerce/next-ui'
import { GetStaticProps } from '@graphcommerce/next-ui/Page/types'
import { enhanceStaticPaths, enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { Box, Container, Typography } from '@mui/material'
import { GetStaticPaths } from 'next'
import { LayoutMinimal, LayoutMinimalProps } from '../../../components'
import { graphqlSsrClient, graphqlSharedClient, graphqlQuery } from '@graphcommerce/graphql-mesh'
import { getFilterTypes, extractUrlQuery, parseParams } from '@graphcommerce/magento-product/server'

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

        <StickyBelowHeader>
          {import.meta.graphCommerce.productFiltersPro ? (
            <ProductFiltersPro params={params}>
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
            </ProductFiltersPro>
          ) : (
            <ProductListParamsProvider value={params}>
              <ProductListFiltersContainer>
                <ProductListSort
                  sort_fields={products?.sort_fields}
                  total_count={products?.total_count}
                />
                <ProductListFilters {...filters} filterTypes={filterTypes} />
              </ProductListFiltersContainer>
            </ProductListParamsProvider>
          )}
        </StickyBelowHeader>
      </Container>
    </ProductListParamsProvider>
  )
}

MinimalLayoutSubheader.pageOptions = {
  Layout: LayoutMinimal,
} as PageOptions

export default MinimalLayoutSubheader

export const getStaticPaths: GetPageStaticPaths = enhanceStaticPaths('blocking', ({ locale }) =>
  [[]].map((url) => ({ params: { url }, locale })),
)

export const getStaticProps: GetPageStaticProps = enhanceStaticProps(async ({ params, locale }) => {
  const filterTypes = getFilterTypes()

  const products = graphqlQuery(ProductListDocument)
  const filters = graphqlQuery(ProductFiltersDocument)

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
    },
    revalidate: 1,
  }
})
