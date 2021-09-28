import { PageOptions } from '@graphcommerce/framer-next-pages'
import { SearchForm } from '@graphcommerce/magento-search'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, Separator } from '@graphcommerce/next-ui'
import { Box, Container, Typography, Link } from '@material-ui/core'
import PageLink from 'next/link'
import React from 'react'
import FullPageShell, { FullPageShellProps } from '../components/AppShell/FullPageShell'
import { DefaultPageDocument, DefaultPageQuery } from '../components/GraphQL/DefaultPage.gql'
import apolloClient from '../lib/apolloClient'

export const config = { unstable_JsPreload: false }

type Props = DefaultPageQuery
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props>

function RouteNotFoundPage() {
  const links = [
    <PageLink key={0} passHref href='/'>
      <Link color='primary'>Store home</Link>
    </PageLink>,
    <PageLink key={1} passHref href='/account'>
      <Link color='primary'>Account</Link>
    </PageLink>,
  ]

  return (
    <>
      <PageMeta title='Page not found' metaRobots={['noindex']} />
      <Container maxWidth='sm'>
        <Box textAlign='center' mt={16} mb={16}>
          <Typography variant='h3' component='h1'>
            Whoops our bad...
          </Typography>
          <Typography variant='body1'>
            We couldn&apos;t find the page you were looking for
          </Typography>
          <Box mt={4} mb={2}>
            <SearchForm autoFocus={false} />
          </Box>
          Or follow these links to get you back on track!
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
  SharedComponent: FullPageShell,
} as PageOptions

export default RouteNotFoundPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)
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
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
