import { PageOptions } from '@graphcommerce/framer-next-pages'
import { hygraphPageContent, HygraphPagesQuery } from '@graphcommerce/graphcms-ui'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  PageMeta,
  GetStaticProps,
  Pagination,
  LayoutTitle,
  LayoutHeader,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Container, Link } from '@mui/material'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import {
  BlogList,
  BlogListDocument,
  BlogListQuery,
  BlogPathsDocument,
  BlogPathsQuery,
  LayoutDocument,
  LayoutNavigation,
  LayoutNavigationProps,
  RowRenderer,
} from '../../../components'
import { graphqlSsrClient, graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type Props = HygraphPagesQuery & BlogListQuery & BlogPathsQuery
type RouteProps = { page: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

const pageSize = 16

function BlogPage(props: Props) {
  const { pages, blogPosts, pagesConnection } = props
  const router = useRouter()
  const page = pages[0]
  const title = page.title ?? ''

  return (
    <>
      <PageMeta title={title} metaDescription={title} canonical={`/${page.url}`} />

      <LayoutHeader floatingMd>
        <LayoutTitle size='small' component='span'>
          {title}
        </LayoutTitle>
      </LayoutHeader>

      <Container maxWidth='xl'>
        <LayoutTitle variant='h1'>{title}</LayoutTitle>
      </Container>

      <BlogList blogPosts={blogPosts} />
      <Pagination
        count={Math.ceil(pagesConnection.aggregate.count / pageSize)}
        page={Number(router.query.page ? router.query.page : 1)}
        renderLink={(p: number, icon: React.ReactNode) => (
          <Link href={p === 1 ? '/blog' : `/blog/page/${p}`} color='primary' underline='hover'>
            {icon}
          </Link>
        )}
      />

      <RowRenderer content={page.content} />
    </>
  )
}

BlogPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default BlogPage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const responses = locales.map(async (locale) => {
    const staticClient = graphqlSsrClient(locale)
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
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  const defaultPage = hygraphPageContent(staticClient, 'blog')
  const layout = staticClient.query({ query: LayoutDocument, fetchPolicy: 'cache-first' })

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
      ...(await layout).data,
      urlEntity: { relative_url: `blog` },
      up: { href: '/blog', title: i18n._(/* i18n */ 'Blog') },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
