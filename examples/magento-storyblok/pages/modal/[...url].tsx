import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { LayoutOverlayHeader, LayoutTitle, PageMeta, revalidate } from '@graphcommerce/next-ui'
import { useStoryblokState } from '@storyblok/react'
import { Box } from '@mui/material'
import type { GetStaticPaths } from 'next'
import type { LayoutOverlayProps } from '../../components'
import { LayoutDocument, LayoutOverlay } from '../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'
import { fetchStory, type StoryblokStory } from '../../lib/storyblok'

type Props = { story: StoryblokStory | null } & LayoutOverlayProps
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props, RouteProps>

function ModalPage(props: Props) {
  const { story: initialStory } = props
  const story = useStoryblokState(initialStory)

  if (!story) return <div />

  const title = story.name ?? ''

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span'>
          {title}
        </LayoutTitle>
      </LayoutOverlayHeader>
      <PageMeta title={title} metaRobots={['noindex']} />
      <Box sx={{ pt: 4 }}>
        <LayoutTitle>{title}</LayoutTitle>
      </Box>
    </>
  )
}

ModalPage.pageOptions = {
  Layout: LayoutOverlay,
  overlayGroup: 'modal',
} as PageOptions

export default ModalPage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async () => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async (context) => {
  const { params } = context
  const urlKey = params?.url.join('/') ?? ''

  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)

  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const storyPage = fetchStory(`modal/${urlKey}`, context)

  const story = (await storyPage).data?.story ?? null
  if (!story) return { notFound: true, revalidate: revalidate() }

  return {
    props: {
      story,
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
    },
    revalidate: revalidate(),
  }
}
