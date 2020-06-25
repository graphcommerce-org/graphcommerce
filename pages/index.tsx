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
  const urlResolve = getUrlResolveProps({ urlKey: '/' })
  const navigationProps = getNavigationProps()
  const cmsPageProps = getCmsPageProps(urlResolve)

  return {
    props: {
      ...(await urlResolve),
      ...(await navigationProps),
      ...(await cmsPageProps),
    },
  }
}
