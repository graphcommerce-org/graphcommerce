import { ContentArea, PageContent, pageContent } from '@graphcommerce/content-areas'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { hygraphPageContent, HygraphPagesQuery } from '@graphcommerce/graphcms-ui'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  PageMeta,
  BlogTitle,
  GetStaticProps,
  Row,
  LayoutTitle,
  LayoutHeader,
} from '@graphcommerce/next-ui'
import { GetStaticPaths } from 'next'
import {
  BlogAuthor,
  BlogHeader,
  BlogList,
  BlogListDocument,
  BlogListQuery,
  BlogPostPathsDocument,
  BlogTags,
  LayoutDocument,
  LayoutNavigation,
  LayoutNavigationProps,
  RowRenderer,
} from '../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

type Props = HygraphPagesQuery & BlogListQuery & { content: PageContent }
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function BlogPage(props: Props) {
  const { blogPosts, content, pages } = props

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

        <ContentArea content={content} />

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

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (import.meta.graphCommerce.limitSsg) return { paths: [], fallback: 'blocking' }

  const responses = locales.map(async (locale) => {
    const staticClient = graphqlSsrClient(locale)
    const BlogPostPaths = staticClient.query({ query: BlogPostPathsDocument })
    const { pages } = (await BlogPostPaths).data
    return (
      pages.map((page) => ({ params: { url: `${page?.url}`.replace('blog/', '') }, locale })) ?? []
    )
  })
  const paths = (await Promise.all(responses)).flat(1)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ locale, params }) => {
  const urlKey = params?.url ?? '??'

  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)
  const limit = 4
  const conf = client.query({ query: StoreConfigDocument })

  const page = hygraphPageContent(staticClient, `blog/${urlKey}`)
  const content = pageContent(staticClient, `blog/${urlKey}`)
  const layout = staticClient.query({ query: LayoutDocument, fetchPolicy: 'cache-first' })

  const blogPosts = staticClient.query({
    query: BlogListDocument,
    variables: { currentUrl: [`blog/${urlKey}`], first: limit },
  })
  if (!(await page).data.pages?.[0]) return { notFound: true }

  return {
    props: {
      content: await content,
      ...(await page).data,
      ...(await blogPosts).data,
      ...(await layout).data,
      up: { href: '/', title: 'Home' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
