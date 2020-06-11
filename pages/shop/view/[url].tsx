import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import ShopLayout, { ShopLayoutProps, PageWithShopLayout } from 'shop/venia-ui/ShopLayout'
import getUrlResolveProps from 'shop/venia-ui/ShopLayout/getUrlResolveProps'
import getNavigationProps from 'shop/venia-ui/ShopLayout/getNavigationProps'
import getProductPageProps, {
  GetProductPageProps,
} from 'shop/venia-ui/RootComponents/ProductPage/getProductProps'
import ProductPage from 'shop/venia-ui/RootComponents/ProductPage'

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
  const urlResolve = getUrlResolveProps({ urlKey: `${ctx.params.url}.html` })
  const data = await Promise.all([
    getNavigationProps(),
    getProductPageProps({
      ...(await urlResolve),
      urlKey: ctx.params.url,
      onServer: true,
    }),
  ])
  return { props: { ...(await urlResolve), ...Object.assign(...data) } }
}
