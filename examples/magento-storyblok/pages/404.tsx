import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { SearchLink } from '@graphcommerce/magento-search'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { icon404, IconSvg, revalidate } from '@graphcommerce/next-ui'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Box, Container, Typography } from '@mui/material'
import type { LayoutNavigationProps } from '../components'
import { LayoutDocument, LayoutNavigation } from '../components'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'
import { fetchGlobalConfig } from '../lib/storyblok'

type GetPageStaticProps = GetStaticProps<LayoutNavigationProps>

function RouteNotFoundPage() {
  return (
    <>
      <PageMeta title='Page not found' metaRobots={['noindex']} />
      <Container maxWidth='sm'>
        <Box sx={{ textAlign: 'center', mt: 16, mb: 16 }}>
          <IconSvg src={icon404} size='xxl' />

          <Typography variant='h3' component='h1' gutterBottom>
            <Trans>Whoops our bad...</Trans>
          </Typography>

          <Typography variant='body1'>
            <Trans>We couldn't find the page you were looking for</Trans>
          </Typography>

          <Box sx={{ mt: 4, mb: 2 }}>
            <SearchLink href='/search' sx={{ width: '100%', py: 2, typography: 'body1' }}>
              <Trans>Search...</Trans>
            </SearchLink>
          </Box>
        </Box>
      </Container>
    </>
  )
}

RouteNotFoundPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default RouteNotFoundPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const up = { href: '/', title: t`Home` }
  const staticClient = graphqlSsrClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })
  const globalConfig = fetchGlobalConfig(context)

  return {
    props: {
      ...(await layout).data,
      globalConfig: (await globalConfig)?.content ?? null,
      up,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: revalidate(),
  }
}
