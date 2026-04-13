import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { breadcrumbs } from '@graphcommerce/next-config/config'
import { LayoutHeader, PageMeta, revalidate } from '@graphcommerce/next-ui'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { StoryblokComponent, useStoryblokState } from '@storyblok/react'
import type { LayoutNavigationProps } from '../components'
import { LayoutDocument, LayoutNavigation } from '../components'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'
import { fetchStory, type StoryblokStory } from '../lib/storyblok'

type HomePageProps = { story: StoryblokStory | null }
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, HomePageProps>

function HomePage(props: HomePageProps) {
  const { story: initialStory } = props
  const story = useStoryblokState(initialStory)

  return (
    <>
      <PageMeta title={story?.name ?? t`Home`} />
      <LayoutHeader floatingMd hideMd={breadcrumbs} floatingSm />
      {story?.content && <StoryblokComponent blok={story.content} />}
    </>
  )
}

HomePage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default HomePage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const staticClient = graphqlSsrClient(context)

  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const storyPage = fetchStory('home', context)

  return {
    props: {
      story: (await storyPage).data?.story ?? null,
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: revalidate(),
  }
}
