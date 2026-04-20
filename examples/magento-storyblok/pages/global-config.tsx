import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { LayoutHeader, PageMeta, revalidate } from '@graphcommerce/next-ui'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { Typography } from '@mui/material'
import { useStoryblokState } from '@storyblok/react'
import type { LayoutNavigationProps } from '../components'
import { LayoutDocument, LayoutNavigation } from '../components'
import { useSetGlobalConfig } from '../components/Storyblok/GlobalConfigProvider'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'
import { fetchGlobalConfig, type GlobalConfigStory } from '../lib/storyblok'

type GlobalConfigPageProps = {
  globalConfigStory: GlobalConfigStory | null
}
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, GlobalConfigPageProps>

function GlobalConfigPage(props: GlobalConfigPageProps) {
  const { globalConfigStory } = props
  const story = useStoryblokState(globalConfigStory)
  const globalConfig = story?.content

  useSetGlobalConfig(globalConfig)

  return (
    <>
      <PageMeta title='Global Config' metaRobots={['noindex', 'nofollow']} />
      <LayoutHeader />
      <Typography variant='h6' color='text.secondary' align='center' sx={{ py: 8 }}>
        Edit header and footer content using the Storyblok Visual Editor
      </Typography>
    </>
  )
}

GlobalConfigPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default GlobalConfigPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const staticClient = graphqlSsrClient(context)

  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const globalConfigStory = fetchGlobalConfig(context)

  return {
    props: {
      globalConfigStory: (await globalConfigStory) ?? null,
      globalConfig: (await globalConfigStory)?.content ?? null,
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: revalidate(),
  }
}
