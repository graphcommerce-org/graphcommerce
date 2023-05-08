import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useMergeCustomerCart } from '@graphcommerce/magento-cart'
import { AccountSignInUpForm } from '@graphcommerce/magento-customer'
import { PageMeta } from '@graphcommerce/magento-store'
import { useMergeGuestWishlistWithCustomer } from '@graphcommerce/magento-wishlist'
import { LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import { InferGetStaticPropsType } from 'next'
import { LayoutOverlay, LayoutOverlayProps } from '../../components'

function AccountSignInPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
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
  layoutProps: { variantMd: 'bottom' },
}
AccountSignInPage.pageOptions = pageOptions

export default AccountSignInPage

export const getStaticProps = enhanceStaticProps<LayoutOverlayProps>(() => ({
  props: {},
}))
