// TODO: Remove this page once OCI integration is complete.
import { ApolloErrorAlert, WaitForQueries } from '@graphcommerce/ecommerce-ui'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { FullPageMessage, GetStaticProps, icon404, IconSvg } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, CircularProgress, Container } from '@mui/material'
import { useOciCart } from '@graphcommerce/magento-oci'
import { useRouter } from 'next/router'
import {
  LayoutDocument,
  LayoutMinimalProps,
  LayoutNavigation,
  LayoutNavigationProps,
} from '../components'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutMinimalProps, Props>

function CheckoutProcessToken() {
  const router = useRouter()
  const { username, password, HOOK_URL: hookUrl } = router.query
  const { loading, error } = useOciCart()

  const missingParam = router.isReady && (!username || !password || !hookUrl)
  const isLoading = loading || router.isReady
  const hasErrors = missingParam || !!error

  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'OCI Login')} metaRobots={['noindex']} />

      <WaitForQueries
        waitFor={isLoading}
        fallback={
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
          >
            <FullPageMessage
              icon={<CircularProgress />}
              title={<Trans id='Loading' />}
              disableMargin
            >
              <Trans id='This may take a second' />
            </FullPageMessage>
          </Box>
        }
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Container maxWidth='md' sx={(theme) => ({ my: theme.spacings.xl })}>
            {hasErrors && (
              <FullPageMessage
                icon={<IconSvg src={icon404} size='xxl' />}
                title={<Trans id='Error' />}
                disableMargin
              >
                <Box
                  sx={(theme) => ({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: theme.spacings.xs,
                    alignItems: 'center',
                  })}
                >
                  {missingParam && (
                    <Trans id='Missing required parameters. Please check your URL and try again.' />
                  )}

                  {!!error && (
                    <Trans id='Something went wrong while getting your cart. Please go back and try again.' />
                  )}
                </Box>
              </FullPageMessage>
            )}

            <ApolloErrorAlert error={error} sx={{ display: 'flex', justifyContent: 'center' }} />
          </Container>
        </Box>
      </WaitForQueries>
    </>
  )
}

const pageOptions: PageOptions<LayoutNavigationProps> = {
  Layout: LayoutNavigation,
}
CheckoutProcessToken.pageOptions = pageOptions

export default CheckoutProcessToken

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  if (!import.meta.graphCommerce.ociSettings?.enabled) return { notFound: true }

  return {
    props: {
      ...(await layout).data,
      up: { href: '/', title: i18n._(/* i18n */ 'Home') },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
