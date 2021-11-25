import { mergeDeep } from '@apollo/client/utilities'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  extractUrlQuery,
  FilterTypes,
  getFilterTypes,
  parseParams,
  ProductListDocument,
  ProductListFilters,
  ProductListFiltersContainer,
  ProductListParams,
  ProductListParamsProvider,
  ProductListSort,
} from '@graphcommerce/magento-product'
import { SearchDocument, SearchForm, SearchQuery } from '@graphcommerce/magento-search'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { AppShellSticky, AppShellTitle, Button, AppBar } from '@graphcommerce/next-ui'
import { GetStaticProps } from '@graphcommerce/next-ui/Page/types'
import { Box, Container, makeStyles, Theme, Typography } from '@material-ui/core'
import { GetStaticPaths } from 'next'
import PageLink from 'next/link'
import React from 'react'
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

// for testing only
const useStyles = makeStyles((theme: Theme) => ({
  longContent: {
    height: 2000,
  },
}))

function MinimalAppShellSubheader(props: Props) {
  const { params, products, filters, filterTypes } = props
  const classes = useStyles()

  return (
    <>
      <ProductListParamsProvider value={params}>
        <AppBar
          primary={
            <PageLink href='/test/minimal-page-shell' passHref>
              <Button color='secondary' variant='pill-link' size='small'>
                Next
              </Button>
            </PageLink>
          }
          additional={
            <Container maxWidth='sm'>
              <SearchForm urlHandle='test/minimal-page-shell-subheader' />
            </Container>
          }
        >
          <Typography variant='h5' component='span'>
            Minimal UI
          </Typography>
        </AppBar>
        <Container maxWidth='md' className={classes.longContent}>
          <AppShellTitle>
            <Box textAlign='center' mb={3}>
              <Typography variant='h2' component='h2'>
                Minimal UI
              </Typography>
            </Box>
          </AppShellTitle>

          <AppShellSticky>
            <ProductListFiltersContainer>
              <ProductListSort sort_fields={products?.sort_fields} />
              <ProductListFilters aggregations={filters?.aggregations} filterTypes={filterTypes} />
            </ProductListFiltersContainer>
          </AppShellSticky>
        </Container>
      </ProductListParamsProvider>
    </>
  )
}

MinimalAppShellSubheader.pageOptions = {
  SharedComponent: MinimalPageShell,
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
      up: { href: '/', title: 'Home' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 1,
  }
}
