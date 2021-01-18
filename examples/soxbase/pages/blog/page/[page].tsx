import Header, { HeaderProps } from '@reachdigital/magento-app-shell/Header'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import FullPageUi from '@reachdigital/next-ui/AppShell/FullPageUi'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import Pagination, { PagePaginationProps } from '@reachdigital/next-ui/Pagination'
import NextError from 'next/error'
import React from 'react'
import BlogList from '../../../components/Blog'
import { BlogListDocument, BlogListQuery } from '../../../components/Blog/BlogList.gql'
import Footer, { FooterProps } from '../../../components/Footer'
import { FooterDocument } from '../../../components/Footer/Footer.gql'
import Page from '../../../components/Page'
import { PageByUrlDocument, PageByUrlQuery } from '../../../components/Page/PageByUrl.gql'
import apolloClient from '../../../lib/apolloClient'
import TestStatic from '../../test/static'

type Props = HeaderProps & FooterProps & PageByUrlQuery & BlogListQuery & PagePaginationProps
type RouteProps = { page: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

const BlogPage = ({
  menu,
  urlResolver,
  paginationInfo,
  pages,
  footer,
  blogPosts,
  pageUrls,
}: Props) => {
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
      <BlogList blogPosts={blogPosts} pageUrls={pageUrls} />
      <Pagination paginationInfo={paginationInfo} />
      <Footer footer={footer} />
    </FullPageUi>
  )
}

BlogPage.Layout = PageLayout

registerRouteUi('/blog/page/[page]', FullPageUi)

export default BlogPage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  const paginationSize = 8
  const staticClient = apolloClient(localeToStore(locales[0]))
  const blogPosts = staticClient.query({
    query: BlogListDocument,
    variables: { currentUrl: ['blog'] },
  })
  const total = Math.ceil((await blogPosts).data.pageUrls.length / paginationSize)
  const pages: string[] = []
  for (let i = 0; i < total; i++) {
    pages.push(String(i + 1))
  }
  const paths = locales.map((locale) => pages.map((page) => ({ params: { page }, locale }))).flat(1)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ locale, params }) => {
  const pageSize = 8
  const skip = Math.abs((Number(params?.page ?? '1') - 1) * pageSize)
  const client = apolloClient(localeToStore(locale))
  const staticClient = apolloClient(localeToStore(locale))
  const current = params?.page ? Number(params?.page) : 1

  const pageLayout = staticClient.query({ query: PageLayoutDocument })
  const footer = staticClient.query({ query: FooterDocument })
  const blogPosts = staticClient.query({
    query: BlogListDocument,
    variables: { currentUrl: ['blog'], first: pageSize, skip },
  })

  const gcmsPage = staticClient.query({
    query: PageByUrlDocument,
    variables: { url: `blog` },
  })
  if (!(await gcmsPage).data.pages?.[0]) return { notFound: true }
  if (!(await blogPosts).data.blogPosts.length) return { notFound: true }
  if (Number(params?.page) <= 0) return { notFound: true }

  const total = Math.ceil((await blogPosts).data.pageUrls.length / pageSize)

  return {
    props: {
      urlResolver: { relative_url: `blog` },
      paginationInfo: { currentPage: current, totalPages: total, baseUrl: `blog` },
      ...(await footer).data,
      ...(await pageLayout).data,
      ...(await gcmsPage).data,
      ...(await blogPosts).data,
      apolloState: client.cache.extract(),
    },
    revalidate: 60 * 20,
  }
}
