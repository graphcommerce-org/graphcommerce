import LayoutHeader, { LayoutHeaderProps } from 'components/AppShell/LayoutHeader'
import getLayoutHeaderProps from 'components/AppShell/getLayoutHeaderProps'
import useHeaderSpacing from 'components/AppShell/useHeaderSpacing'
import CmsPageContent from 'components/Cms/CmsPageContent'
import CmsPageMeta from 'components/Cms/CmsPageMeta'
import getCmsPageProps, { GetCmsPageProps } from 'components/Cms/getCmsPageProps'
import getUrlResolveProps from 'components/Page/getUrlResolveProps'
import { PageFC, PageStaticPathsFn, PageStaticPropsFn } from 'components/Page/types'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import NextError from 'next/error'
import React from 'react'

type PageComponent = PageFC<GetCmsPageProps, LayoutHeaderProps>
type GetPageStaticPaths = PageStaticPathsFn<{ url: string }>
type GetPageStaticProps = PageStaticPropsFn<PageComponent, { url: string }>

const PageWithLayout: PageComponent = ({ cmsPage }) => {
  const { marginTop } = useHeaderSpacing()

  if (!cmsPage) return <NextError statusCode={503} title='Loading skeleton' />

  if (!cmsPage.identifier) return <NextError statusCode={404} title='Page not found' />

  return (
    <>
      <CmsPageMeta {...cmsPage} />
      <div className={marginTop}>
        <CmsPageContent {...cmsPage} />
      </div>
    </>
  )
}

PageWithLayout.Layout = LayoutHeader

export default PageWithLayout

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
      ...(await urlResolve),
      ...(await layoutHeader),
      ...(await cmsPageProps),
      apolloState: client.cache.extract(),
    },
    revalidate: 60 * 20,
  }
}
