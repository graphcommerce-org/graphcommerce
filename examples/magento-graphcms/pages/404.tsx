import { PageOptions } from '@graphcommerce/framer-next-pages'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import { SearchLink } from '@graphcommerce/magento-search'
import { PageMeta } from '@graphcommerce/magento-store'
import { Separator, icon404, IconSvg } from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { Trans } from '@lingui/react'
import { Box, Container, Typography, Link } from '@mui/material'
import React from 'react'
import { LayoutNavigation, LayoutNavigationProps } from '../components'
import { LayoutDocument } from '../components/Layout/Layout.gql'

function RouteNotFoundPage() {
  const links = [
    <Link key={0} href='/' color='primary' underline='hover'>
      <Trans id='Store home' />
    </Link>,
    <Link key={1} href='/account' color='primary' underline='hover'>
      <Trans id='Account' />
    </Link>,
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
            <SearchLink href='/search' sx={{ width: '100%', py: 2, typography: 'body1' }}>
              Search...
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

export const getStaticProps = enhanceStaticProps<LayoutNavigationProps>(async () => ({
  props: {
    ...(await graphqlQuery(LayoutDocument, { fetchPolicy: 'cache-first' })).data,
    up: { href: '/', title: 'Home' },
  },
  revalidate: 60 * 20,
}))
