import { PageOptions } from '@graphcommerce/framer-next-pages'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { AppShellTitle, BlogTitle, GetStaticProps, Row, Title } from '@graphcommerce/next-ui'
import { Container } from '@material-ui/core'
import { GetStaticPaths } from 'next'
import React from 'react'
import FullPageShell, { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import FullPageShellHeader from '../../components/AppShell/FullPageShellHeader'
import BlogList from '../../components/Blog'
import BlogAuthor from '../../components/Blog/BlogAuthor'
import BlogHeader from '../../components/Blog/BlogHeader'
import { BlogListDocument, BlogListQuery } from '../../components/Blog/BlogList.gql'
import { BlogPostPathsDocument } from '../../components/Blog/BlogPostPaths.gql'
import BlogTags from '../../components/Blog/BlogTags'
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
      <FullPageShellHeader>
        <Title size='small'>{title}</Title>
      </FullPageShellHeader>
      <Row>
        <PageMeta title={title} metaDescription={title} canonical={page.url} />

        <BlogTitle title={title} />

        {page.author ? <BlogAuthor author={page.author} date={page.date} /> : null}
        {page.asset ? <BlogHeader asset={page.asset} /> : null}
        <PageContent {...page} />
        <BlogTags relatedPages={page.relatedPages} />
      </Row>
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
