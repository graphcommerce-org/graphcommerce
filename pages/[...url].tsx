import React from 'react'
import ShopLayout, { PageWithShopLayout, ShopLayoutProps } from 'components/ShopLayout'
import getHeaderProps from 'components/Header/getHeaderProps'
import { GetStaticProps, GetStaticPaths } from 'next'
import getUrlResolveProps from 'components/ShopLayout/getUrlResolveProps'
import getCategoryPageProps, {
  GetCategoryPageProps,
} from 'components/CategoryPage/getCategoryPageProps'
import CategoryMeta from 'components/CategoryMeta'
import CategoryBreadcrumb from 'components/CategoryBreadcrumb'
import CategoryDescription from 'components/CategoryDescription'
import CategoryChildren from 'components/CategoryChildren'
import ProductListPagination from 'components/ProductListPagination'
import ProductListSort from 'components/ProductListSort'
import ProductListFilters from 'components/ProductListFilters'
import ProductListItems from 'components/ProductListItems'
import NextError from 'next/error'
import { Container } from '@material-ui/core'
import useCategoryPageStyles from 'components/CategoryPage/useCategoryPageStyles'
import ScrollSnapSlider from 'components/ScrollSnapSlider'
import { useHeaderSpacing } from 'components/Header'
import clsx from 'clsx'
import { ProductListParamsProvider } from 'components/CategoryPage/CategoryPageContext'
import ProductListItemSimple from 'components/ProductTypeSimple/ProductListItemSimple'
import ProductListItemConfigurable from 'components/ProductTypeConfigurable/ProductListItemConfigurable'
import ProductListItem from 'components/ProductListItems/ProductListItem'

const PageWithLayout: PageWithShopLayout<GetCategoryPageProps> = (props) => {
  const { categoryList, products, filters, params, storeConfig, filterTypeMap } = props
  const classes = useCategoryPageStyles(props)
  const { marginTop } = useHeaderSpacing()

  // @todo implement skeleton loading
  if (!categoryList || !categoryList[0]) return <NextError statusCode={404}>404</NextError>

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
            <ProductListSort
              sort_fields={products.sort_fields}
              defaultSort={storeConfig.catalog_default_sort_by}
              className={classes.filterItem}
            />
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
              BundleProduct: ProductListItem,
              VirtualProduct: ProductListItem,
              DownloadableProduct: ProductListItem,
              GiftCardProduct: ProductListItem,
              GroupedProduct: ProductListItem,
            }}
          />
          <ProductListPagination page_info={products.page_info} className={classes.pagination} />
        </Container>
      </ProductListParamsProvider>
    </>
  )
}
PageWithLayout.layout = ShopLayout

export default PageWithLayout

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { url: ['venia-bottoms'] } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<
  ShopLayoutProps & GetCategoryPageProps,
  { url: [string] }
> = async (ctx) => {
  if (!ctx.params) throw new Error('No params')

  const queryIdnex = ctx.params.url.findIndex((slug) => slug === 'q')
  const qIndex = queryIdnex < 0 ? ctx.params.url.length : queryIdnex

  const url = ctx.params.url.slice(0, qIndex)

  const urlResolve = getUrlResolveProps({ urlKey: `${url.join('/')}.html` })
  const navigationProps = getHeaderProps()
  const categoryPageProps = getCategoryPageProps({
    urlParams: ctx.params.url.slice(qIndex + 1),
    urlResolve,
    url,
  })

  return {
    props: {
      ...(await urlResolve),
      ...(await navigationProps),
      ...(await categoryPageProps),
    },
  }
}
