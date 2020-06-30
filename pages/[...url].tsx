import React from 'react'
import ShopLayout, { PageWithShopLayout, ShopLayoutProps } from 'components/ShopLayout'
import getNavigationProps from 'components/ShopLayout/getNavigationProps'
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
import { default as NextError } from 'next/error'
import { Container } from '@material-ui/core'
import useProductPageStyles from 'components/ProductPage/useProductPageStyles'

const PageWithLayout: PageWithShopLayout<GetCategoryPageProps> = ({
  categoryList,
  products,
  filters,
  params,
  storeConfig,
  filterTypeMap,
}) => {
  const classes = useProductPageStyles()
  if (!categoryList || !categoryList[0]) return <NextError statusCode={404}>404</NextError>

  return (
    <>
      <CategoryMeta {...categoryList[0]} />
      <Container className={classes.container}>
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
        <CategoryChildren
          categoryChildren={categoryList[0].categoryChildren}
          className={classes.childCategories}
        />
        <ProductListPagination
          page_info={products.page_info}
          params={params}
          className={classes.pagination}
        />
        <div className={classes.filters}>
          <ProductListFilters
            aggregations={filters.aggregations}
            params={params}
            filterTypeMap={filterTypeMap}
          />
        </div>
        <ProductListSort
          sort_fields={products.sort_fields}
          params={params}
          defaultSort={storeConfig.catalog_default_sort_by}
          className={classes.sort}
        />

        <ProductListItems items={products.items} className={classes.items} />
      </Container>
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

  // @todo slice everything before queryParam?
  const url = ctx.params.url.slice(0, 1)

  const urlResolve = getUrlResolveProps({ urlKey: `${url.join('/')}.html` })
  const navigationProps = getNavigationProps()
  const categoryPageProps = getCategoryPageProps({
    urlParams: ctx.params.url.slice(1),
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
