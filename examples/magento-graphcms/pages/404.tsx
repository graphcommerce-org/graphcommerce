import { PageOptions } from '@graphcommerce/framer-next-pages'
import { SearchForm } from '@graphcommerce/magento-search'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, Separator, icon404, IconSvg, MetaRobots } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Container, Typography, Link } from '@mui/material'
import PageLink from 'next/link'
import router from 'next/router'
import React from 'react'
import { LayoutNavigation, LayoutNavigationProps } from '../components'
import { LayoutDocument } from '../components/Layout/Layout.gql'
import { graphqlSsrClient, graphqlSharedClient } from '../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props>

function RouteNotFoundPage() {
  const isB2B = process.env.NEXT_PUBLIC_SITE_URL?.includes('b2b')
  const metaRobots = ['noindex'] as MetaRobots[]

  const links = [
    <Link onClick={() => router.back()} href='#' underline='hover'>
      <Trans id='Back' />
    </Link>,
    <PageLink key={0} passHref href='/'>
      <Link color='primary' underline='hover'>
        <Trans id='Store home' />
      </Link>
    </PageLink>,
    <PageLink key={1} passHref href='/account'>
      <Link color='primary' underline='hover'>
        <Trans id='Account' />
      </Link>
    </PageLink>,
    <PageLink key={2} passHref href='/service'>
      <Link color='primary' underline='hover'>
        <Trans id='FAQ' />
      </Link>
    </PageLink>,
  ]

  return (
    <>
      <PageMeta
        title={i18n._('Page not found')}
        metaRobots={isB2B ? ['noindex', 'nofollow'] : metaRobots}
      />
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
  const layout = staticClient.query({ query: LayoutDocument, fetchPolicy: 'cache-first' })

  return {
    props: {
      ...(await layout).data,
      up: { href: '/', title: 'Home' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
