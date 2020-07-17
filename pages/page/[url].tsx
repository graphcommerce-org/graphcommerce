import React from 'react'
import ShopLayout, { PageWithShopLayout, ShopLayoutProps } from 'components/ShopLayout'
import getHeaderProps from 'components/Header/getHeaderProps'
import { GetStaticProps, GetStaticPaths } from 'next'
import getUrlResolveProps from 'components/ShopLayout/getUrlResolveProps'
import getCmsPageProps, { GetCmsPageProps } from 'components/CmsPage/getCmsPageProps'
import NextError from 'next/error'
import CmsPageMeta from 'components/CmsPageMeta'
import CmsPageContent from 'components/CmsPageContent'
import { useHeaderSpacing } from 'components/Header/useHeaderSpacing'

const PageWithLayout: PageWithShopLayout<GetCmsPageProps> = ({ cmsPage, storeConfig }) => {
  const { marginTop } = useHeaderSpacing()

  if (!cmsPage || !storeConfig) return <NextError statusCode={503} title='Loading skeleton' />

  if (!cmsPage.identifier) return <NextError statusCode={404} title='Page not found' />

  return (
    <>
      <CmsPageMeta {...cmsPage} {...storeConfig} />
      <div className={marginTop}>
        <CmsPageContent {...cmsPage} />
      </div>
    </>
  )
}

PageWithLayout.Layout = ShopLayout

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
  const urlResolve = getUrlResolveProps({ urlKey: ctx.params.url })
  const navigationProps = getHeaderProps()
  const cmsPageProps = getCmsPageProps(urlResolve)

  return {
    props: {
      url: ctx.params.url,
      ...(await urlResolve),
      ...(await navigationProps),
      ...(await cmsPageProps),
    },
  }
}
