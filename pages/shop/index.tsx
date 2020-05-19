import React from 'react'
import ShopLayout, { PageWithShopLayout } from 'shop/ShopLayout'
import getNavigationProps from 'shop/ShopLayout/getNavigationProps'
import { GetStaticProps } from 'next'
import getUrlResolveProps from 'shop/ShopLayout/getUrlResolveProps'
import getCmsPageProps, { GetCmsPageProps } from 'shop/RootComponents/CmsPage/getCmsPageProps'
import CmsPage from 'shop/RootComponents/CmsPage'

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
