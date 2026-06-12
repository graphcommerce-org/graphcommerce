import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { breadcrumbs, limitSsg } from '@graphcommerce/next-config/config'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  BlogTitle,
  Breadcrumbs,
  LayoutHeader,
  LayoutTitle,
  PageMeta,
  revalidate,
  Row,
} from '@graphcommerce/next-ui'
import { fetchAllStories, type StoryblokStory } from '@graphcommerce/storyblok-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Container } from '@mui/material'
import type { GetStaticPaths } from 'next'
import { BlogList, LayoutDocument, LayoutNavigation } from '../../../components'
import type { LayoutNavigationProps } from '../../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../../lib/graphql/graphqlSsrClient'
import { fetchGlobalConfig } from '../../../lib/storyblok'

type Props = { tag: string; stories: StoryblokStory[] }
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function BlogTaggedPage(props: Props) {
  const { tag, stories } = props
  return (
    <>
      <PageMeta title={tag} metaDescription={tag} canonical={`/blog/tagged/${tag}`} />
      <LayoutHeader floatingMd hideMd={breadcrumbs}>
        <LayoutTitle size='small'>{tag}</LayoutTitle>
      </LayoutHeader>
      {breadcrumbs && (
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
              { href: '/blog', name: t`Blog` },
              { href: `/blog/tagged/${tag}`, name: tag },
            ]}
          />
        </Container>
      )}
      <Row>
        <BlogTitle>
          <Trans>Tagged in: {tag}</Trans>
        </BlogTitle>
      </Row>
      <BlogList stories={stories} />
    </>
  )
}

const pageOptions: PageOptions<LayoutNavigationProps> = { Layout: LayoutNavigation }
BlogTaggedPage.pageOptions = pageOptions

export default BlogTaggedPage

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (limitSsg) return { paths: [], fallback: 'blocking' }

  const responses = locales.map(async (locale) => {
    const stories = await fetchAllStories({
      starts_with: 'blog/',
      excluding_slugs: 'blog/,blog/tagged/*',
      locale,
    })
    const tags = new Set<string>()
    for (const story of stories) {
      for (const tag of story.tag_list ?? []) tags.add(tag)
    }
    return Array.from(tags).map((tag) => ({ params: { url: tag }, locale }))
  })
  const paths = (await Promise.all(responses)).flat(1)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async (context) => {
  const { params, locale } = context
  const tag = params?.url ?? ''
  if (!tag) return { notFound: true, revalidate: revalidate() }

  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const globalConfig = fetchGlobalConfig(context)
  const stories = await fetchAllStories({
    starts_with: 'blog/',
    excluding_slugs: 'blog/,blog/tagged/*',
    sort_by: 'content.date:desc',
    with_tag: tag,
    locale,
  })

  if (!stories.length) return { notFound: true, revalidate: revalidate() }

  return {
    props: {
      tag,
      stories,
      ...(await layout).data,
      globalConfig: (await globalConfig)?.content ?? null,
      up: { href: '/blog', title: t`Blog` },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: revalidate(),
  }
}
