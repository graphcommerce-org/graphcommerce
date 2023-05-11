import { PageOptions } from '@graphcommerce/framer-next-pages'
import { getHygraphPage } from '@graphcommerce/graphcms-ui/server'
import { deepAwait, graphqlQuery } from '@graphcommerce/graphql-mesh'
import { PageMeta, BlogTitle, Row, LayoutTitle, LayoutHeader } from '@graphcommerce/next-ui'
import {
  enhanceStaticPaths,
  enhanceStaticProps,
  notFound,
  urlFromParams,
} from '@graphcommerce/next-ui/server'
import { InferGetStaticPropsType } from 'next'
import {
  BlogAuthor,
  BlogHeader,
  BlogList,
  BlogListDocument,
  BlogPostPathsDocument,
  BlogTags,
  LayoutNavigation,
  RowRenderer,
} from '../../components'
import { getLayout } from '../../components/Layout/layout'

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

export const getStaticPaths = enhanceStaticPaths('blocking', async ({ locale }) =>
  (await graphqlQuery(BlogPostPathsDocument)).data.pages.map((page) => ({
    params: { url: `${page?.url}`.replace('blog/', '') },
    locale,
  })),
)

export const getStaticProps = enhanceStaticProps(getLayout, async (context) => {
  const { params } = context
  const urlKey = urlFromParams(params)

  const hygraphPage = getHygraphPage({ url: `blog/${urlKey}` })
  const blogPosts = graphqlQuery(BlogListDocument, {
    variables: { currentUrl: [`blog/${urlKey}`], first: 4 },
  })

  const page = await hygraphPage.page
  if (!page) return notFound()

  return {
    props: await deepAwait({
      ...(await blogPosts).data,
      page,
      up: { href: '/', title: 'Home' },
    }),
    revalidate: 60 * 20,
  }
})
