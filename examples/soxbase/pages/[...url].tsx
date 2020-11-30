import { performance } from 'perf_hooks'
import { Container, makeStyles, Theme } from '@material-ui/core'
import Header, { HeaderProps } from '@reachdigital/magento-app-shell/Header'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import CategoryChildren from '@reachdigital/magento-category/CategoryChildren'
import CategoryDescription from '@reachdigital/magento-category/CategoryDescription'
import CategoryMeta from '@reachdigital/magento-category/CategoryMeta'
import CategoryNav from '@reachdigital/magento-category/CategoryNav'
import { ProductListParamsProvider } from '@reachdigital/magento-category/CategoryPageContext'
import ProductCount from '@reachdigital/magento-category/ProductCount'
import getCategoryPageProps, {
  CategoryPageProps,
} from '@reachdigital/magento-category/getCategoryPageProps'
import getCategoryStaticPaths from '@reachdigital/magento-category/getCategoryStaticPaths'
import useCategoryPageStyles from '@reachdigital/magento-category/useCategoryPageStyles'
import ProductListFilters from '@reachdigital/magento-product/ProductListFilters'
import ProductListItems from '@reachdigital/magento-product/ProductListItems'
import ProductListPagination from '@reachdigital/magento-product/ProductListPagination'
import ProductListSort from '@reachdigital/magento-product/ProductListSort'
import { ResolveUrlDocument } from '@reachdigital/magento-store/ResolveUrl.gql'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import FullPageUi from '@reachdigital/next-ui/AppShell/FullPageUi'
import ResultError from '@reachdigital/next-ui/Page/ResultError'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import clsx from 'clsx'
import NextError from 'next/error'
import React from 'react'
import Page from '../components/Page'
import { PageByUrlDocument, PageByUrlQuery } from '../components/Page/PageByUrl.gql'
import ProductListItemBundle from '../components/Products/ProductListItemBundle'
import ProductListItemConfigurable from '../components/Products/ProductListItemConfigurable'
import ProductListItemDownloadable from '../components/Products/ProductListItemDownloadable'
import ProductListItemGiftCard from '../components/Products/ProductListItemGiftCard'
import ProductListItemGrouped from '../components/Products/ProductListItemGrouped'
import ProductListItemSimple from '../components/Products/ProductListItemSimple'
import ProductListItemVirtual from '../components/Products/ProductListItemVirtual'
import apolloClient from '../lib/apolloClient'

type Props = CategoryPageProps & HeaderProps & PageByUrlQuery
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

const useProductListStyles = makeStyles(
  (theme: Theme) => ({
    productList: (props: Props) => {
      let big = 3
      let index = 0
      let toggle = false
      let selector = ''
      const count = props.products?.items?.length ?? 0
      for (index = 0; index <= count; index++) {
        if (index === big) {
          selector += `& >:nth-child(${big}),`
          if (toggle === false) {
            big = index + 7
            toggle = !toggle
          } else {
            big = index + 11
            toggle = !toggle
          }
        }
      }
      selector = selector.slice(0, -1)
      return {
        [theme.breakpoints.up('xl')]: {
          [`${selector}`]: {
            gridColumn: 'span 2',
            gridRow: 'span 2;',
            '& > a > div': {
              paddingTop: `calc(100% + ${theme.spacings.lg} - 2px)`,
            },
          },
        },
      }
    },
  }),
  { name: 'ProductList' },
)

function CategoryPage(props: Props) {
  const productListClasses = useProductListStyles(props)
  const classes = useCategoryPageStyles(props)
  const { categories, products, filters, params, filterTypes, menu, urlResolver, pages } = props

  if (!categories?.items?.[0] || !products || !params || !filters || !filterTypes)
    return <NextError statusCode={503} title='Loading skeleton' />

  const category = categories.items[0]

  let content: React.ReactNode
  if (
    (categories.items[0].level === 2 && categories.items[0].is_anchor === 1) ||
    categories.items[0].display_mode === 'PAGE'
  ) {
    content = (
      <>
        <Container className={classes.container} maxWidth='false'>
          <CategoryNav {...category} />
        </Container>
      </>
    )
  } else if (categories.items[0].display_mode === 'PAGE') {
    content = (
      <>
        <Container className={classes.container}>
          <CategoryDescription name={category.name} description={category.description} />
          <CategoryChildren params={params}>{category.children}</CategoryChildren>
        </Container>
      </>
    )
  } else {
    content = (
      <ProductListParamsProvider value={params}>
        <Container className={classes.container} maxWidth='xl'>
          <CategoryDescription
            name={category.name}
            description={category.description}
            className={classes.description}
          />
          <div className={classes.childCategories}>
            <CategoryChildren params={params}>{category.children}</CategoryChildren>
          </div>

          <div className={classes.filters}>
            <ProductListSort sort_fields={products.sort_fields} className={classes.filterItem} />
            <ProductListFilters
              aggregations={filters.aggregations}
              filterTypes={filterTypes}
              className={classes.filterItem}
            />
          </div>
          <ProductCount totalProducts={products?.items?.length} />
          <ProductListItems
            items={products.items}
            className={clsx(classes.items, productListClasses.productList)}
            filterTypes={filterTypes}
            renderers={{
              SimpleProduct: ProductListItemSimple,
              ConfigurableProduct: ProductListItemConfigurable,
              BundleProduct: ProductListItemBundle,
              VirtualProduct: ProductListItemVirtual,
              DownloadableProduct: ProductListItemDownloadable,
              GroupedProduct: ProductListItemGrouped,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore GiftCardProduct is only available in Commerce
              GiftCardProduct: ProductListItemGiftCard,
            }}
          />
          <ProductListPagination page_info={products.page_info} className={classes.pagination} />
        </Container>
      </ProductListParamsProvider>
    )
  }

  return (
    <FullPageUi title={category.name ?? ''}>
      <Header menu={menu} urlResolver={urlResolver} />
      <CategoryMeta {...category} />
      {pages?.[0] && <Page {...pages?.[0]} />}
      {content}
    </FullPageUi>
  )
}

CategoryPage.Layout = PageLayout

export default CategoryPage

registerRouteUi('/[...url]', FullPageUi)

export const getStaticPaths: GetPageStaticPaths = async ({ locales }) => {
  const localePaths =
    locales?.map((locale) => {
      const client = apolloClient(localeToStore(locale))
      return getCategoryStaticPaths(client, locale)
    }) ?? []
  const paths = (await Promise.all(localePaths)).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  try {
    if (!params?.url) throw new ResultError({ notFound: true })

    performance.mark(`getStaticProps-${params.url.join('/')}-start`)

    const queryIndex = params.url.findIndex((slug) => slug === 'q')
    const qIndex = queryIndex < 0 ? params.url.length : queryIndex
    const urlPath = params.url.slice(0, qIndex).join('/')
    const urlParams = params.url.slice(qIndex + 1)

    if (queryIndex > 0 && !urlParams.length) throw new ResultError({ notFound: true })

    const client = apolloClient(localeToStore(locale))
    const staticClient = apolloClient(localeToStore(locale))
    const config = client.query({ query: StoreConfigDocument })
    const suffix = (await config).data?.storeConfig?.category_url_suffix ?? ''
    const urlKey = `${urlPath}${suffix}`

    const page = staticClient.query({
      query: PageByUrlDocument,
      variables: { url: `${params.url}` },
    })

    const resolveUrl = client.query({ query: ResolveUrlDocument, variables: { urlKey } })
    const categoryPage = getCategoryPageProps({ urlPath, urlParams, resolveUrl }, staticClient)
    const pageLayout = staticClient.query({ query: PageLayoutDocument })

    const { urlResolver } = (await resolveUrl).data

    // 404 and redirect handling
    if (urlResolver?.type === 'CMS_PAGE') {
      throw new ResultError({
        redirect: { destination: `/page${urlResolver.relative_url}`, permanent: false },
      })
    }
    if (urlResolver?.type === 'PRODUCT') {
      throw new ResultError({
        redirect: { destination: `/page${urlResolver.relative_url}`, permanent: false },
      })
    }
    if (!urlResolver?.id) throw new ResultError({ notFound: true })

    const res = {
      props: {
        ...(await resolveUrl).data,
        ...(await pageLayout).data,
        ...(await categoryPage),
        ...(await page).data,
        apolloState: client.cache.extract(),
      },
      revalidate: 60 * 20,
    }

    performance.mark(`getStaticProps-${params.url.join('/')}-stop`)
    performance.measure(
      `getStaticProps: /${params.url.join('/')}`,
      `getStaticProps-${params.url.join('/')}-start`,
      `getStaticProps-${params.url.join('/')}-stop`,
    )

    return res
  } catch (e) {
    if (e instanceof ResultError) return e.result
    throw e
  }
}
