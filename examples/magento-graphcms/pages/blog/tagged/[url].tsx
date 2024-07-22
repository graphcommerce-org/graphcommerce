import { ContentArea, PageContent, pageContent } from '@graphcommerce/content-areas'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { redirectOrNotFound, StoreConfigDocument } from '@graphcommerce/magento-store'
import { PageMeta, GetStaticProps, Row, LayoutTitle, LayoutHeader } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { GetStaticPaths } from 'next'
import {
  LayoutDocument,
  LayoutNavigation,
  LayoutNavigationProps,
  productListRenderer,
} from '../../../components'
import { graphqlSsrClient, graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'
import { cacheFirst } from '@graphcommerce/graphql'

type Props = BlogListTaggedQuery & { content: PageContent }
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function BlogPage(props: Props) {
  const { content, blogPosts } = props

  return (
    <>
      <LayoutHeader floatingMd>
        <LayoutTitle size='small'>{content.title}</LayoutTitle>
      </LayoutHeader>
      <Row>
        <PageMeta metadata={content.metadata} />

        <BlogTitle>
          <Trans id='Tagged in: {title}' values={{ title: content.title }} />
        </BlogTitle>

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
    const staticClient = graphqlSsrClient({ locale })
    const BlogPostPaths = staticClient.query({ query: BlogPostTaggedPathsDocument })
    const { pages } = (await BlogPostPaths).data
    return (
      pages.map((page) => ({
        params: { url: `${page?.url}`.replace('blog/tagged/', '') },
        locale,
      })) ?? []
    )
  })
  const paths = (await Promise.all(responses)).flat(1)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async (context) => {
  const { locale, params } = context
  const urlKey = params?.url ?? '??'
  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const limit = 99
  const conf = client.query({ query: StoreConfigDocument })
  const content = pageContent(staticClient, `blog/tagged/${urlKey}`)
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const blogPosts = staticClient.query({
    query: BlogListTaggedDocument,
    variables: { currentUrl: [`blog/tagged/${urlKey}`], first: limit, tagged: params?.url },
  })

  if ((await content).notFound)
    return redirectOrNotFound(staticClient, conf, { url: `blog/${urlKey}` }, locale)

  return {
    props: {
      content: await content,
      ...(await blogPosts).data,
      ...(await layout).data,
      up: { href: '/blog', title: i18n._(/* i18n */ 'Blog') },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
