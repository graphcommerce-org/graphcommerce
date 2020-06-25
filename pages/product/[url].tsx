import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import ShopLayout, { ShopLayoutProps, PageWithShopLayout } from 'components/ShopLayout'
import getUrlResolveProps from 'components/ShopLayout/getUrlResolveProps'
import getNavigationProps from 'components/ShopLayout/getNavigationProps'
import getProductPageProps, { GetProductPageProps } from 'components/ProductPage/getProductProps'

const PageWithLayout: PageWithShopLayout<GetProductPageProps> = (props) => {
  return <></>
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
  const navigation = getNavigationProps()
  const productPage = getProductPageProps({ urlKey: ctx.params.url })

  return {
    props: {
      ...(await urlResolve),
      ...(await navigation),
      ...(await productPage),
    },
  }
}
