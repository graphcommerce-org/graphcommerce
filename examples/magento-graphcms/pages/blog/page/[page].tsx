import { PageOptions } from '@graphcommerce/framer-next-pages'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  PageMeta,
  GetStaticProps,
  Pagination,
  LayoutTitle,
  LayoutHeader,
} from '@graphcommerce/next-ui'
import { Container, Link } from '@mui/material'
import { GetStaticPaths } from 'next'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import {
  BlogList,
  BlogListDocument,
  BlogListQuery,
  BlogPathsDocument,
  BlogPathsQuery,
  LayoutFull,
  LayoutFullProps,
} from '../../../components'
import { DefaultPageDocument, DefaultPageQuery } from '../../../graphql/DefaultPage.gql'
import { graphqlSsrClient, graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

export const config = { unstable_JsPreload: false }

type Props = DefaultPageQuery & BlogListQuery & BlogPathsQuery
type RouteProps = { page: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutFullProps, Props, RouteProps>

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
          <PageLink href={p === 1 ? '/blog' : `/blog/page/${p}`} passHref>
            <Link color='primary' underline='hover'>
              {icon}
            </Link>
          </PageLink>
        )}
      />
    </>
  )
}

BlogPage.pageOptions = {
  Layout: LayoutFull,
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
      up: { href: '/blog', title: 'Blog' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
