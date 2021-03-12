import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'
import FullPageUi from '../../components/AppShell/FullPageUi'
import BlogList from '../../components/Blog'
import BlogHeader from '../../components/Blog/BlogHeader'
import { BlogListDocument, BlogListQuery } from '../../components/Blog/BlogList.gql'
import { BlogPostPathsDocument } from '../../components/Blog/BlogPostPaths.gql'
import { DefaultPageDocument, DefaultPageQuery } from '../../components/GraphQL/DefaultPage.gql'
import PageContent from '../../components/PageContent'
import apolloClient from '../../lib/apolloClient'

type Props = DefaultPageQuery & BlogListQuery
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

function BlogPage(props: Props) {
  const { pages, blogPosts } = props
  const page = pages[0]

  const title = page.title ?? ''
  return (
    <FullPageUi title={title} backFallbackTitle='Blog' backFallbackHref='/' {...props}>
      <PageMeta title={title} metaDescription={title} />
      <BlogHeader asset={page.asset} />
      <PageContent {...page} />
      <BlogList blogPosts={blogPosts} />
    </FullPageUi>
  )
}

BlogPage.Layout = PageLayout

registerRouteUi('/blog/[url]', FullPageUi)

export default BlogPage

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const responses = locales.map(async (locale) => {
    const staticClient = apolloClient(locale)
    const BlogPostPaths = staticClient.query({ query: BlogPostPathsDocument })
    const { pages } = (await BlogPostPaths).data
    return (
      pages.map((page) => ({ params: { url: `${page?.url}`.replace('blog/', '') }, locale })) ?? []
    )
  })
  const paths = (await Promise.all(responses)).flat(1)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ locale, params }) => {
  const urlKey = params?.url ?? '??'
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)
  const limit = 4
  const config = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: { url: `blog/${urlKey}` },
  })

  const blogPosts = staticClient.query({
    query: BlogListDocument,
    variables: { currentUrl: [`blog/${urlKey}`], first: limit },
  })
  if (!(await page).data.pages?.[0]) return { notFound: true }

  return {
    props: {
      ...(await page).data,
      ...(await blogPosts).data,
      urlEntity: { relative_url: `blog/${urlKey}` },
      apolloState: await config.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
