import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { CmsPageContent, CmsPageDocument, type CmsPageFragment } from '@graphcommerce/magento-cms'
import { SearchLink } from '@graphcommerce/magento-search'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { icon404, IconSvg, isTypename, revalidate } from '@graphcommerce/next-ui'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Container, Typography } from '@mui/material'
import type { LayoutNavigationProps } from '../components'
import { LayoutDocument, LayoutNavigation, productListRenderer } from '../components'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'

type Props = { cmsPage: CmsPageFragment | null }
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props>

function RouteNotFoundPage(props: Props) {
  const { cmsPage } = props

  return (
    <>
      <PageMeta title='Page not found' metaRobots={['noindex']} />
      <Container maxWidth='sm'>
        <Box textAlign='center' mt={16} mb={16}>
          <IconSvg src={icon404} size='xxl' />

          <Typography variant='h3' component='h1' gutterBottom>
            {cmsPage?.content_heading ?? <Trans id='Whoops our bad...' />}
          </Typography>

          {cmsPage ? (
            <CmsPageContent cmsPage={cmsPage} productListRenderer={productListRenderer} />
          ) : (
            <Typography variant='body1'>
              <Trans id="We couldn't find the page you were looking for" />
            </Typography>
          )}
          <Box mt={4} mb={2}>
            <SearchLink href='/search' sx={{ width: '100%', py: 2, typography: 'body1' }}>
              <Trans id='Search...' />
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
  const staticClient = graphqlSsrClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })
  const url = (await conf).data.storeConfig?.cms_no_route ?? ''
  const cmsPageQuery = staticClient.query({ query: CmsPageDocument, variables: { url } })
  const cmsPage = (await cmsPageQuery).data.route

  return {
    props: {
      ...(await layout).data,
      cmsPage: cmsPage && isTypename(cmsPage, ['CmsPage']) ? cmsPage : null,
      up: { href: '/', title: i18n._(/* i18n */ 'Home') },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: revalidate(),
  }
}
