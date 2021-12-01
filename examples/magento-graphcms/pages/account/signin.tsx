import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useMergeCustomerCart } from '@graphcommerce/magento-cart'
import { AccountSignInUpForm } from '@graphcommerce/magento-customer-account'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, OverlayAppBar, Title } from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Container, NoSsr } from '@material-ui/core'
import React from 'react'
import { LayoutOverlay, LayoutOverlayProps } from '../../components/Layout/LayoutOverlay'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountSignInPage() {
  useMergeCustomerCart()

  return (
    <>
      <PageMeta
        title={t`Sign in`}
        metaRobots={['noindex']}
        metaDescription={t`Sign in to your account`}
      />
      <NoSsr>
        <OverlayAppBar>
          <Title size='small' component='span'>
            <Trans>Sign in</Trans>
          </Title>
        </OverlayAppBar>
        <Container maxWidth='sm'>
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
  const client = apolloClient(locale, true)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variant: 'bottom',
      size: 'max',
    },
  }
}
