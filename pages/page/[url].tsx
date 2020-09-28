import getAppShellProps from 'components/AppLayout/getAppShellProps'
import useHeaderSpacing from 'components/AppLayout/useHeaderSpacing'
import CmsPageContent from 'components/Cms/CmsPageContent'
import CmsPageMeta from 'components/Cms/CmsPageMeta'
import getCmsPageProps, { GetCmsPageProps } from 'components/Cms/getCmsPageProps'
import ShopLayout, { PageWithShopLayout, ShopLayoutProps } from 'components/ShopLayout'
import getUrlResolveProps from 'components/ShopLayout/getUrlResolveProps'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import { GetStaticProps, GetStaticPaths } from 'next'
import NextError from 'next/error'
import React from 'react'

const PageWithLayout: PageWithShopLayout<GetCmsPageProps> = ({ cmsPage }) => {
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

PageWithLayout.Layout = ShopLayout

export default PageWithLayout

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { url: 'home' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<
  ShopLayoutProps & GetCmsPageProps,
  { url: string }
> = async (ctx: { params: { url: string } }) => {
  const client = apolloClient()
  const staticClient = apolloClient()

  const config = getStoreConfig(client)
  const urlResolve = getUrlResolveProps({ urlKey: ctx.params.url }, staticClient)
  const cmsPageProps = getCmsPageProps(
    (ctx.params.url === '/' && (await config)?.storeConfig?.cms_home_page) || ctx.params.url,
    staticClient,
  )
  const navigation = getAppShellProps(staticClient)

  return {
    props: {
      ...(await urlResolve),
      ...(await navigation),
      ...(await cmsPageProps),
      apolloState: client.cache.extract(),
    },
    revalidate: 60 * 20,
  }
}
