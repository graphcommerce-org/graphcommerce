import { Link } from '@material-ui/core'
import { PageOptions, usePageRouter } from '@reachdigital/framer-next-pages'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import { GetStaticProps, Pagination } from '@reachdigital/next-ui'
import { GetStaticPaths } from 'next'
import PageLink from 'next/link'
import React from 'react'
import FullPageShell, { FullPageShellProps } from '../../../components/AppShell/FullPageShell'
import BlogList from '../../../components/Blog'
import { BlogListDocument, BlogListQuery } from '../../../components/Blog/BlogList.gql'
import { BlogPathsDocument, BlogPathsQuery } from '../../../components/Blog/BlogPaths.gql'
import { DefaultPageDocument, DefaultPageQuery } from '../../../components/GraphQL/DefaultPage.gql'
import PageContent from '../../../components/PageContent'
import apolloClient from '../../../lib/apolloClient'

type Props = DefaultPageQuery & BlogListQuery & BlogPathsQuery
type RouteProps = { page: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props, RouteProps>

const pageSize = 16

function BlogPage(props: Props) {
  const { pages, blogPosts, pagesConnection } = props
  const router = usePageRouter()
  const page = pages[0]
  const title = page.title ?? ''

  return (
    <>
      <PageMeta title={title} metaDescription={title} canonical={page.url} />

      {pages?.[0] && <PageContent content={pages?.[0].content} />}
      <BlogList blogPosts={blogPosts} />
      <Pagination
        count={Math.ceil(pagesConnection.aggregate.count / pageSize)}
        page={Number(router.query.page ? router.query.page : 1)}
        renderLink={(p: number, icon: React.ReactNode) => (
          <PageLink href={p === 1 ? '/blog' : `/blog/page/${p}`} passHref>
            <Link color='primary'>{icon}</Link>
          </PageLink>
        )}
      />
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
    query: BlogListDocument,
    variables: { currentUrl: ['blog'], first: pageSize, skip },
  })
  const blogPaths = staticClient.query({ query: BlogPathsDocument })

  if (!(await defaultPage).data.pages?.[0]) return { notFound: true }
  if (!(await blogPosts).data.blogPosts.length) return { notFound: true }
  if (Number(params?.page) <= 0) return { notFound: true }

  return {
    props: {
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
