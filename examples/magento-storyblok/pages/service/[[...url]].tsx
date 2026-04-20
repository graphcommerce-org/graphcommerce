import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { LayoutOverlayHeader, LayoutTitle, PageMeta, revalidate } from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Container } from '@mui/material'
import { useStoryblokState } from '../../lib/useStoryblokState'
import type { GetStaticPaths } from 'next'
import type { LayoutNavigationProps, LayoutOverlayProps } from '../../components'
import { LayoutDocument, LayoutOverlay } from '../../components'
import { RowRenderer } from '../../components/Storyblok/RowRenderer'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'
import { fetchAllStories, fetchStory, type StoryblokStory } from '../../lib/storyblok'

type Props = { story: StoryblokStory | null }
type RouteProps = { url?: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function ServicePage(props: Props) {
  const { story: initialStory } = props
  const story = useStoryblokState(initialStory)
  const title = story?.name ?? t`Customer Service`

  return (
    <>
      <PageMeta title={title} />
      <LayoutOverlayHeader>
        <LayoutTitle component='span' size='small'>
          {title}
        </LayoutTitle>
      </LayoutOverlayHeader>

      <Container maxWidth='md'>
        <LayoutTitle>{title}</LayoutTitle>
      </Container>

      {story?.content?.body && <RowRenderer content={story.content.body} />}
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'left',
  Layout: LayoutOverlay,
  layoutProps: { variantMd: 'left' },
}
ServicePage.pageOptions = pageOptions

export default ServicePage

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const responses = locales.map(async (locale) => {
    const stories = await fetchAllStories({ starts_with: 'service/', locale })
    return stories.map((story) => ({
      params: { url: story.full_slug.replace('service/', '').split('/').filter(Boolean) },
      locale,
    }))
  })
  const paths = (await Promise.all(responses)).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async (context) => {
  const { params } = context
  const slug = params?.url ? `service/${params.url.join('/')}` : 'service'
  const isRoot = slug === 'service'

  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const storyPage = fetchStory(slug, context, staticClient)

  const story = (await storyPage).data?.story ?? null
  if (!isRoot && !story) return { notFound: true, revalidate: revalidate() }

  return {
    props: {
      story,
      ...(await layout).data,
      up: isRoot ? null : { href: '/service', title: t`Customer Service` },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: revalidate(),
  }
}
