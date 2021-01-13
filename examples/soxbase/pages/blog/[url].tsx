import MenuTabs from '@reachdigital/magento-app-shell/MenuTabs'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument, PageLayoutQuery } from '@reachdigital/magento-app-shell/PageLayout.gql'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { ResolveUrlQuery } from '@reachdigital/magento-store/ResolveUrl.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import FullPageUi from '@reachdigital/next-ui/AppShell/FullPageUi'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import NextError from 'next/error'
import React from 'react'
import BlogList from '../../components/Blog'
import BlogHeader from '../../components/Blog/BlogHeader'
import { BlogListDocument, BlogListQuery } from '../../components/Blog/BlogList.gql'
import Footer from '../../components/Footer'
import { FooterDocument, FooterQuery } from '../../components/Footer/Footer.gql'
import HeaderActions from '../../components/HeaderActions/HeaderActions'
import Logo from '../../components/Logo/Logo'
import Page from '../../components/Page'
import { PageByUrlDocument, PageByUrlQuery } from '../../components/Page/PageByUrl.gql'
import apolloClient from '../../lib/apolloClient'

type Props = PageLayoutQuery & ResolveUrlQuery & FooterQuery & PageByUrlQuery & BlogListQuery
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

const BlogPage = ({ menu, urlResolver, pages, footer, blogPosts }: Props) => {
  if (!pages) return <NextError statusCode={503} title='Loading skeleton' />
  if (!pages?.[0]) return <NextError statusCode={404} title='Page not found' />
  const page = pages[0]

  return (
    <FullPageUi
      title={page.title ?? ''}
      menu={<MenuTabs menu={menu} urlResolver={urlResolver} />}
      logo={<Logo />}
      actions={<HeaderActions />}
    >
      <PageMeta
        title={page.title ?? ''}
        metaDescription={page.title ?? ''}
        metaRobots='INDEX, FOLLOW'
      />
      {urlResolver?.relative_url !== 'blog/index' && <BlogHeader asset={page.asset} />}
      <Page {...page} />
      <BlogList blogPosts={blogPosts} />
      <Footer footer={footer} />
    </FullPageUi>
  )
}

BlogPage.Layout = PageLayout

registerRouteUi('/blog/[url]', FullPageUi)

export default BlogPage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  const urls = ['index']
  const paths = locales.map((locale) => urls.map((url) => ({ params: { url }, locale }))).flat(1)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ locale, params }) => {
  const urlKey = params?.url ?? '??'
  const client = apolloClient(localeToStore(locale))
  const staticClient = apolloClient(localeToStore(locale))
  const limit = urlKey === 'index' ? 100 : 4

  const pageLayout = staticClient.query({ query: PageLayoutDocument })
  const footer = staticClient.query({ query: FooterDocument })
  const blogPosts = staticClient.query({
    query: BlogListDocument,
    variables: { currentUrl: [`blog/${urlKey}`, 'blog/index'], first: limit },
  })

  const gcmsPage = staticClient.query({
    query: PageByUrlDocument,
    variables: { url: `blog/${urlKey}` },
  })
  if (!(await gcmsPage).data.pages?.[0]) return { notFound: true }

  return {
    props: {
      urlResolver: { relative_url: `blog/${urlKey}` },
      ...(await footer).data,
      ...(await pageLayout).data,
      ...(await gcmsPage).data,
      ...(await blogPosts).data,
      apolloState: client.cache.extract(),
    },
    revalidate: 60 * 20,
  }
}
