import { PageOptions } from '@graphcommerce/framer-next-pages'
import { Trans } from '@graphcommerce/lingui-next'
import { SearchForm } from '@graphcommerce/magento-search'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, Separator, icon404, IconSvg } from '@graphcommerce/next-ui'
import { Box, Container, Typography, Link } from '@mui/material'
import PageLink from 'next/link'
import React from 'react'
import { LayoutFull, LayoutFullProps } from '../components'
import { DefaultPageDocument, DefaultPageQuery } from '../graphql/DefaultPage.gql'
import { graphqlSsrClient, graphqlSharedClient } from '../lib/graphql/graphqlSsrClient'

export const config = { unstable_JsPreload: false }

type Props = DefaultPageQuery
type GetPageStaticProps = GetStaticProps<LayoutFullProps, Props>

function RouteNotFoundPage() {
  const links = [
    <PageLink key={0} passHref href='/'>
      <Link color='primary' underline='hover'>
        <Trans>Store home</Trans>
      </Link>
    </PageLink>,
    <PageLink key={1} passHref href='/account'>
      <Link color='primary' underline='hover'>
        <Trans>Account</Trans>
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
            <Trans>Whoops our bad...</Trans>
          </Typography>
          <Typography variant='body1'>
            <Trans>We couldn&apos;t find the page you were looking for</Trans>
          </Typography>
          <Box mt={4} mb={2}>
            <SearchForm autoFocus={false} />
          </Box>
          <Trans>Or follow these links to get you back on track!</Trans>
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
  Layout: LayoutFull,
} as PageOptions

export default RouteNotFoundPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: `/`,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })

  return {
    props: {
      ...(await page).data,
      up: { href: '/', title: 'Home' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
