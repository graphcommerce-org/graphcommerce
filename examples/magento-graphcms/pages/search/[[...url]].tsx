import { mergeDeep } from '@apollo/client/utilities'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { CategoryDescription } from '@graphcommerce/magento-category'
import {
  ProductListCount,
  ProductListFilters,
  ProductListFiltersContainer,
  ProductListPagination,
  ProductListParamsProvider,
  ProductListSort,
  ProductListDocument,
  extractUrlQuery,
  parseParams,
  FilterTypes,
  ProductListParams,
  getFilterTypes,
} from '@graphcommerce/magento-product'
import {
  CategorySearchResult,
  NoSearchResults,
  SearchDivider,
  SearchDocument,
  SearchForm,
  SearchQuery,
} from '@graphcommerce/magento-search'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { AppShellSticky, GetStaticProps, Title, AppBar } from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import { Container, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import { GetStaticPaths } from 'next'
import React from 'react'
import { DefaultPageDocument, DefaultPageQuery } from '../../components/GraphQL/DefaultPage.gql'
import { LayoutFull, LayoutFullProps } from '../../components/Layout'
import ProductListItems from '../../components/ProductListItems/ProductListItems'
import useProductListStyles from '../../components/ProductListItems/useProductListStyles'
import apolloClient from '../../lib/apolloClient'

export const config = { unstable_JsPreload: false }

type Props = DefaultPageQuery &
  SearchQuery & { filterTypes: FilterTypes; params: ProductListParams }
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutFullProps, Props, RouteProps>

const useStyles = makeStyles(
  (theme: Theme) => ({
    hideOnMobile: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
    hideOnDesktop: {
      display: 'block',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    categoryResultsMobile: {
      marginTop: theme.spacings.xs,
      marginBottom: theme.spacings.xs,
    },
  }),
  {
    name: 'SearchResultPage',
  },
)

function SearchResultPage(props: Props) {
  const { products, categories, params, filters, filterTypes } = props
  const productListClasses = useProductListStyles({ count: products?.items?.length ?? 0 })
  const search = params.url.split('/')[1]
  const totalSearchResults = (categories?.items?.length ?? 0) + (products?.total_count ?? 0)
  const noSearchResults = search && (!products || (products.items && products?.items?.length <= 0))
  const title = typeof search !== 'undefined' ? t`Results for '${search}'` : t`All products`
  const classes = useStyles()

  return (
    <>
      <PageMeta
        title={search ? t`Results for '${search}'` : t`Search`}
        metaRobots={['noindex']}
        canonical='/search'
      />

      <AppBar
        additional={
          <Container maxWidth={false}>
            <SearchForm totalResults={totalSearchResults} search={search} />
          </Container>
        }
      >
        <Title size='small'>{title}</Title>
      </AppBar>

      <Container maxWidth='sm' className={classes.hideOnMobile}>
        <SearchForm totalResults={totalSearchResults} search={search} />
        {categories?.items?.map((category) => (
          <CategorySearchResult key={category?.url_path} search={search} {...category} />
        ))}
        {noSearchResults && <NoSearchResults search={search} />}
      </Container>

      <SearchDivider className={classes.hideOnMobile} />

      <Container
        maxWidth='md'
        className={clsx(classes.hideOnDesktop, classes.categoryResultsMobile)}
      >
        <>
          {categories?.items?.map((category) => (
            <CategorySearchResult key={category?.url_path} search={search} {...category} />
          ))}
        </>
      </Container>

      {products && products.items && products?.items?.length > 0 && (
        <ProductListParamsProvider value={params}>
          <Container maxWidth='xl'>
            <CategoryDescription name={title} classes={{ root: classes.hideOnMobile }} />

            <AppShellSticky headerFill='mobile-only'>
              <ProductListFiltersContainer>
                <ProductListSort sort_fields={products?.sort_fields} />
                <ProductListFilters
                  aggregations={filters?.aggregations}
                  filterTypes={filterTypes}
                />
              </ProductListFiltersContainer>
            </AppShellSticky>

            <ProductListCount total_count={products?.total_count} />

            <ProductListItems
              items={products?.items}
              classes={productListClasses}
              loadingEager={1}
            />

            <ProductListPagination page_info={products?.page_info} />
          </Container>
        </ProductListParamsProvider>
      )}
    </>
  )
}

SearchResultPage.pageOptions = {
  Layout: LayoutFull,
} as PageOptions

export default SearchResultPage

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
    variables: { url: 'search', rootCategory },
  })

  const productListParams = parseParams(
    `search${search.length > 2 ? `/${search}` : search}`,
    query,
    await filterTypes,
  )

  if (!productListParams) return { notFound: true }

  const products =
    search && search.length > 2
      ? staticClient.query({
          query: SearchDocument,
          variables: mergeDeep(productListParams, {
            categoryUid: rootCategory,
            search,
          }),
        })
      : staticClient.query({
          query: ProductListDocument,
          variables: mergeDeep(productListParams, {
            categoryUid: rootCategory,
          }),
        })

  return {
    props: {
      ...(await page).data,
      ...(await products).data,
      filterTypes: await filterTypes,
      params: productListParams,
      up: { href: '/', title: 'Home' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 1,
  }
}
