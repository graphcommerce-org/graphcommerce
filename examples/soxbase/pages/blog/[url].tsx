import Header, { HeaderProps } from '@reachdigital/magento-app-shell/Header'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { ResolveUrlDocument } from '@reachdigital/magento-store/ResolveUrl.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import FullPageUi from '@reachdigital/next-ui/AppShell/FullPageUi'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import NextError from 'next/error'
import React from 'react'
import BlogList, { BlogListProps } from '../../components/Blog'
import BlogHeader from '../../components/Blog/BlogHeader'
import { BlogListDocument } from '../../components/Blog/BlogList.gql'
import Footer, { FooterProps } from '../../components/Footer'
import { FooterDocument } from '../../components/Footer/Footer.gql'
import Page from '../../components/Page'
import { PageByUrlDocument, PageByUrlQuery } from '../../components/Page/PageByUrl.gql'
import apolloClient from '../../lib/apolloClient'

type Props = HeaderProps &
  FooterProps &
  PageByUrlQuery & { urlkey: string; currentUrl: string } & BlogListProps
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

const BlogPage = ({ menu, urlResolver, pages, footer, urlkey, BlogPosts }: Props) => {
  if (!pages) return <NextError statusCode={503} title='Loading skeleton' />
  if (!pages?.[0]) return <NextError statusCode={404} title='Page not found' />
  const page = pages[0]

  return (
    <FullPageUi title={page.title ?? ''}>
      <Header menu={menu} urlResolver={urlResolver} />
      <PageMeta
        title={page.title ?? ''}
        metaDescription={page.title ?? ''}
        metaRobots='INDEX, FOLLOW'
      />
      {urlkey !== 'blog/index' && <BlogHeader asset={page.asset} />}
      <Page {...page} />
      <BlogList BlogPosts={BlogPosts} />
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

  const resolveUrl = staticClient.query({ query: ResolveUrlDocument, variables: { urlKey } })
  const pageLayout = staticClient.query({ query: PageLayoutDocument })
  const footer = staticClient.query({ query: FooterDocument })
  const BlogPosts = staticClient.query({
    query: BlogListDocument,
    variables: { currentUrl: `blog/${urlKey}` },
  })

  const page = staticClient.query({
    query: PageByUrlDocument,
    variables: { url: `blog/${urlKey}` },
  })
  if (!(await page).data.pages?.[0]) return { notFound: true }
  return {
    props: {
      ...(await resolveUrl).data,
      ...(await footer).data,
      ...(await pageLayout).data,
      ...(await page).data,
      ...(await BlogPosts).data,
      apolloState: client.cache.extract(),
      urlkey: `blog/${urlKey}`,
    },
    revalidate: 60 * 20,
  }
}
