import MenuTabs from '@reachdigital/magento-app-shell/MenuTabs'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument, PageLayoutQuery } from '@reachdigital/magento-app-shell/PageLayout.gql'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { ResolveUrlQuery } from '@reachdigital/magento-store/ResolveUrl.gql'
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
import FabMenu from '../../../components/FabMenu'

import Footer, { FooterProps } from '../../../components/Footer'
import { FooterDocument } from '../../../components/Footer/Footer.gql'
import HeaderActions from '../../../components/HeaderActions/HeaderActions'
import Logo from '../../../components/Logo/Logo'
import Page from '../../../components/Page'
import { PageByUrlDocument, PageByUrlQuery } from '../../../components/Page/PageByUrl.gql'
import apolloClient from '../../../lib/apolloClient'

type Props = FooterProps &
  PageByUrlQuery &
  BlogListQuery &
  BlogPathsQuery &
  PageLayoutQuery &
  ResolveUrlQuery
type RouteProps = { page: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

const pageSize = 8

const BlogPage = ({ menu, pages, footer, urlResolver, blogPosts, pagesConnection }: Props) => {
  const router = useRouter()
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
      <FabMenu menu={menu} urlResolver={urlResolver} />
      <PageMeta
        title={page.title ?? ''}
        metaDescription={page.title ?? ''}
        metaRobots='INDEX, FOLLOW'
      />
      <Page {...page} />
      <BlogList blogPosts={blogPosts} />
      <Pagination
        count={Math.ceil(pagesConnection.aggregate.count / pageSize)}
        page={Number(router.query.page ? router.query.page : 1)}
        root={'/blog'}
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
