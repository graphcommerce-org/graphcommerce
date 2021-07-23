import { Container, NoSsr } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { useMergeCustomerCart } from '@reachdigital/magento-cart'
import { AccountSignInUpForm } from '@reachdigital/magento-customer-account'
import { StoreConfigDocument, PageMeta } from '@reachdigital/magento-store'
import { GetStaticProps, SheetShellHeader, Title } from '@reachdigital/next-ui'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../components/AppShell/SheetShell'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<SheetShellProps>

function AccountSignInPage() {
  useMergeCustomerCart()
  return (
    <>
      <SheetShellHeader backFallbackHref='/' backFallbackTitle='Home'>
        <Title size='small' component='span'>
          Sign in
        </Title>
      </SheetShellHeader>
      <Container maxWidth='sm'>
        <PageMeta
          title='Sign in'
          metaRobots={['noindex']}
          metaDescription='Sign in to your account'
        />
        <NoSsr>
          <AccountSignInUpForm />
        </NoSsr>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'account-public',
  SharedComponent: SheetShell,
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
