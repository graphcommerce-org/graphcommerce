import { PageOptions } from '@graphcommerce/framer-next-pages'
import { HygraphPagesQuery } from '@graphcommerce/graphcms-ui'
import { hygraphPageContent } from '@graphcommerce/graphcms-ui/server'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  PageMeta,
  BlogTitle,
  GetStaticProps,
  Row,
  LayoutTitle,
  LayoutHeader,
} from '@graphcommerce/next-ui'
import { enhanceStaticPaths, enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { GetStaticPaths } from 'next'
import {
  BlogAuthor,
  BlogHeader,
  BlogList,
  BlogListDocument,
  BlogListQuery,
  BlogPostPathsDocument,
  BlogTags,
  LayoutNavigation,
  LayoutNavigationProps,
  RowRenderer,
} from '../../components'
import { LayoutDocument } from '../../components/Layout/Layout.gql'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'

type Props = HygraphPagesQuery & BlogListQuery
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function BlogPage(props: Props) {
  const { blogPosts, pages } = props

  const page = pages[0]
  const title = page?.title ?? ''

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

export const getStaticPaths: GetPageStaticPaths = enhanceStaticPaths(
  'blocking',
  async ({ locale }) =>
    (await graphqlQuery(BlogPostPathsDocument)).data.pages.map((page) => ({
      params: { url: `${page?.url}`.replace('blog/', '') },
      locale,
    })),
)

export const getStaticProps: GetPageStaticProps = enhanceStaticProps(async ({ params }) => {
  const urlKey = params?.url ?? '??'
  const limit = 4

  const page = hygraphPageContent(`blog/${urlKey}`)

  const blogPosts = graphqlQuery(BlogListDocument, {
    variables: { currentUrl: [`blog/${urlKey}`], first: limit },
  })
  if (!(await page).data.pages?.[0]) return { notFound: true }

  return {
    props: {
      ...(await page).data,
      ...(await blogPosts).data,
      ...(await graphqlQuery(LayoutDocument, { fetchPolicy: 'cache-first' })).data,
      up: { href: '/', title: 'Home' },
    },
    revalidate: 60 * 20,
  }
})
