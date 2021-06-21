import { Box, Container, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { SearchForm } from '@reachdigital/magento-search'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import DividedLinks from '@reachdigital/next-ui/DividedLinks'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import React from 'react'
import FullPageShell, { FullPageShellProps } from '../components/AppShell/FullPageShell'
import { DefaultPageDocument, DefaultPageQuery } from '../components/GraphQL/DefaultPage.gql'
import apolloClient from '../lib/apolloClient'

export const config = { unstable_JsPreload: false }

type Props = DefaultPageQuery
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props>

function RouteNotFoundPage() {
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
            <SearchForm />
          </Box>
          Or follow these links to get you back on track!
          <Box mb={8}>
            <DividedLinks
              divider='|'
              links={[
                {
                  href: '/',
                  text: 'Store home',
                },
                {
                  href: '/account',
                  text: 'My account',
                },
              ]}
              textColor='primary'
            />
          </Box>
        </Box>
      </Container>
    </>
  )
}

RouteNotFoundPage.pageOptions = {
  SharedComponent: FullPageShell,
  sharedKey: () => 'page',
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
