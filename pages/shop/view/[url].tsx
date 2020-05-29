import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import ShopLayout, { ShopLayoutProps, PageWithShopLayout } from 'shop/ShopLayout'
import getUrlResolveProps from 'shop/ShopLayout/getUrlResolveProps'
import getNavigationProps from 'shop/ShopLayout/getNavigationProps'
import getProductPageProps, {
  GetProductPageProps,
} from 'shop/RootComponents/ProductPage/getProductProps'
import ProductPage from 'shop/RootComponents/ProductPage'

const PageWithLayout: PageWithShopLayout<GetProductPageProps> = (props) => {
  return <ProductPage {...props} />
}
PageWithLayout.layout = ShopLayout

export default PageWithLayout

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { url: 'isadora-skirt' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<
  ShopLayoutProps & GetProductPageProps,
  { url: string }
> = async (ctx) => {
  if (!ctx.params?.url) throw Error('No params')
  const variables = await getUrlResolveProps({ urlKey: `${ctx.params.url}.html` })
  const data = await Promise.all([
    getNavigationProps(variables),
    getProductPageProps({ ...variables, urlKey: ctx.params.url, onServer: true }),
  ])
  return { props: { ...variables, ...Object.assign(...data) } }
}
