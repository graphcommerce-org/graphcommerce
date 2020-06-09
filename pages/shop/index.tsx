import React from 'react'
import ShopLayout, { PageWithShopLayout } from 'shop/venia-ui/ShopLayout'
import getNavigationProps from 'shop/venia-ui/ShopLayout/getNavigationProps'
import { GetStaticProps } from 'next'
import getUrlResolveProps from 'shop/venia-ui/ShopLayout/getUrlResolveProps'
import getCmsPageProps, { GetCmsPageProps } from 'shop/venia-ui/RootComponents/CMS/getCmsPageProps'
import CmsPage from 'shop/venia-ui/RootComponents/CMS'

const PageWithLayout: PageWithShopLayout<GetCmsPageProps> = (props) => {
  return <CmsPage {...props} />
}
PageWithLayout.layout = ShopLayout

export default PageWithLayout

export const getStaticProps: GetStaticProps = async () => {
  const variables = await getUrlResolveProps({ urlKey: '/' })
  const data = await Promise.all([getNavigationProps(variables), getCmsPageProps(variables)])
  return { props: { ...variables, ...Object.assign(...data) } }
}
