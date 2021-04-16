import { mergeDeep } from '@apollo/client/utilities'
import { Container, makeStyles, Theme, Typography } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { ProductListParamsProvider } from '@reachdigital/magento-category/CategoryPageContext'
import useCategoryPageStyles from '@reachdigital/magento-category/useCategoryPageStyles'
import ProductListCount from '@reachdigital/magento-product/ProductListCount'
import ProductListFilters from '@reachdigital/magento-product/ProductListFilters'
import ProductListFiltersContainer from '@reachdigital/magento-product/ProductListFiltersContainer'
import {
  FilterTypes,
  ProductListParams,
} from '@reachdigital/magento-product/ProductListItems/filterTypes'
import {
  extractUrlQuery,
  parseParams,
} from '@reachdigital/magento-product/ProductListItems/filteredProductList'
import getFilterTypes from '@reachdigital/magento-product/ProductListItems/getFilterTypes'
import ProductListPagination from '@reachdigital/magento-product/ProductListPagination'
import ProductListSort from '@reachdigital/magento-product/ProductListSort'
import CategorySearchResult from '@reachdigital/magento-search/CategorySearchResult'
import { SearchDocument, SearchQuery } from '@reachdigital/magento-search/Search.gql'
import SearchForm from '@reachdigital/magento-search/SearchForm'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import IconTitle from '@reachdigital/next-ui/IconTitle'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import clsx from 'clsx'
import { GetStaticPaths } from 'next'
import React from 'react'
import FullPageUi from '../../components/AppShell/FullPageUi'
import { DefaultPageDocument, DefaultPageQuery } from '../../components/GraphQL/DefaultPage.gql'
import ProductListItems from '../../components/ProductListItems/ProductListItems'
import useProductListStyles from '../../components/ProductListItems/useProductListStyles'
import apolloClient from '../../lib/apolloClient'

export const config = { unstable_JsPreload: false }

type Props = DefaultPageQuery &
  SearchQuery & { filterTypes: FilterTypes; params: ProductListParams }
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

const useStyles = makeStyles(
  (theme: Theme) => ({
    formContainer: {
      boxShadow: '0 5px 4px 0 rgb(3 3 3 / 3%)',
    },
    title: {
      marginTop: theme.spacings.md,
      marginBottom: theme.spacings.sm,
    },
    productsContainer: {
      marginTop: theme.spacings.md,
    },
    categoryLinks: {
      paddingBottom: theme.spacings.md,
    },
    categoryButton: {
      padding: `${theme.spacings.xs} 20px ${theme.spacings.xs} 14px`,
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: `1px solid ${theme.palette.divider}`,
      minWidth: '100%',
      maxWidth: 'unset',
      borderRadius: '0',
      '&:focus': {
        boxShadow: 'none',
      },
      '&:hover': {
        background: '#f8f8f8', // TODO: use theme value
      },
    },
    totalProducts: {
      minWidth: 'max-content',
      ...theme.typography.caption,
      paddingRight: 7,
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
    },
    productListCount: {
      marginTop: theme.spacings.sm,
    },
  }),
  {
    name: 'SearchIndexPage',
  },
)

function SearchIndexPage(props: Props) {
  const { products, categories, filters, params, filterTypes } = props
  const productListClasses = useProductListStyles({ count: products?.items?.length ?? 0 })
  const classes = useCategoryPageStyles(props)
  const pageClasses = useStyles()
  const search = params.url.split('/')[1]
  const totalSearchResults = (categories?.items?.length ?? 0) + (products?.total_count ?? 0)

  return (
    <FullPageUi title='Search' backFallbackHref='/' backFallbackTitle='Home' {...props}>
      <PageMeta title='Search' metaDescription='Search results' metaRobots={['noindex']} />

      <div className={pageClasses.formContainer}>
        <Container maxWidth='sm'>
          <SearchForm totalResults={totalSearchResults} search={search} />

          <div className={pageClasses.categoryLinks}>
            {categories?.items?.map((category) => (
              <CategorySearchResult key={category?.url_path} search={search} {...category} />
            ))}
          </div>
        </Container>
      </div>

      <Container maxWidth='xl'>
        {search && (!products || (products.items && products?.items?.length <= 0)) && (
          <div className={pageClasses.title}>
            <Typography variant='h5' align='center'>
              <IconTitle
                iconSrc='/icons/desktop_sad_face.svg'
                title='No results'
                alt='no results'
                size='large'
              />
            </Typography>
          </div>
        )}

        {search && products && products.items && products?.items?.length > 0 && (
          <div className={pageClasses.title}>
            <Typography variant='h2' align='center'>
              Results for ‘{search}’
            </Typography>
          </div>
        )}

        <ProductListParamsProvider value={params}>
          {!!products?.total_count && (
            <ProductListFiltersContainer>
              <ProductListSort sort_fields={products?.sort_fields} />
              <ProductListFilters aggregations={filters?.aggregations} filterTypes={filterTypes} />
            </ProductListFiltersContainer>
          )}

          <div className={pageClasses.productListCount}>
            {!!products?.total_count && products?.total_count > 0 && (
              <ProductListCount total_count={products?.total_count} />
            )}
          </div>

          <div className={pageClasses.productsContainer}>
            <ProductListItems
              items={products?.items}
              className={clsx(classes.items, productListClasses.productList)}
              loadingEager={1}
            />
          </div>

          <div className={pageClasses.pagination}>
            <ProductListPagination page_info={products?.page_info} />
          </div>
        </ProductListParamsProvider>
      </Container>
    </FullPageUi>
  )
}

SearchIndexPage.Layout = PageLayout

registerRouteUi('/search/[[...url]]', FullPageUi)

export default SearchIndexPage

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

  const productListParams = parseParams(`search/${search}`, query, await filterTypes)

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
      : { data: undefined }

  return {
    props: {
      ...(await page).data,
      ...(await products).data,
      filterTypes: await filterTypes,
      params: productListParams,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 1,
  }
}
