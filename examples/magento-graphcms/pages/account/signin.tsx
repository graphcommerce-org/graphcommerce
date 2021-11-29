import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useMergeCustomerCart } from '@graphcommerce/magento-cart'
import { AccountSignInUpForm } from '@graphcommerce/magento-customer-account'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, SheetAppBar, Title } from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Container, NoSsr } from '@material-ui/core'
import React from 'react'
import { LayoutSheet, LayoutSheetProps } from '../../components/Layout/LayoutSheet'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<LayoutSheetProps>

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
        <SheetAppBar>
          <Title size='small' component='span'>
            <Trans>Sign in</Trans>
          </Title>
        </SheetAppBar>
        <Container maxWidth='sm'>
          <AccountSignInUpForm />
        </Container>
      </NoSsr>
    </>
  )
}

const pageOptions: PageOptions<LayoutSheetProps> = {
  overlayGroup: 'account-public',
  Layout: LayoutSheet,
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
