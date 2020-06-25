import React from 'react'
import ShopLayout, { PageWithShopLayout } from 'components/ShopLayout'
import getNavigationProps from 'components/ShopLayout/getNavigationProps'
import { GetStaticProps } from 'next'
import getUrlResolveProps from 'components/ShopLayout/getUrlResolveProps'
import getCmsPageProps, { GetCmsPageProps } from 'components/CmsPage/getCmsPageProps'
import { default as NextError } from 'next/error'
import CmsPageMeta from 'components/CmsPageMeta'
import CmsPageContent from 'components/CmsPageContent'

const PageWithLayout: PageWithShopLayout<GetCmsPageProps> = ({ cmsPage, storeConfig }) => {
  if (!cmsPage) return <NextError statusCode={404} />

  return (
    <>
      <CmsPageMeta {...cmsPage} {...storeConfig} />
      <CmsPageContent {...cmsPage} />
    </>
  )
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
