import { ContentArea, PageContent, pageContent } from '@graphcommerce/content-areas'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { PageMeta, GetStaticProps, Row, LayoutTitle, LayoutHeader } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { GetStaticPaths } from 'next'
import {
  LayoutDocument,
  LayoutNavigation,
  LayoutNavigationProps,
  productListRenderer,
} from '../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

type Props = BlogListQuery & { content: PageContent }
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function BlogPage(props: Props) {
  const { blogPosts, content } = props

  return (
    <>
      <LayoutHeader floatingMd>
        <LayoutTitle size='small' component='span'>
          {content.title}
        </LayoutTitle>
      </LayoutHeader>
      <Row>
        <PageMeta {...content} />

        <Box sx={[(theme) => ({ maxWidth: theme.breakpoints.values.md, margin: '0 auto' })]}>
          <LayoutTitle variant='h1'>{content.title}</LayoutTitle>
        </Box>

        {/* {page.author ? <BlogAuthor author={page.author} date={page.date} /> : null} */}
        {/* {page.asset ? <BlogHeader asset={page.asset} /> : null} */}

        <ContentArea content={content} productListRenderer={productListRenderer} />

        {/* <BlogTags relatedPages={page.relatedPages} /> */}
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

  const content = pageContent(staticClient, `blog/${urlKey}`)
  const layout = staticClient.query({ query: LayoutDocument, fetchPolicy: 'cache-first' })

  const blogPosts = staticClient.query({
    query: BlogListDocument,
    variables: { currentUrl: [`blog/${urlKey}`], first: limit },
  })
  if ((await content).notFound) return { notFound: true }

  return {
    props: {
      content: await content,
      ...(await blogPosts).data,
      ...(await layout).data,
      up: { href: '/', title: 'Home' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
