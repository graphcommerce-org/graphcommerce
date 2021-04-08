import { useQuery } from '@apollo/client'
import { mergeDeep } from '@apollo/client/utilities'
import { Container } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { ProductListParamsProvider } from '@reachdigital/magento-category/CategoryPageContext'
import getCategoryStaticPaths from '@reachdigital/magento-category/getCategoryStaticPaths'
import useCategoryPageStyles from '@reachdigital/magento-category/useCategoryPageStyles'
import {
  ProductListDocument,
  ProductListQuery,
} from '@reachdigital/magento-product-types/ProductList.gql'
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

function SearchIndexPage(props: Props) {
  const { products, categories, params, filterTypes } = props
  const productListClasses = useProductListStyles(props)
  const classes = useCategoryPageStyles(props)

  // console.log(products.items, categories.items)
  // const productListClasses = useProductListStyles(props)
  // const classes = useCategoryPageStyles(props)

  // const formClasses = useFormStyles()

  // TODO: useMenu()
  // const menuProps: MenuProps = {
  //   menu: [
  //     ...(menuData?.items?.map((item) => ({
  //       href: `/${item?.url_path}`,
  //       children: item?.name?.toLowerCase().includes('sale') ? (
  //         <span style={{ textTransform: 'uppercase', color: 'red' }}>{item.name}</span>
  //       ) : (
  //         item?.name ?? ''
  //       ),
  //     })) ?? []),
  //     { href: '/blog', children: 'Blog' },
  //   ],
  // }

  // products(
  //   search: String
  //   filter: ProductAttributeFilterInput
  //   pageSize: Int = 20
  //   currentPage: Int = 1
  //   sort: ProductAttributeSortInput
  //   ): Products

  // const form = useFormGqlQuery(ProductListDocument, {
  //   defaultValues: {
  //     //
  //   },
  //   variables
  //   mode: 'onChange',
  // })

  // const { muiRegister, handleSubmit, valid, formState, required, error } = form
  // const submit = handleSubmit(() => {})

  // const autoSubmitting = useFormAutoSubmit({ form, submit })

  // const term = 'hoodie'

  // const { data } = useQuery(SearchDocument, {
  //   variables: {
  //     search: term,
  //   },
  // })

  return (
    <FullPageUi
      title='Search'
      backFallbackHref='/'
      backFallbackTitle='Home'
      // header={
      //   <>
      //     <Logo />
      //     <DesktopNavBar {...menuProps} />
      //     <DesktopNavActions>
      //       <PageLink href='/service/index'>
      //         <IconButton aria-label='Account' color='inherit' size='medium'>
      //           <PictureResponsiveNext
      //             src='/icons/desktop_customer_service.svg'
      //             alt='Customer Service'
      //             loading='eager'
      //             width={32}
      //             height={32}
      //             type='image/svg+xml'
      //           />
      //         </IconButton>
      //       </PageLink>

      //       <CustomerFab>
      //         <PictureResponsiveNext
      //           src='/icons/desktop_account.svg'
      //           alt='Account'
      //           loading='eager'
      //           width={32}
      //           height={32}
      //           type='image/svg+xml'
      //         />
      //       </CustomerFab>
      //     </DesktopNavActions>

      //     <form noValidate onSubmit={submit}>
      //       <div className={formClasses.formRow}>
      //         <TextField
      //           variant='outlined'
      //           type='text'
      //           error={formState.isSubmitted && !!formState.errors.email}
      //           helperText={formState.isSubmitted && formState.errors.email?.message}
      //           label='Email'
      //           required={required.email}
      //           {...muiRegister('email', {
      //             required: required.email,
      //             pattern: { value: emailPattern, message: '' },
      //           })}
      //           InputProps={{ endAdornment, readOnly: mode === 'signedin' }}
      //         />
      //       </div>
      //       <ApolloErrorAlert error={error} />
      //     </form>
      //   </>
      // }
      {...props}
    >
      <PageMeta title='Search' metaDescription={`Search results for `} />w
      <ProductListParamsProvider value={params}>
        <Container maxWidth='xl'>
          <ProductListFiltersContainer>
            <ProductListSort sort_fields={products?.sort_fields} />
            <ProductListFilters aggregations={products?.aggregations} filterTypes={filterTypes} />
          </ProductListFiltersContainer>

          <ProductListCount total_count={products?.total_count} />

          <ProductListItems
            items={products?.items}
            className={clsx(classes.items, productListClasses.productList)}
            loadingEager={1}
          />
          <ProductListPagination page_info={products?.page_info} />
        </Container>
      </ProductListParamsProvider>
    </FullPageUi>
  )
}

SearchIndexPage.Layout = PageLayout

registerRouteUi('/[...url]', FullPageUi)

export default SearchIndexPage

// export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
//   // const [url, query] = extractUrlQuery(params)
//   // if (!url || !query) return { notFound: true }

//   const client = apolloClient(locale, true)
//   const conf = client.query({ query: StoreConfigDocument })
//   const filterTypes = getFilterTypes(client)

//   const staticClient = apolloClient(locale)

//   const categoryPage = staticClient.query({
//     query: CategoryPageDocument,
//     variables:
//       url: 'search',
//       rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
//     },
//   })
//   const categoryUid = categoryPage.then((res) => res.data.categories?.items?.[0]?.uid ?? '')

//   const productListParams = parseParams(url, query, await filterTypes)

//   if (!productListParams || !(await categoryUid)) return { notFound: true }

//   // assertAllowedParams(await params, (await products).data)
//   if (!(await categoryUid)) return { notFound: true }

//   return {
//     props: {
//       ...(await categoryPage).data,
//       filterTypes: await filterTypes,
//       params: productListParams,
//       apolloState: await conf.then(() => client.cache.extract()),
//     },
//     revalidate: 60 * 20,
//   }
// }

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  // Disable getStaticPaths while in development mode
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const paths = locales.map((loc: string) => ({ params: { url: [] }, loc })).flat(1)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const [search = 'sdfjhkfdshjkfadshjklafsdhjkl', query = []] = extractUrlQuery(params)

  const client = apolloClient(locale, true)
  const conf = client.query({ query: StoreConfigDocument })
  const filterTypes = getFilterTypes(client)

  const rootCategory = (await conf).data.storeConfig?.root_category_uid ?? ''
  const staticClient = apolloClient(locale)
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: { url: 'search', rootCategory },
  })

  const productListParams = parseParams(search, query, await filterTypes)
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
