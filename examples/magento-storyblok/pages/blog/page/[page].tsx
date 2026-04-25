import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { breadcrumbs } from '@graphcommerce/next-config/config'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  Breadcrumbs,
  LayoutHeader,
  LayoutTitle,
  PageMeta,
  Pagination,
  revalidate,
} from '@graphcommerce/next-ui'
import {
  fetchStories,
  fetchStory,
  storyblokEditable,
  type StoryblokStory,
} from '@graphcommerce/storyblok-ui'
import { Container, Link } from '@mui/material'
import type { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { BlogList, LayoutDocument, LayoutNavigation } from '../../../components'
import type { LayoutNavigationProps } from '../../../components'
import { RowRenderer } from '../../../components/Storyblok/RowRenderer'
import { graphqlSharedClient, graphqlSsrClient } from '../../../lib/graphql/graphqlSsrClient'
import { useStoryblokState } from '../../../lib/storyblok'

type Props = {
  story: StoryblokStory | null
  stories: StoryblokStory[]
  total: number
  perPage: number
}
type RouteProps = { page: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

const PAGE_SIZE = 16

function BlogPage(props: Props) {
  const { story: initialStory, stories, total, perPage } = props
  const story = useStoryblokState(initialStory)
  const router = useRouter()
  const title = story?.name ?? ''
  const totalPages = Math.ceil(total / perPage)
  const currentPage = Number(router.query.page ?? 1)

  return (
    <>
      <PageMeta title={title} metaDescription={title} canonical='/blog' />

      <LayoutHeader floatingMd hideMd={breadcrumbs}>
        <LayoutTitle size='small' component='span'>
          {title}
        </LayoutTitle>
      </LayoutHeader>

      <Container maxWidth={false} {...storyblokEditable(story?.content)}>
        {breadcrumbs && <Breadcrumbs breadcrumbs={[{ href: '/blog', name: title }]} />}
        <LayoutTitle variant='h1'>{title}</LayoutTitle>
      </Container>

      <BlogList stories={stories} />
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={currentPage}
          renderLink={(p, icon) => (
            <Link href={p === 1 ? '/blog' : `/blog/page/${p}`} color='primary' underline='hover'>
              {icon}
            </Link>
          )}
        />
      )}

      {story?.content?.body && <RowRenderer content={story.content.body} />}
    </>
  )
}

const pageOptions: PageOptions<LayoutNavigationProps> = { Layout: LayoutNavigation }
BlogPage.pageOptions = pageOptions

export default BlogPage

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const responses = locales.map(async (locale) => {
    const { total } = await fetchStories({
      starts_with: 'blog/',
      excluding_slugs: 'blog/,blog/tagged/*',
      per_page: PAGE_SIZE,
      locale,
    })
    const totalPages = Math.ceil(total / PAGE_SIZE)
    const pages: string[] = []
    for (let i = 2; i <= totalPages; i++) pages.push(String(i))
    return pages.map((page) => ({ params: { page }, locale }))
  })
  const paths = (await Promise.all(responses)).flat(1)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async (context) => {
  const { params, locale } = context
  const page = Number(params?.page ?? 1)
  if (page <= 0) return { notFound: true, revalidate: revalidate() }

  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const landingStory = fetchStory('blog', context, staticClient)
  const blogList = fetchStories({
    starts_with: 'blog/',
    excluding_slugs: 'blog/,blog/tagged/*',
    sort_by: 'content.date:desc',
    per_page: PAGE_SIZE,
    page,
    locale,
  })

  const { stories, total, perPage } = await blogList
  if (!stories.length) return { notFound: true, revalidate: revalidate() }

  return {
    props: {
      story: (await landingStory).data?.story ?? null,
      stories,
      total,
      perPage,
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: revalidate(),
  }
}
