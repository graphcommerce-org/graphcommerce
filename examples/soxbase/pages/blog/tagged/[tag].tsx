import { PageOptions, usePageRouter } from '@reachdigital/framer-next-pages'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import { BlogTitle, GetStaticProps } from '@reachdigital/next-ui'
import { GetStaticPaths } from 'next'
import React from 'react'
import FullPageShell, { FullPageShellProps } from '../../../components/AppShell/FullPageShell'
import BlogList from '../../../components/Blog'
import { BlogListTagsDocument, BlogListTagsQuery } from '../../../components/Blog/BlogListTags.gql'
import { BlogPathsDocument, BlogPathsQuery } from '../../../components/Blog/BlogPaths.gql'
import { DefaultPageDocument, DefaultPageQuery } from '../../../components/GraphQL/DefaultPage.gql'
import apolloClient from '../../../lib/apolloClient'

export const config = { unstable_JsPreload: false }

type Props = DefaultPageQuery & BlogListTagsQuery & BlogPathsQuery & { tag: string }
type RouteProps = { page: string; tag: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props, RouteProps>

const pageSize = 8

function BlogPage(props: Props) {
  const { pages, blogPosts, pagesConnection, tag } = props
  const router = usePageRouter()
  const page = pages[0]
  const title = page.title ?? ''

  return (
    <>
      <PageMeta title={title} metaDescription={title} canonical={page.url} />
      <BlogTitle title={`Tagged in: ${tag}`} />
      <BlogList blogPosts={blogPosts} />
    </>
  )
}

BlogPage.pageOptions = {
  SharedComponent: FullPageShell,
} as PageOptions

export default BlogPage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const responses = locales.map(async (locale) => {
    const staticClient = apolloClient(locale)
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
  const tag = String(params?.tag[0].toUpperCase()) + String(params?.tag.slice(1))

  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const defaultPage = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: 'blog',
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })
  const blogPosts = staticClient.query({
    query: BlogListTagsDocument,
    variables: { currentUrl: ['blog'], first: pageSize, tag },
  })
  const blogPaths = staticClient.query({ query: BlogPathsDocument })

  if (!(await defaultPage).data.pages?.[0]) return { notFound: true }
  if (!(await blogPosts).data.blogPosts.length) return { notFound: true }
  if (Number(params?.page) <= 0) return { notFound: true }

  return {
    props: {
      tag,
      ...(await defaultPage).data,
      ...(await blogPosts).data,
      ...(await blogPaths).data,
      urlEntity: { relative_url: `blog` },
      apolloState: await conf.then(() => client.cache.extract()),
      backFallbackHref: '/blog',
      backFallbackTitle: 'Blog',
    },
    revalidate: 60 * 20,
  }
}
