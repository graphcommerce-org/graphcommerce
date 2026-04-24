import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { AccountSignInUpForm, getCustomerAccountIsDisabled } from '@graphcommerce/magento-customer'
import { PageMeta, preloadAttributesForm, StoreConfigDocument } from '@graphcommerce/magento-store'
import { useMergeGuestWishlistWithCustomer } from '@graphcommerce/magento-wishlist'
import { magentoVersion } from '@graphcommerce/next-config/config'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Container } from '@mui/material'
import type { LayoutOverlayProps } from '../../components'
import { LayoutOverlay } from '../../components'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountSignInPage() {
  useMergeGuestWishlistWithCustomer()

  return (
    <>
      <PageMeta title={t`Sign in`} metaRobots={['noindex']} />
      <LayoutOverlayHeader />
      <Container maxWidth='md'>
        <AccountSignInUpForm />
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account-public',
  sharedKey: () => 'account-public',
  Layout: LayoutOverlay,
}
AccountSignInPage.pageOptions = pageOptions

export default AccountSignInPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCustomerAccountIsDisabled(context.locale)) return { notFound: true }

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  if (magentoVersion >= 247) await preloadAttributesForm(client, 'customer_account_create')

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
    },
  }
}
