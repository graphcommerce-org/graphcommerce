import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { breadcrumbs, limitSsg } from '@graphcommerce/next-config/config'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  BlogAuthor,
  BlogHeader,
  BlogTag,
  BlogTags,
  BlogTitle,
  Breadcrumbs,
  LayoutHeader,
  LayoutTitle,
  PageMeta,
  revalidate,
} from '@graphcommerce/next-ui'
import {
  Asset,
  fetchAllStories,
  fetchStories,
  fetchStory,
  storyblokEditable,
  type StoryblokStory,
} from '@graphcommerce/storyblok-ui'
import { t } from '@lingui/core/macro'
import { Box, Container } from '@mui/material'
import type { GetStaticPaths } from 'next'
import { BlogList, LayoutDocument, LayoutNavigation } from '../../components'
import type { LayoutNavigationProps } from '../../components'
import { RowRenderer } from '../../components/Storyblok/RowRenderer'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'
import { useStoryblokState } from '../../lib/storyblok'

type Props = { story: StoryblokStory | null; related: StoryblokStory[] }
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function BlogPostPage(props: Props) {
  const { story: initialStory, related } = props
  const story = useStoryblokState(initialStory)
  const content = story?.content
  const title = content?.title ?? story?.name ?? ''
  const slug = story?.full_slug ?? ''

  return (
    <>
      <PageMeta
        title={content?.meta_title ?? title}
        metaDescription={content?.meta_description ?? title}
        canonical={slug ? `/${slug}` : undefined}
      />
      <LayoutHeader floatingMd hideMd={breadcrumbs}>
        <LayoutTitle size='small' component='span'>
          {title}
        </LayoutTitle>
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
              { href: `/${slug}`, name: title },
            ]}
          />
        </Container>
      )}
      <Container maxWidth='md' {...storyblokEditable(content)}>
        <BlogTitle>{title}</BlogTitle>

        {content?.author && content?.date && (
          <BlogAuthor author={content.author} date={content.date} />
        )}
        {content?.asset?.filename && (
          <BlogHeader asset={<Asset asset={content.asset} loading='eager' />} />
        )}
        {content?.body && <RowRenderer content={content.body} />}
        {story?.tag_list && story.tag_list.length > 0 && (
          <BlogTags>
            {story.tag_list.map((tag) => (
              <BlogTag key={tag} url={`blog/tagged/${tag}`} title={tag} />
            ))}
          </BlogTags>
        )}
      </Container>
      <BlogList stories={related} />
    </>
  )
}

const pageOptions: PageOptions<LayoutNavigationProps> = { Layout: LayoutNavigation }
BlogPostPage.pageOptions = pageOptions

export default BlogPostPage

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (limitSsg) return { paths: [], fallback: 'blocking' }

  const responses = locales.map(async (locale) => {
    const stories = await fetchAllStories({
      starts_with: 'blog/',
      excluding_slugs: 'blog/,blog/tagged/*',
      locale,
    })
    return stories.map((story) => ({
      params: {
        url: story.full_slug
          .replace(/^blog\//, '')
          .split('/')
          .filter(Boolean),
      },
      locale,
    }))
  })
  const paths = (await Promise.all(responses)).flat(1)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async (context) => {
  const { params } = context
  const slug = `blog/${params?.url?.join('/') ?? ''}`

  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const storyPage = fetchStory(slug, context, staticClient)
  const related = fetchStories({
    starts_with: 'blog/',
    excluding_slugs: `blog/,${slug},blog/tagged/*`,
    sort_by: 'content.date:desc',
    per_page: 4,
  })

  const story = (await storyPage).data?.story ?? null
  if (!story) return { notFound: true, revalidate: revalidate() }

  return {
    props: {
      story,
      related: (await related).stories,
      ...(await layout).data,
      up: { href: '/blog', title: t`Blog` },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: revalidate(),
  }
}
