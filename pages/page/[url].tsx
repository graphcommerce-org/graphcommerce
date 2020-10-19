import FullPageUi, { FullPageUiProps } from 'components/AppShell/FullPageUi'
import PageLayout, { PageLayoutProps } from 'components/AppShell/PageLayout'
import getLayoutHeaderProps from 'components/AppShell/getLayoutHeaderProps'
import CmsPageContent from 'components/Cms/CmsPageContent'
import CmsPageMeta from 'components/Cms/CmsPageMeta'
import getCmsPageProps, { GetCmsPageProps } from 'components/Cms/getCmsPageProps'
import getUrlResolveProps from 'components/Page/getUrlResolveProps'
import { PageFC, PageStaticPathsFn, PageStaticPropsFn } from 'components/Page/types'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import NextError from 'next/error'
import React from 'react'

type PageComponent = PageFC<GetCmsPageProps, PageLayoutProps>
type GetPageStaticPaths = PageStaticPathsFn<{ url: string }>
type GetPageStaticProps = PageStaticPropsFn<PageComponent, { url: string }>

const CmsPage: PageComponent = ({ cmsPage }) => {
  if (!cmsPage) return <NextError statusCode={503} title='Loading skeleton' />

  if (!cmsPage.identifier) return <NextError statusCode={404} title='Page not found' />

  return (
    <FullPageUi title={cmsPage.title ?? ''}>
      <CmsPageMeta {...cmsPage} />
      <CmsPageContent {...cmsPage} />
    </FullPageUi>
  )
}

CmsPage.Layout = PageLayout

export default CmsPage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async () => {
  return {
    paths: [{ params: { url: 'home' } }],
    fallback: true,
  }
}

export const getStaticProps: GetPageStaticProps = async (ctx: { params: { url: string } }) => {
  const client = apolloClient()
  const staticClient = apolloClient()

  const config = getStoreConfig(client)
  const urlResolve = getUrlResolveProps({ urlKey: ctx.params.url }, staticClient)
  const cmsPageProps = getCmsPageProps(
    (ctx.params.url === '/' && (await config)?.storeConfig?.cms_home_page) || ctx.params.url,
    staticClient,
  )
  const layoutHeader = getLayoutHeaderProps(staticClient)

  return {
    props: {
      title: (await cmsPageProps).cmsPage?.title ?? '',
      ...(await urlResolve),
      ...(await layoutHeader),
      ...(await cmsPageProps),
      apolloState: client.cache.extract(),
    },
    revalidate: 60 * 20,
  }
}
