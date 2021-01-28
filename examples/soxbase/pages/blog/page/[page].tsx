import Header, { HeaderProps } from '@reachdigital/magento-app-shell/Header'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import FullPageUi from '@reachdigital/next-ui/AppShell/FullPageUi'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import Pagination from '@reachdigital/next-ui/Pagination'
import NextError from 'next/error'
import { useRouter } from 'next/router'
import React from 'react'
import BlogList from '../../../components/Blog'
import { BlogListDocument, BlogListQuery } from '../../../components/Blog/BlogList.gql'
import { BlogPathsDocument, BlogPathsQuery } from '../../../components/Blog/BlogPaths.gql'

import Footer, { FooterProps } from '../../../components/Footer'
import { FooterDocument } from '../../../components/Footer/Footer.gql'
import Page from '../../../components/Page'
import { PageByUrlDocument, PageByUrlQuery } from '../../../components/Page/PageByUrl.gql'
import apolloClient from '../../../lib/apolloClient'

type Props = HeaderProps & FooterProps & PageByUrlQuery & BlogListQuery & BlogPathsQuery
type RouteProps = { page: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

const BlogPage = ({ menu, urlResolver, pages, footer, blogPosts, pagesConnection }: Props) => {
  const router = useRouter()
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
      <Page {...page} />
      <BlogList blogPosts={blogPosts} />
      <Pagination
        count={Math.max(pagesConnection.aggregate.count / 10)}
        page={Number(router.query.page ? router.query.page : 1)}
        url={(p) => `/blog/page/${p}`}
      />
      <Footer footer={footer} />
    </FullPageUi>
  )
}

BlogPage.Layout = PageLayout

registerRouteUi('/blog/page/[page]', FullPageUi)

export default BlogPage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  const responses = locales.map(async (locale) => {
    const pageSize = 8
    const staticClient = apolloClient(localeToStore(locale))
    const blogPosts = staticClient.query({ query: BlogPathsDocument })
    const total = Math.ceil((await blogPosts).data.pagesConnection.aggregate.count / pageSize)
    const pages: string[] = []
    for (let i = 1; i < total - 1; i++) {
      pages.push(String(i + 1))
    }
    return pages.map((page) => ({ params: { page }, locale }))
  })
  const paths = (await Promise.all(responses)).flat(1)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ locale, params }) => {
  const pageSize = 8
  const skip = Math.abs((Number(params?.page ?? '1') - 1) * pageSize)
  const client = apolloClient(localeToStore(locale))
  const staticClient = apolloClient(localeToStore(locale))
  const pageLayout = staticClient.query({ query: PageLayoutDocument })
  const footer = staticClient.query({ query: FooterDocument })
  const blogPosts = staticClient.query({
    query: BlogListDocument,
    variables: { currentUrl: ['blog'], first: pageSize, skip },
  })
  const blogPaths = staticClient.query({ query: BlogPathsDocument })
  const gcmsPage = staticClient.query({
    query: PageByUrlDocument,
    variables: { url: `blog` },
  })

  if (!(await gcmsPage).data.pages?.[0]) return { notFound: true }
  if (!(await blogPosts).data.blogPosts.length) return { notFound: true }
  if (Number(params?.page) <= 0) return { notFound: true }

  return {
    props: {
      urlResolver: { relative_url: `blog` },
      ...(await footer).data,
      ...(await pageLayout).data,
      ...(await gcmsPage).data,
      ...(await blogPosts).data,
      ...(await blogPaths).data,
      apolloState: client.cache.extract(),
    },
    revalidate: 60 * 20,
  }
}
