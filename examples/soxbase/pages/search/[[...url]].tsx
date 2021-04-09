import { useQuery } from '@apollo/client'
import { mergeDeep } from '@apollo/client/utilities'
import { Container, makeStyles, TextField, Theme, Typography } from '@material-ui/core'
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
import { SearchDocument, SearchQuery } from '@reachdigital/magento-search/Search.gql'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import {
  useForm,
  useFormAutoSubmit,
  useFormGqlQuery,
  useFormMuiRegister,
} from '@reachdigital/react-hook-form'
import clsx from 'clsx'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
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
    closeBtn: {
      borderRadius: '50%',
      minWidth: 'unset',
      width: 40,
      height: 40,
    },
    formContainer: {
      boxShadow: '0 5px 4px 0 rgb(3 3 3 / 3%)',
    },
    title: {
      marginTop: theme.spacings.md,
      marginBottom: theme.spacings.xxs,
    },
    productsContainer: {
      marginTop: theme.spacings.md,
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
  const formClasses = useFormStyles()

  const search = params.url.split('/')[1]

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      search,
    },
  })

  const { register, handleSubmit, formState, reset, watch, getValues } = form
  const muiRegister = useFormMuiRegister(form)

  const router = useRouter()

  const submit = handleSubmit((formData) => {
    reset(getValues())
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.replace(`/search/${formData.search}`)
  })

  useFormAutoSubmit({ form, submit })

  const endAdornment = (
    <Button
      onClick={() => {
        reset({
          search: '',
        })
      }}
      type='submit'
      variant='text'
      className={pageClasses.closeBtn}
    >
      <PictureResponsiveNext
        alt='desktop_close'
        width={24}
        height={24}
        src='/icons/desktop_close.svg'
        type='image/svg+xml'
      />
    </Button>
  )

  console.log(categories)

  return (
    <FullPageUi title='Search' backFallbackHref='/' backFallbackTitle='Home' {...props}>
      <PageMeta title='Search' metaDescription='Search results' />

      <div className={pageClasses.formContainer}>
        <Container maxWidth='sm'>
          <form noValidate onSubmit={submit}>
            <div className={formClasses.formRow}>
              <TextField
                variant='outlined'
                type='text'
                autoFocus
                error={formState.isSubmitted && !!formState.errors.search}
                helperText={formState.isSubmitted && formState.errors.search?.message}
                {...muiRegister('search')}
                InputProps={{ endAdornment: watch('search') && endAdornment }}
              />
            </div>
          </form>

          {categories?.items?.map((category) => (
            <Button fullWidth key={`category-${category?.name}`} variant='contained'>
              {category?.breadcrumbs &&
                category.breadcrumbs.map((breadcrumb, index) => (
                  <span key={`breadcrumb-${breadcrumb?.category_url_path}`}>
                    {' '}
                    {`${breadcrumb?.category_name} /`}{' '}
                    {category?.breadcrumbs &&
                      index + 1 >= category?.breadcrumbs?.length &&
                      ` ${category.name}`}
                  </span>
                ))}
            </Button>
          ))}
        </Container>
      </div>

      <Container maxWidth='xl'>
        {(!search || !products || (products.items && products?.items?.length <= 0)) && (
          <div className={pageClasses.title}>
            <Typography variant='h5' align='center'>
              No search results to show
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

          {/* {!!products?.total_count && products?.total_count > 0 && (
            <ProductListCount total_count={products?.total_count} />
          )} */}

          <div className={pageClasses.productsContainer}>
            <ProductListItems
              items={products?.items}
              className={clsx(classes.items, productListClasses.productList)}
              loadingEager={1}
            />
          </div>
          <ProductListPagination page_info={products?.page_info} />
        </ProductListParamsProvider>
      </Container>
    </FullPageUi>
  )
}

SearchIndexPage.Layout = PageLayout

registerRouteUi('/[...url]', FullPageUi)

export default SearchIndexPage

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  // Disable getStaticPaths while in development mode
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const paths = locales.map((loc: string) => ({ params: { url: [] }, loc })).flat(1)
  return { paths, fallback: 'blocking' }
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

  const products = search
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
