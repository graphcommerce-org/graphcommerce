import { Container } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import CategoryChildren from '@reachdigital/magento-category/CategoryChildren'
import CategoryDescription from '@reachdigital/magento-category/CategoryDescription'
import CategoryMeta from '@reachdigital/magento-category/CategoryMeta'
import { ProductListParamsProvider } from '@reachdigital/magento-category/CategoryPageContext'
import getCategoryPageProps, {
  CategoryPageProps,
} from '@reachdigital/magento-category/getCategoryPageProps'
import getCategoryStaticPaths from '@reachdigital/magento-category/getCategoryStaticPaths'
import useCategoryPageStyles from '@reachdigital/magento-category/useCategoryPageStyles'
import ProductListItemBundle from '@reachdigital/magento-product-bundle/ProductListItemBundle'
import ProductListItemConfigurable from '@reachdigital/magento-product-configurable/ProductListItemConfigurable'
import ProductListItemDownloadable from '@reachdigital/magento-product-downloadable/ProductListItemDownloadable'
import ProductListItemSimple from '@reachdigital/magento-product-simple/ProductListItemSimple'
import ProductListItemVirtual from '@reachdigital/magento-product-virtual/ProductListItemVirtual'
import ProductListFilters from '@reachdigital/magento-product/ProductListFilters'
import ProductListItem from '@reachdigital/magento-product/ProductListItem'
import ProductListItems from '@reachdigital/magento-product/ProductListItems'
import ProductListPagination from '@reachdigital/magento-product/ProductListPagination'
import ProductListSort from '@reachdigital/magento-product/ProductListSort'
import { ResolveUrlDocument } from '@reachdigital/magento-store/ResolveUrl.gql'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import FullPageUi from '@reachdigital/next-ui/AppShell/FullPageUi'
import ResultError from '@reachdigital/next-ui/Page/ResultError'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import NextError from 'next/error'
import React from 'react'
import apolloClient from '../lib/apolloClient'

type Props = CategoryPageProps
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

function CategoryPage(props: Props) {
  const classes = useCategoryPageStyles(props)
  const { categories, products, filters, params, filterTypes } = props

  if (!categories?.items?.[0] || !products || !params || !filters || !filterTypes)
    return <NextError statusCode={503} title='Loading skeleton' />

  const category = categories.items[0]

  let content: React.ReactNode
  if (categories.items[0].display_mode === 'PAGE') {
    content = (
      <>
        <Container className={classes.container}>
          <CategoryDescription name={category.name} description={category.description} />
          <div>
            <CategoryChildren params={params}>{category.children}</CategoryChildren>
          </div>
        </Container>
      </>
    )
  } else {
    content = (
      <ProductListParamsProvider value={params}>
        <Container className={classes.container}>
          <CategoryDescription
            name={category.name}
            description={category.description}
            className={classes.description}
          />
          <div>
            <CategoryChildren params={params} className={classes.filterItem}>
              {category.children}
            </CategoryChildren>
          </div>
          <div className={classes.filters}>
            <ProductListSort sort_fields={products.sort_fields} className={classes.filterItem} />
            <ProductListFilters
              aggregations={filters.aggregations}
              filterTypes={filterTypes}
              className={classes.filterItem}
            />
          </div>
          <ProductListItems
            items={products.items}
            className={classes.items}
            filterTypes={filterTypes}
            renderers={{
              SimpleProduct: ProductListItemSimple,
              ConfigurableProduct: ProductListItemConfigurable,
              BundleProduct: ProductListItemBundle,
              VirtualProduct: ProductListItemVirtual,
              DownloadableProduct: ProductListItemDownloadable,
              GroupedProduct: ProductListItem,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore GiftCardProduct is only available in Commerce
              GiftCardProduct: ProductListItem,
            }}
          />
          <ProductListPagination page_info={products.page_info} className={classes.pagination} />
        </Container>
      </ProductListParamsProvider>
    )
  }

  return (
    <FullPageUi title={category.name ?? ''}>
      <CategoryMeta {...category} />
      {content}
    </FullPageUi>
  )
}

CategoryPage.Layout = PageLayout

registerRouteUi('/[...url]', FullPageUi)

export default CategoryPage

export const getStaticPaths: GetPageStaticPaths = () => getCategoryStaticPaths(apolloClient())

export const getStaticProps: GetPageStaticProps = async (ctx) => {
  try {
    if (!ctx.params?.url) throw new ResultError({ notFound: true })

    const queryIndex = ctx.params.url.findIndex((slug) => slug === 'q')
    const qIndex = queryIndex < 0 ? ctx.params.url.length : queryIndex
    const urlPath = ctx.params.url.slice(0, qIndex).join('/')
    const urlParams = ctx.params.url.slice(qIndex + 1)

    if (queryIndex > 0 && !urlParams.length) throw new ResultError({ notFound: true })

    const client = apolloClient()
    const staticClient = apolloClient()
    const config = client.query({ query: StoreConfigDocument })
    const suffix = (await config).data?.storeConfig?.category_url_suffix ?? ''
    const urlKey = `${urlPath}${suffix}`

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

    return {
      props: {
        ...(await resolveUrl).data,
        ...(await pageLayout).data,
        ...(await categoryPage),
        apolloState: client.cache.extract(),
      },
      revalidate: 60 * 20,
    }
  } catch (e) {
    if (e instanceof ResultError) return e.result
    throw e
  }
}
