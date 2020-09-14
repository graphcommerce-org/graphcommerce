import getCmsPageProps, { GetCmsPageProps } from 'components/CmsPage/getCmsPageProps'
import CmsPageContent from 'components/CmsPageContent'
import CmsPageMeta from 'components/CmsPageMeta'
import getHeaderProps from 'components/Header/getHeaderProps'
import useHeaderSpacing from 'components/Header/useHeaderSpacing'
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
  const navigation = getHeaderProps(staticClient, {
    rootCategory: String((await config).storeConfig?.root_category_id),
  })

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
