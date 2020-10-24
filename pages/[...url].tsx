import { Container } from '@material-ui/core'
import FullPageUi from 'components/AppShell/FullPageUi'
import PageLayout, { PageLayoutProps } from 'components/AppShell/PageLayout'
import getLayoutHeaderProps from 'components/AppShell/getLayoutHeaderProps'
import CategoryChildren from 'components/Category/CategoryChildren'
import CategoryDescription from 'components/Category/CategoryDescription'
import CategoryMeta from 'components/Category/CategoryMeta'
import { ProductListParamsProvider } from 'components/Category/CategoryPageContext'
import getCategoryPageProps, {
  GetCategoryPageProps,
} from 'components/Category/getCategoryPageProps'
import getCategoryStaticPaths from 'components/Category/getCategoryStaticPaths'
import useCategoryPageStyles from 'components/Category/useCategoryPageStyles'
import getUrlResolveProps from 'components/Page/getUrlResolveProps'
import { PageStaticPropsFn, PageFC, PageStaticPathsFn } from 'components/Page/types'
import { registerRouteUi } from 'components/PageTransition/historyHelpers'
import ProductListFilters from 'components/Product/ProductListFilters'
import ProductListItem from 'components/Product/ProductListItem'
import ProductListItems from 'components/Product/ProductListItems'
import ProductListPagination from 'components/Product/ProductListPagination'
import ProductListSort from 'components/Product/ProductListSort'
import ProductListItemBundle from 'components/ProductTypeBundle/ProductListItemBundle'
import ProductListItemConfigurable from 'components/ProductTypeConfigurable/ProductListItemConfigurable'
import ProductListItemDownloadable from 'components/ProductTypeDownloadable/ProductListItemDownloadable'
import ProductListItemSimple from 'components/ProductTypeSimple/ProductListItemSimple'
import ProductListItemVirtual from 'components/ProductTypeVirtual/ProductListItemVirtual'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import NextError from 'next/error'
import React from 'react'

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
        <Container className={classes.container} maxWidth='xl'>
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
