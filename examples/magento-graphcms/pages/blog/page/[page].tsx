import { PageOptions } from '@graphcommerce/framer-next-pages'
import { HygraphPagesQuery } from '@graphcommerce/graphcms-ui'
import { hygraphPageContent } from '@graphcommerce/graphcms-ui/server'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import { PageMeta, Pagination, LayoutTitle, LayoutHeader } from '@graphcommerce/next-ui'
import { enhanceStaticPaths, enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { Container, Link } from '@mui/material'
import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import {
  BlogList,
  BlogListDocument,
  BlogListQuery,
  BlogPathsDocument,
  BlogPathsQuery,
  LayoutNavigation,
  LayoutNavigationProps,
  RowRenderer,
} from '../../../components'
import { layoutProps } from '../../../components/Layout/layout'
import { LayoutDocument } from '../../../components/Layout/Layout.gql'

type Props = HygraphPagesQuery & BlogListQuery & BlogPathsQuery
type RouteProps = { page: string }

const pageSize = 16

function BlogPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
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
export const getStaticPaths = enhanceStaticPaths('blocking', async ({ locale }) => {
  const totalPosts = (await graphqlQuery(BlogPathsDocument)).data.pagesConnection.aggregate.count
  const totalPages = Math.ceil(totalPosts / pageSize)
  const pages: string[] = []
  for (let i = 1; i < totalPages - 1; i++) pages.push(String(i + 1))
  return pages.map((page) => ({ params: { page }, locale }))
})

export const getStaticProps = enhanceStaticProps(
  layoutProps<Props, RouteProps>(async ({ params }) => {
    const skip = Math.abs((Number(params?.page ?? '1') - 1) * pageSize)
    const pages = hygraphPageContent('blog')
    const blogPosts = graphqlQuery(BlogListDocument, {
      variables: { currentUrl: ['blog'], first: pageSize, skip },
    })
    const blogPaths = graphqlQuery(BlogPathsDocument)

    if (!(await pages).data.pages?.[0]) return { notFound: true }
    if (!(await blogPosts).data.blogPosts.length) return { notFound: true }
    if (Number(params?.page) <= 0) return { notFound: true }

    return {
      props: {
        ...(await pages).data,
        ...(await blogPosts).data,
        ...(await blogPaths).data,
        urlEntity: { relative_url: `blog` },
        up: { href: '/blog', title: 'Blog' },
      },
      revalidate: 60 * 20,
    }
  }),
)
