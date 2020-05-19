import React from 'react'
import ShopLayout, { PageWithShopLayout, ShopLayoutProps } from 'shop/ShopLayout'
import getNavigationProps from 'shop/ShopLayout/getNavigationProps'
import { GetStaticProps, GetStaticPaths } from 'next'
import getUrlResolveProps from 'shop/ShopLayout/getUrlResolveProps'
import getCmsPageProps, { GetCmsPageProps } from 'shop/RootComponents/CmsPage/getCmsPageProps'
import CmsPage from 'shop/RootComponents/CmsPage'

const PageWithLayout: PageWithShopLayout<GetCmsPageProps> = (props) => {
  return <CmsPage {...props} />
}
PageWithLayout.layout = ShopLayout

export default PageWithLayout

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { url: 'home' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<
  ShopLayoutProps & GetCmsPageProps,
  { url: string }
> = async (ctx) => {
  if (!ctx.params) throw Error('No params')
  const variables = await getUrlResolveProps({ urlKey: ctx.params.url })
  if (!variables.id) throw Error('Page not found')
  const data = await Promise.all([getNavigationProps(variables), getCmsPageProps(variables)])
  return { props: { ...variables, ...Object.assign(...data) } }
}
