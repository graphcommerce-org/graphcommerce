import { PageOptions } from '@graphcommerce/framer-next-pages'
import { getHygraphPage, MaybeHygraphSingePage } from '@graphcommerce/graphcms-ui/server'
import { deepAwait } from '@graphcommerce/graphql-mesh'
import { CategoryPageResult, getCategoryPage } from '@graphcommerce/magento-category/server'
import {
  ProductFiltersPro,
  ProductFiltersProAllFiltersChip,
  ProductFiltersProFilterChips,
  ProductFiltersProLimitChip,
  ProductFiltersProSortChip,
  ProductFiltersQuery,
  ProductListFilters,
  ProductListFiltersContainer,
  ProductListParamsProvider,
  ProductListQuery,
  ProductListSort,
} from '@graphcommerce/magento-product'
import { getProductListItems, getProductListFilters } from '@graphcommerce/magento-product/server'
import { StickyBelowHeader, LayoutTitle, LayoutHeader, LinkOrButton } from '@graphcommerce/next-ui'
import { enhanceStaticPaths, enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { Box, Container, Typography } from '@mui/material'
import { GetStaticPaths } from 'next'
import { LayoutMinimal, LayoutMinimalProps } from '../../../components'
import { CategoryPageDocument } from '../../../graphql/CategoryPage.gql'

type Props = CategoryPageResult & ProductListQuery & ProductFiltersQuery & MaybeHygraphSingePage
type RouteProps = { url: string[] }

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

export const getStaticPaths = enhanceStaticPaths<RouteProps>('blocking', ({ locale }) =>
  [[]].map((url) => ({ params: { url }, locale })),
)

export const getStaticProps = enhanceStaticProps<LayoutMinimalProps, Props, RouteProps>(
  async (context) => {
    const categoryPage = getCategoryPage(CategoryPageDocument, context)
    const listItems = getProductListItems(categoryPage.params)
    const filters = getProductListFilters(categoryPage.params)
    const page = getHygraphPage(categoryPage.params)

    if (!(await listItems).error) return { notFound: true }

    return {
      props: await deepAwait({
        ...page,
        ...categoryPage,
        ...(await listItems).data,
        ...(await filters).data,
      }),
      revalidate: 1,
    }
  },
)
