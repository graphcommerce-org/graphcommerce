import { mergeDeep } from '@apollo/client/utilities'
import { Box, Container, makeStyles, Theme, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { GetStaticPaths } from 'next'
import PageLink from 'next/link'
import React from 'react'
import { ProductListParamsProvider } from '../../../../../packages/magento-category'
import {
  ProductListFilters,
  ProductListFiltersContainer,
  ProductListSort,
} from '../../../../../packages/magento-product'
import { ProductListDocument } from '../../../../../packages/magento-product/ProductList/ProductList.gql'
import {
  FilterTypes,
  ProductListParams,
} from '../../../../../packages/magento-product/ProductListItems/filterTypes'
import {
  extractUrlQuery,
  parseParams,
} from '../../../../../packages/magento-product/ProductListItems/filteredProductList'
import { getFilterTypes } from '../../../../../packages/magento-product/ProductListItems/getFilterTypes'
import { SearchDocument, SearchForm, SearchQuery } from '../../../../../packages/magento-search'
import { Button } from '../../../../../packages/next-ui'
import AppShellProvider from '../../../../../packages/next-ui/AppShell/AppShellProvider'
import SheetBillboard from '../../../../../packages/next-ui/AppShell/AppShellSticky'
import AppShellTitle from '../../../../../packages/next-ui/AppShell/AppShellTitle'
import PageShellHeader from '../../../../../packages/next-ui/AppShell/PageShellHeader'
import Logo from '../../../components/AppShell/Logo'
import MinimalPageShell, {
  MinimalPageShellProps,
} from '../../../components/AppShell/MinimalPageShell'
import { DefaultPageDocument, DefaultPageQuery } from '../../../components/GraphQL/DefaultPage.gql'
import apolloClient from '../../../lib/apolloClient'

type Props = DefaultPageQuery &
  SearchQuery & { filterTypes: FilterTypes; params: ProductListParams }
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<MinimalPageShellProps, Props, RouteProps>

// TODO: throw away. for testing only
const useStyles = makeStyles((theme: Theme) => ({
  longContent: {
    height: 2000,
  },
}))

function MinimalAppShellSubheader(props: Props) {
  const { params, products, filters, filterTypes } = props
  const classes = useStyles()

  return (
    <AppShellProvider>
      <ProductListParamsProvider value={params}>
        <PageShellHeader
          primary={
            <PageLink href='/test/minimal-page-shell' passHref>
              <Button color='secondary' variant='pill-link'>
                Next
              </Button>
            </PageLink>
          }
          logo={<Logo />}
          additional={
            <Container maxWidth='sm'>
              <SearchForm urlHandle='test/minimal-page-shell-subheader' />
            </Container>
          }
          scrolled
        >
          <Typography variant='h5' component='span'>
            Minimal UI
          </Typography>
        </PageShellHeader>
        <Container maxWidth='md' className={classes.longContent}>
          <AppShellTitle>
            <Box textAlign='center' mb={3}>
              <Typography variant='h2' component='h2'>
                Minimal UI
              </Typography>
            </Box>
          </AppShellTitle>

          <SheetBillboard>
            <ProductListFiltersContainer>
              <ProductListSort sort_fields={products?.sort_fields} />
              <ProductListFilters aggregations={filters?.aggregations} filterTypes={filterTypes} />
            </ProductListFiltersContainer>
          </SheetBillboard>
        </Container>
      </ProductListParamsProvider>
    </AppShellProvider>
  )
}

MinimalAppShellSubheader.pageOptions = {
  SharedComponent: MinimalPageShell,
  sharedKey: () => 'page',
} as PageOptions

export default MinimalAppShellSubheader

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  // Disable getStaticPaths while in development mode
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  return {
    paths: [{ params: { url: [] } }],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const [search = '', query = []] = extractUrlQuery(params)

  const client = apolloClient(locale, true)
  const conf = client.query({ query: StoreConfigDocument })
  const filterTypes = getFilterTypes(client)

  const rootCategory = (await conf).data.storeConfig?.root_category_uid ?? ''
  const staticClient = apolloClient(locale)
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: { url: 'minimal-page-shell-subheader', rootCategory },
  })

  const productListParams = parseParams(
    `minimal-page-shell-subheader${search.length > 2 ? `/${search}` : search}`,
    query,
    await filterTypes,
  )

  if (!productListParams) return { notFound: true }

  const products =
    search && search.length > 2
      ? client.query({
          query: SearchDocument,
          variables: mergeDeep(productListParams, {
            categoryUid: rootCategory,
            search,
          }),
        })
      : client.query({
          query: ProductListDocument,
          variables: mergeDeep(productListParams, {
            categoryUid: rootCategory,
          }),
        })

  return {
    props: {
      ...(await page).data,
      ...(await products).data,
      scrolled: true,
      filterTypes: await filterTypes,
      params: productListParams,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 1,
  }
}
