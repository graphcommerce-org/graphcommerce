import React from 'react'
import ShopLayout, { PageWithShopLayout, ShopLayoutProps } from 'shop/venia-ui/ShopLayout'
import getNavigationProps from 'shop/venia-ui/ShopLayout/getNavigationProps'
import { GetStaticProps, GetStaticPaths } from 'next'
import getUrlResolveProps from 'shop/venia-ui/ShopLayout/getUrlResolveProps'
import getCmsPageProps, { GetCmsPageProps } from 'shop/venia-ui/RootComponents/CMS/getCmsPageProps'
import CmsPage from 'shop/venia-ui/RootComponents/CMS'

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
  const urlResolve = await getUrlResolveProps({ urlKey: ctx.params.url })
  const data = await Promise.all([getNavigationProps(), getCmsPageProps(urlResolve)])
  return { props: { ...urlResolve, ...Object.assign(...data) } }
}
