import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import {
  ApolloCustomerErrorFullPage,
  CustomerDocument,
  UpdateCustomerEmailForm,
} from '@reachdigital/magento-customer'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import {
  AppShellTitle,
  GetStaticProps,
  iconEmailOutline,
  SectionContainer,
  SheetShellHeader,
  Title,
} from '@reachdigital/next-ui'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import apolloClient from '../../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<SheetShellProps>

function AccountContactPage() {
  const { loading, data, error } = useQuery(CustomerDocument, {
    ssr: false,
  })
  const customer = data?.customer

  if (loading) return <div />
  if (error)
    return (
      <ApolloCustomerErrorFullPage
        error={error}
        signInHref='/account/signin'
        signUpHref='/account/signin'
      />
    )

  return (
    <>
      <SheetShellHeader backFallbackTitle='Account' backFallbackHref='/account'>
        <Title size='small' component='span' icon={iconEmailOutline}>
          Contact
        </Title>
      </SheetShellHeader>
      <NoSsr>
        <Container maxWidth='md'>
          <PageMeta
            title='Contact'
            metaDescription='Contact information'
            metaRobots={['noindex']}
          />

          <AppShellTitle icon={iconEmailOutline}>Contact</AppShellTitle>

          <SectionContainer labelLeft='Email'>
            {customer && <UpdateCustomerEmailForm email={customer.email ?? ''} />}
          </SectionContainer>
        </Container>
      </NoSsr>
    </>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'account',
  SharedComponent: SheetShell,
}
AccountContactPage.pageOptions = pageOptions

export default AccountContactPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variant: 'bottom',
      size: 'max',
      backFallbackHref: '/account',
      backFallbackTitle: 'Account',
    },
  }
}
