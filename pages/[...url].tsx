import { Container } from '@material-ui/core'
import clsx from 'clsx'
import CategoryBreadcrumb from 'components/CategoryBreadcrumb'
import CategoryChildren from 'components/CategoryChildren'
import CategoryDescription from 'components/CategoryDescription'
import CategoryMeta from 'components/CategoryMeta'
import { ProductListParamsProvider } from 'components/CategoryPage/CategoryPageContext'
import getCategoryPageProps, {
  GetCategoryPageProps,
} from 'components/CategoryPage/getCategoryPageProps'
import getCategoryStaticPaths from 'components/CategoryPage/getCategoryStaticPaths'
import useCategoryPageStyles from 'components/CategoryPage/useCategoryPageStyles'
import getHeaderProps from 'components/Header/getHeaderProps'
import useHeaderSpacing from 'components/Header/useHeaderSpacing'
import ProductListFilters from 'components/ProductListFilters'
import ProductListItems from 'components/ProductListItems'
import ProductListItem from 'components/ProductListItems/ProductListItem'
import ProductListPagination from 'components/ProductListPagination'
import ProductListSort from 'components/ProductListSort'
import ProductListItemBundle from 'components/ProductTypeBundle/ProductListItemBundle'
import ProductListItemConfigurable from 'components/ProductTypeConfigurable/ProductListItemConfigurable'
import ProductListItemDownloadable from 'components/ProductTypeDownloadable/ProductListItemDownloadable'
import ProductListItemSimple from 'components/ProductTypeSimple/ProductListItemSimple'
import ProductListItemVirtual from 'components/ProductTypeVirtual/ProductListItemVirtual'
import ScrollSnapSlider from 'components/ScrollSnapSlider'
import ShopLayout, { PageWithShopLayout, ShopLayoutProps } from 'components/ShopLayout'
import getUrlResolveProps from 'components/ShopLayout/getUrlResolveProps'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import { GetStaticProps, GetStaticPaths } from 'next'
import NextError from 'next/error'
import React from 'react'

const CategoryPage: PageWithShopLayout<GetCategoryPageProps> = (props) => {
  const classes = useCategoryPageStyles(props)
  const { marginTop } = useHeaderSpacing()
  const { categoryList, products, filters, params, filterTypeMap } = props

  if (!categoryList || !categoryList[0] || !products || !params || !filters || !filterTypeMap)
    return <NextError statusCode={503} title='Loading skeleton' />

  return (
    <>
      <ProductListParamsProvider value={params}>
        <CategoryMeta {...categoryList[0]} />
        <Container className={clsx(classes.container, marginTop)}>
          <CategoryBreadcrumb
            name={categoryList[0].name}
            breadcrumbs={categoryList[0].breadcrumbs}
            className={classes.breadcrumb}
          />
          <CategoryDescription
            name={categoryList[0].name}
            description={categoryList[0].description}
            className={classes.description}
          />
          <ScrollSnapSlider classes={{ container: classes.filters }}>
            <CategoryChildren params={params} className={classes.filterItem}>
              {categoryList[0].children}
            </CategoryChildren>
            <ProductListSort sort_fields={products.sort_fields} className={classes.filterItem} />
            <ProductListFilters
              aggregations={filters.aggregations}
              filterTypeMap={filterTypeMap}
              className={classes.filterItem}
            />
          </ScrollSnapSlider>
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
            }}
          />
          <ProductListPagination page_info={products.page_info} className={classes.pagination} />
        </Container>
      </ProductListParamsProvider>
    </>
  )
}
CategoryPage.Layout = ShopLayout

export default CategoryPage

export const getStaticPaths: GetStaticPaths<{ url: string[] }> = () => {
  const client = apolloClient()
  return getCategoryStaticPaths(client)
}

export const getStaticProps: GetStaticProps<
  ShopLayoutProps & GetCategoryPageProps,
  { url: [string] }
> = async (ctx) => {
  if (!ctx.params) throw new Error('No params')

  const queryIndex = ctx.params.url.findIndex((slug) => slug === 'q')
  const qIndex = queryIndex < 0 ? ctx.params.url.length : queryIndex

  const url = ctx.params.url.slice(0, qIndex)

  const client = apolloClient()
  const staticClient = apolloClient()
  const config = getStoreConfig(client)
  const urlResolve = getUrlResolveProps({ urlKey: url.join('/') }, staticClient)
  const categoryPage = getCategoryPageProps(
    {
      urlParams: ctx.params.url.slice(qIndex + 1),
      urlResolve,
      url,
    },
    staticClient,
  )
  const navigation = getHeaderProps(staticClient, {
    rootCategory: String((await config).storeConfig?.root_category_id),
  })

  return {
    props: {
      ...(await urlResolve),
      ...(await navigation),
      ...(await categoryPage),
      apolloState: client.cache.extract(),
    },
    revalidate: 60 * 20,
  }
}
