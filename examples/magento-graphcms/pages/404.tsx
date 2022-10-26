import { PageOptions } from '@graphcommerce/framer-next-pages'
import { SearchForm } from '@graphcommerce/magento-search'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, Separator, icon404, IconSvg } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Container, Typography, Link } from '@mui/material'
import PageLink from 'next/link'
import React from 'react'
import { LayoutNavigation, LayoutNavigationProps } from '../components'
import { LayoutDocument } from '../components/Layout/Layout.gql'
import { DefaultPageDocument, DefaultPageQuery } from '../graphql/DefaultPage.gql'
import { graphqlSsrClient, graphqlSharedClient } from '../lib/graphql/graphqlSsrClient'

type Props = DefaultPageQuery
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props>

function RouteNotFoundPage() {
  const links = [
    <PageLink key={0} passHref href='/' legacyBehavior>
      <Link color='primary' underline='hover'>
        <Trans id='Store home' />
      </Link>
    </PageLink>,
    <PageLink key={1} passHref href='/account' legacyBehavior>
      <Link color='primary' underline='hover'>
        <Trans id='Account' />
      </Link>
    </PageLink>,
  ]

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
            <SearchForm autoFocus={false} />
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

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  const page = staticClient.query({ query: DefaultPageDocument, variables: { url: `/` } })
  const layout = staticClient.query({ query: LayoutDocument })

  return {
    props: {
      ...(await page).data,
      ...(await layout).data,
      up: { href: '/', title: 'Home' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
