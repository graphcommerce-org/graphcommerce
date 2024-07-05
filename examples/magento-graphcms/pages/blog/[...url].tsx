import { PageOptions } from '@graphcommerce/framer-next-pages'
import { hygraphPageContent, HygraphPagesQuery } from '@graphcommerce/graphcms-ui'
import { redirectOrNotFound, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  PageMeta,
  BlogTitle,
  GetStaticProps,
  Row,
  LayoutTitle,
  LayoutHeader,
  Breadcrumbs,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Container } from '@mui/material'
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
import { cacheFirst } from '@graphcommerce/graphql'

type Props = HygraphPagesQuery & BlogListQuery
type RouteProps = { url: string[] }
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
      <Container maxWidth={false}>
        <Breadcrumbs
          sx={(theme) => ({
            mx: theme.page.horizontal,
            mb: theme.spacings.sm,
            [theme.breakpoints.down('md')]: {
              '& .MuiBreadcrumbs-ol': { justifyContent: 'center' },
            },
          })}
          breadcrumbs={[
            { href: '/blog', name: i18n._(/* i18n*/ `Blog`) },
            { href: `/${page.url}`, name: title },
          ]}
        />
      </Container>
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

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (import.meta.graphCommerce.limitSsg) return { paths: [], fallback: 'blocking' }

  const responses = locales.map(async (locale) => {
    const staticClient = graphqlSsrClient({ locale })
    const BlogPostPaths = staticClient.query({ query: BlogPostPathsDocument })
    const { pages } = (await BlogPostPaths).data
    return pages.map((page) => ({ params: { url: page.url.split('/').slice(1) }, locale })) ?? []
  })
  const paths = (await Promise.all(responses)).flat(1)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async (context) => {
  const { locale, params } = context
  const urlKey = params?.url.join('/') ?? ''

  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const limit = 4
  const conf = client.query({ query: StoreConfigDocument })

  const page = hygraphPageContent(staticClient, `blog/${urlKey}`)
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const blogPosts = staticClient.query({
    query: BlogListDocument,
    variables: { currentUrl: [`blog/${urlKey}`], first: limit },
  })

  if (!(await page).data.pages?.[0])
    return redirectOrNotFound(staticClient, conf, { url: `blog/${urlKey}` }, locale)

  return {
    props: {
      ...(await page).data,
      ...(await blogPosts).data,
      ...(await layout).data,
      up: { href: '/blog', title: i18n._(/* i18n */ 'Blog') },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
