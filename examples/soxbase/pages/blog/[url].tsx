import { Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { StoreConfigDocument, PageMeta } from '@reachdigital/magento-store'
import { GetStaticProps } from '@reachdigital/next-ui'
import { GetStaticPaths } from 'next'
import React from 'react'
import FullPageShell, { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import BlogList from '../../components/Blog'
import BlogAuthor from '../../components/Blog/BlogAuthor'
import BlogHeader from '../../components/Blog/BlogHeader'
import { BlogListDocument, BlogListQuery } from '../../components/Blog/BlogList.gql'
import { BlogPostPathsDocument } from '../../components/Blog/BlogPostPaths.gql'
import BlogTags from '../../components/Blog/BlogTags'
import BlogTitle from '../../components/Blog/BlogTitle'
import { DefaultPageDocument, DefaultPageQuery } from '../../components/GraphQL/DefaultPage.gql'
import PageContent from '../../components/PageContent'
import apolloClient from '../../lib/apolloClient'

export const config = { unstable_JsPreload: false }

type Props = DefaultPageQuery & BlogListQuery
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props, RouteProps>

function BlogPage(props: Props) {
  const { pages, blogPosts } = props
  const page = pages[0]

  const title = page.title ?? ''
  return (
    <>
      <PageMeta title={title} metaDescription={title} canonical={page.url} />
      <BlogTitle title={page.title} />
      <BlogAuthor author={page.author} date={page.date} />
      <BlogHeader asset={page.asset} />
      <PageContent {...page} />
      <BlogTags tags={page.blogTags} />
      <BlogList blogPosts={blogPosts} />
    </>
  )
}

BlogPage.pageOptions = {
  SharedComponent: FullPageShell,
} as PageOptions

export default BlogPage

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.VERCEL_ENV !== 'production') return { paths: [], fallback: 'blocking' }

  const responses = locales.map(async (locale) => {
    const staticClient = apolloClient(locale)
    const BlogPostPaths = staticClient.query({ query: BlogPostPathsDocument })
    const { pages } = (await BlogPostPaths).data
    return (
      pages.map((page) => ({ params: { url: `${page?.url}`.replace('blog/', '') }, locale })) ?? []
    )
  })
  const paths = (await Promise.all(responses)).flat(1)
  return {
    paths: process.env.VERCEL_ENV !== 'production' ? paths.slice(0, 1) : paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetPageStaticProps = async ({ locale, params }) => {
  const urlKey = params?.url ?? '??'
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)
  const limit = 4
  const conf = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: `blog/${urlKey}`,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
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
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
