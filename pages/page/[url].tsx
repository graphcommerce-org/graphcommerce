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
import apolloClient from 'lib/apolloClient'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'

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
  }
}
