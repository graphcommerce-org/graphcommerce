import { ContentArea, PageContent, pageContent } from '@graphcommerce/content-areas'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  PageMeta,
  GetStaticProps,
  Pagination,
  LayoutTitle,
  LayoutHeader,
  Breadcrumbs,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Container, Link } from '@mui/material'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import {
  LayoutDocument,
  LayoutNavigation,
  LayoutNavigationProps,
  productListRenderer,
} from '../../../components'
import { graphqlSsrClient, graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'
import { cacheFirst } from '@graphcommerce/graphql'

type Props = BlogListQuery & BlogPathsQuery & { content: PageContent }
type RouteProps = { page: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

const pageSize = 16

function BlogPage(props: Props) {
  const { content, blogPosts, pagesConnection } = props
  const router = useRouter()

  return (
    <>
      <PageMeta {...content} />

      <LayoutHeader floatingMd>
        <LayoutTitle size='small' component='span'>
          {content.title}
        </LayoutTitle>
      </LayoutHeader>

      <Container maxWidth={false}>
        <Breadcrumbs breadcrumbs={[{ href: `/${page.url}`, name: title }]} />
        <LayoutTitle variant='h1'>{content.title}</LayoutTitle>
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

      <ContentArea content={content} productListRenderer={productListRenderer} />
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
    const staticClient = graphqlSsrClient({ locale })
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

export const getStaticProps: GetPageStaticProps = async (context) => {
  const { params } = context
  const skip = Math.abs((Number(params?.page ?? '1') - 1) * pageSize)
  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  const content = pageContent(staticClient, 'blog')
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const blogPosts = staticClient.query({
    query: BlogListDocument,
    variables: { currentUrl: ['blog'], first: pageSize, skip },
  })
  const blogPaths = staticClient.query({ query: BlogPathsDocument })

  if ((await content).notFound) return { notFound: true }
  if (!(await blogPosts).data.blogPosts.length) return { notFound: true }
  if (Number(params?.page) <= 0) return { notFound: true }

  return {
    props: {
      content: await content,
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
