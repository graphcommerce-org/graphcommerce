import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useMergeCustomerCart } from '@graphcommerce/magento-cart'
import { AccountSignInUpForm } from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { useMergeGuestWishlistWithCustomer } from '@graphcommerce/magento-wishlist'
import { GetStaticProps, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import { LayoutOverlay, LayoutOverlayProps } from '../../components'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountSignInPage() {
  useMergeCustomerCart()
  useMergeGuestWishlistWithCustomer()

  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'Sign in')} metaRobots={['noindex']} />
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span'>
          <Trans id='Sign in' />
        </LayoutTitle>
      </LayoutOverlayHeader>
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
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
    },
  }
}
