import { PageOptions } from '@graphcommerce/framer-next-pages'
import { HygraphPagesQuery } from '@graphcommerce/graphcms-ui'
import { hygraphPageContent } from '@graphcommerce/graphcms-ui/server'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import { PageMeta, Row, LayoutTitle, LayoutHeader } from '@graphcommerce/next-ui'
import { enhanceStaticPaths, enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { Trans } from '@lingui/react'
import { InferGetStaticPropsType } from 'next'
import {
  BlogAuthor,
  BlogHeader,
  BlogList,
  BlogPostTaggedPathsDocument,
  BlogListTaggedDocument,
  BlogListTaggedQuery,
  BlogTags,
  BlogTitle,
  LayoutNavigation,
  RowRenderer,
} from '../../../components'
import { getLayout } from '../../../components/Layout/layout'

type Props = HygraphPagesQuery & BlogListTaggedQuery
type RouteProps = { url: string }

function BlogPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { pages, blogPosts } = props
  const page = pages[0]
  const title = page.title ?? ''

  return (
    <>
      <LayoutHeader floatingMd>
        <LayoutTitle size='small'>{title}</LayoutTitle>
      </LayoutHeader>
      <Row>
        <PageMeta title={title} metaDescription={title} canonical={`/${page.url}`} />

        <BlogTitle>
          <Trans id='Tagged in: {title}' values={{ title }} />
        </BlogTitle>

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

export const getStaticPaths = enhanceStaticPaths<RouteProps>(
  'blocking',
  async ({ locale }) =>
    (await graphqlQuery(BlogPostTaggedPathsDocument)).data.pages.map((page) => ({
      params: { url: `${page?.url}`.replace('blog/tagged/', '') },
      locale,
    })) ?? [],
)

export const getStaticProps = enhanceStaticProps(getLayout, async ({ params }) => {
  const urlKey = params?.url ?? '??'
  const limit = 99
  const page = hygraphPageContent(`blog/tagged/${urlKey}`)

  const blogPosts = graphqlQuery(BlogListTaggedDocument, {
    variables: { currentUrl: [`blog/tagged/${urlKey}`], first: limit, tagged: params?.url },
  })
  if (!(await page).data.pages?.[0]) return { notFound: true }

  return {
    props: {
      ...(await page).data,
      ...(await blogPosts).data,
      up: { href: '/blog', title: 'Blog' },
    },
    revalidate: 60 * 20,
  }
})
