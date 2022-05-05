import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useGoogleRecaptcha } from '@graphcommerce/googlerecaptcha'
import { useMergeCustomerCart } from '@graphcommerce/magento-cart'
import { AccountSignInUpForm } from '@graphcommerce/magento-customer-account'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { t, Trans } from '@graphcommerce/lingui-next'
import { Container, NoSsr } from '@mui/material'
import { LayoutOverlay, LayoutOverlayProps } from '../../components'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'
import { useMergeGuestWishlistWithCustomer } from '@graphcommerce/magento-wishlist'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountSignInPage() {
  useMergeCustomerCart()
  useGoogleRecaptcha()
  useMergeGuestWishlistWithCustomer()

  return (
    <>
      <PageMeta
        title={t`Sign in`}
        metaRobots={['noindex']}
        metaDescription={t`Sign in to your account`}
      />
      <NoSsr>
        <LayoutOverlayHeader>
          <LayoutTitle size='small' component='span'>
            <Trans>Sign in</Trans>
          </LayoutTitle>
        </LayoutOverlayHeader>
        <Container maxWidth='md'>
          <AccountSignInUpForm />
        </Container>
      </NoSsr>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account-public',
  Layout: LayoutOverlay,
}
AccountSignInPage.pageOptions = pageOptions

export default AccountSignInPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
      size: 'max',
    },
  }
}
