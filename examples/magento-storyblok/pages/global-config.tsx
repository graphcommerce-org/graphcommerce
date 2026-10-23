import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { LayoutHeader, PageMeta, revalidate } from '@graphcommerce/next-ui'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { storyblokEditable } from '@graphcommerce/storyblok-ui'
import { Box, Container, Stack, Typography } from '@mui/material'
import type { LayoutNavigationProps } from '../components'
import { LayoutDocument, LayoutNavigation, Usps } from '../components'
import { useSetGlobalConfig } from '../components/Storyblok/GlobalConfigProvider'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'
import { fetchGlobalConfig, useGlobalConfigState, type GlobalConfigStory } from '../lib/storyblok'

type GlobalConfigPageProps = {
  globalConfigStory: GlobalConfigStory | null
}
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, GlobalConfigPageProps>

function GlobalConfigPage(props: GlobalConfigPageProps) {
  const { globalConfigStory } = props
  const story = useGlobalConfigState(globalConfigStory)
  const globalConfig = story?.content

  useSetGlobalConfig(globalConfig)

  return (
    <>
      <PageMeta title='Global Config' metaRobots={['noindex', 'nofollow']} />
      <LayoutHeader />
      <Container maxWidth='md'>
        <Typography variant='h6' color='text.secondary' align='center' sx={{ py: 4, mb: 5 }}>
          Edit header, footer and USP content using the Storyblok Visual Editor
        </Typography>

        <Stack
          direction='row'
          alignItems='top'
          justifyContent='space-between'
          sx={(theme) => ({ gap: theme.spacings.md })}
          {...(globalConfig ? storyblokEditable(globalConfig) : {})}
        >
          <Box>
            <Typography variant='overline' color='text.secondary'>
              Sidebar USPs (PDP)
            </Typography>
            <Usps usps={globalConfig?.sidebar_usps} size='small' />
          </Box>

          <Box>
            <Typography variant='overline' color='text.secondary'>
              Content USPs (PDP)
            </Typography>
            <Usps usps={globalConfig?.content_usps} />
          </Box>
        </Stack>
      </Container>
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
