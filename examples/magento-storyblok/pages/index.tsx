import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { breadcrumbs } from '@graphcommerce/next-config/config'
import { LayoutHeader, PageMeta, revalidate } from '@graphcommerce/next-ui'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { useStoryblokState } from '../lib/useStoryblokState'
import type { LayoutNavigationProps } from '../components'
import { LayoutDocument, LayoutNavigation } from '../components'
import { RowRenderer } from '../components/Storyblok/RowRenderer'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'
import { fetchGlobalConfig, fetchStory, type StoryblokStory } from '../lib/storyblok'
import type { StoryblokGlobalConfig } from '../components/Storyblok/types'

type HomePageProps = { story: StoryblokStory | null; globalConfig: StoryblokGlobalConfig | null }
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, HomePageProps>

function HomePage(props: HomePageProps) {
  const { story: initialStory } = props
  const story = useStoryblokState(initialStory)

  return (
    <>
      <PageMeta title={story?.name ?? t`Home`} />
      <LayoutHeader floatingMd hideMd={breadcrumbs} floatingSm />
      {story?.content?.body && <RowRenderer content={story.content.body} />}
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

  const storyPage = fetchStory('home', context, staticClient)
  const globalConfig = fetchGlobalConfig(context)

  return {
    props: {
      story: (await storyPage).data?.story ?? null,
      globalConfig: (await globalConfig)?.content ?? null,
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: revalidate(),
  }
}
