import { PageOptions } from '@graphcommerce/framer-next-pages'
import { SearchLink } from '@graphcommerce/magento-search'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  GetStaticProps,
  Separator,
  icon404,
  IconSvg,
  useStorefrontConfig,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Container, Typography, Link } from '@mui/material'
import React from 'react'
import { LayoutDocument, LayoutNavigation, LayoutNavigationProps } from '../components'
import { graphqlSsrClient, graphqlSharedClient } from '../lib/graphql/graphqlSsrClient'
import { cacheFirst } from '@graphcommerce/graphql'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props>

function RouteNotFoundPage() {
  const { signInMode } = useStorefrontConfig()

  const links = [
    <Link key={0} href='/' color='primary' underline='hover'>
      <Trans id='Store home' />
    </Link>,
  ]

  if (signInMode !== 'GUEST_ONLY')
    links.push(
      <Link key={1} href='/account' color='primary' underline='hover'>
        <Trans id='Account' />
      </Link>,
    )

  return (
    <>
      <PageMeta title='Page not found' metaRobots={['noindex']} />
      <Container maxWidth='sm'>
        <Box textAlign='center' mt={16} mb={16}>
          <IconSvg src={icon404} size='xxl' />
          <Typography variant='h3' component='h1' gutterBottom>
            <Trans id='Whoops our bad...' />
          </Typography>
          <Typography variant='body1'>
            <Trans id="We couldn't find the page you were looking for" />
          </Typography>
          <Box mt={4} mb={2}>
            <SearchLink href='/search' sx={{ width: '100%', py: 2, typography: 'body1' }}>
              <Trans id='Search...' />
            </SearchLink>
          </Box>
          <Trans id='Or follow these links to get you back on track!' />
          <Box mb={8}>
            {links.map((link, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <React.Fragment key={index}>
                {index > 0 && <Separator />}
                {link}
              </React.Fragment>
            ))}
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

  return {
    props: {
      ...(await layout).data,
      up: { href: '/', title: i18n._(/* i18n */ 'Home') },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
