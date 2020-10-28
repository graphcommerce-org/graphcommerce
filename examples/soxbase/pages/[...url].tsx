import { Container } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import getLayoutHeaderProps from '@reachdigital/magento-app-shell/getLayoutHeaderProps'
import CategoryChildren from '@reachdigital/magento-category/CategoryChildren'
import CategoryDescription from '@reachdigital/magento-category/CategoryDescription'
import CategoryMeta from '@reachdigital/magento-category/CategoryMeta'
import { ProductListParamsProvider } from '@reachdigital/magento-category/CategoryPageContext'
import getCategoryPageProps, {
  GetCategoryPageProps,
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
import getStoreConfig from '@reachdigital/magento-store/getStoreConfig'
import getUrlResolveProps from '@reachdigital/magento-store/getUrlResolveProps'
import FullPageUi from '@reachdigital/next-ui/AppShell/FullPageUi'
import { PageStaticPropsFn, PageFC, PageStaticPathsFn } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import NextError from 'next/error'
import React from 'react'
import apolloClient from '../lib/apolloClient'

type PageComponent = PageFC<GetCategoryPageProps, PageLayoutProps>
type GetPageStaticPaths = PageStaticPathsFn<{ url: string[] }>
type GetPageStaticProps = PageStaticPropsFn<PageComponent, { url: string[] }>

const CategoryPage: PageComponent = (props) => {
  const classes = useCategoryPageStyles(props)
  const { categories, products, filters, params, filterTypeMap } = props

  if (!categories?.items?.[0] || !products || !params || !filters || !filterTypeMap)
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
              filterTypeMap={filterTypeMap}
              className={classes.filterItem}
            />
          </div>
          <ProductListItems
            items={products.items}
            className={classes.items}
            filterTypeMap={filterTypeMap}
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

export const getStaticPaths: GetPageStaticPaths = () => {
  const client = apolloClient()
  return getCategoryStaticPaths(client)
}

export const getStaticProps: GetPageStaticProps = async (ctx) => {
  if (!ctx.params) throw new Error('No params')

  const queryIndex = ctx.params.url.findIndex((slug) => slug === 'q')
  const qIndex = queryIndex < 0 ? ctx.params.url.length : queryIndex

  const url = ctx.params.url.slice(0, qIndex)

  const client = apolloClient()
  const staticClient = apolloClient()
  const config = getStoreConfig(client)
  const suffix = (await config).storeConfig?.category_url_suffix ?? ''
  const urlResolve = getUrlResolveProps({ urlKey: `${url.join('/')}${suffix}` }, staticClient)
  const categoryPage = getCategoryPageProps(
    { urlParams: ctx.params.url.slice(qIndex + 1), urlResolve, url },
    staticClient,
  )
  const layoutHeader = getLayoutHeaderProps(staticClient)

  return {
    props: {
      ...(await urlResolve),
      ...(await layoutHeader),
      ...(await categoryPage),
      apolloState: client.cache.extract(),
    },
    revalidate: 60 * 20,
  }
}
