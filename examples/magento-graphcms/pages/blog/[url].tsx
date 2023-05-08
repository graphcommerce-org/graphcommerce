import { PageOptions } from '@graphcommerce/framer-next-pages'
import { getHygraphPage, HygraphSingePage } from '@graphcommerce/graphcms-ui/server'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import { PageMeta, BlogTitle, Row, LayoutTitle, LayoutHeader } from '@graphcommerce/next-ui'
import { enhanceStaticPaths, enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import {
  BlogAuthor,
  BlogHeader,
  BlogList,
  BlogListDocument,
  BlogListQuery,
  BlogPostPathsDocument,
  BlogTags,
  LayoutNavigation,
  RowRenderer,
} from '../../components'
import { getLayout } from '../../components/Layout/layout'

type Props = HygraphSingePage & BlogListQuery
type RouteProps = { url: string }

function BlogPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { blogPosts, page } = props
  const title = page.title ?? ''

  return (
    <>
      <LayoutHeader floatingMd>
        <LayoutTitle size='small' component='span'>
          {title}
        </LayoutTitle>
      </LayoutHeader>
      <Row>
        <PageMeta title={title} metaDescription={title} canonical={`/${page.url}`} />

        <BlogTitle>{title}</BlogTitle>

        {page.author ? <BlogAuthor author={page.author} date={page.date} /> : null}
        {page.asset ? <BlogHeader asset={page.asset} /> : null}
        <RowRenderer {...page} />
        <BlogTags relatedPages={page.relatedPages} />
      </Row>
      <BlogList blogPosts={blogPosts} />
    </>
  )
}

BlogPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default BlogPage

export const getStaticPaths = enhanceStaticPaths<RouteProps>('blocking', async ({ locale }) =>
  (await graphqlQuery(BlogPostPathsDocument)).data.pages.map((page) => ({
    params: { url: `${page?.url}`.replace('blog/', '') },
    locale,
  })),
)

export const getStaticProps = enhanceStaticProps(
  getLayout,
  async ({ params }: GetStaticPropsContext<RouteProps>) => {
    const urlKey = params?.url ?? '??'
    const limit = 4

    const hygraphPage = getHygraphPage({ url: `blog/${urlKey}` })
    const blogPosts = graphqlQuery(BlogListDocument, {
      variables: { currentUrl: [`blog/${urlKey}`], first: limit },
    })

    const page = await hygraphPage.page
    if (!page) return { notFound: true }

    return {
      props: {
        ...(await blogPosts).data,
        page,
        up: { href: '/', title: 'Home' },
      },
      revalidate: 60 * 20,
    }
  },
)
