import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { GuestOrderOverviewForm, useCustomerSession } from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps, LayoutOverlayProps } from '@graphcommerce/next-ui'
import { LayoutOverlay, LayoutOverlayHeader, LayoutTitle, iconBox } from '@graphcommerce/next-ui'
import { Trans, t } from '@lingui/macro'
import { Alert, Button, Container } from '@mui/material'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountOrdersPage() {
  const { loggedIn } = useCustomerSession()
  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconBox}>
          <Trans>Order status</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        <PageMeta title={t`Order status`} metaRobots={['noindex']} />
        <LayoutTitle
          icon={iconBox}
          gutterBottom={false}
          sx={(theme) => ({ mb: theme.spacings.xxs })}
        >
          <Trans>Order status</Trans>
        </LayoutTitle>
        {loggedIn ? (
          <Button href='/account' color='secondary'>
            Account
          </Button>
        ) : (
          <>
            <Alert
              severity='info'
              action={
                <Button href='/signin' color='secondary'>
                  Sign In
                </Button>
              }
              sx={(theme) => ({ placeItems: 'center', my: theme.spacings.xxs })}
            >
              If you already have an account you can view the status of your order in your account
            </Alert>
            <GuestOrderOverviewForm />
          </>
        )}
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'guest',
  sharedKey: () => 'guest/orders',
  Layout: LayoutOverlay,
  layoutProps: {
    variantMd: 'bottom',
  },
}
AccountOrdersPage.pageOptions = pageOptions

export default AccountOrdersPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  if (import.meta.graphCommerce.magentoVersion < 247) return { notFound: true }

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
