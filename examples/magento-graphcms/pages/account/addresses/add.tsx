import { useQuery } from '@apollo/client'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  ApolloCustomerErrorFullPage,
  CreateCustomerAddressForm,
  CustomerDocument,
} from '@graphcommerce/magento-customer'
import { AccountDashboardAddressesQuery } from '@graphcommerce/magento-customer-account'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  GetStaticProps,
  SectionContainer,
  iconAddresses,
  SheetAppBar,
  Title,
  AppShellTitle,
} from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Container, NoSsr } from '@material-ui/core'
import React from 'react'
import { LayoutSheet, LayoutSheetProps } from '../../../components/Layout/LayoutSheet'
import apolloClient from '../../../lib/apolloClient'

type Props = AccountDashboardAddressesQuery
type GetPageStaticProps = GetStaticProps<LayoutSheetProps, Props>

function AddNewAddressPage() {
  const { loading, data, error } = useQuery(CustomerDocument, {
    ssr: false,
  })

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
      <SheetAppBar>
        <Title size='small' component='span' icon={iconAddresses}>
          <Trans>Addresses</Trans>
        </Title>
      </SheetAppBar>
      <Container maxWidth='md'>
        <PageMeta
          title={`Add address`}
          metaDescription={t`Add new address`}
          metaRobots={['noindex']}
        />
        <NoSsr>
          <AppShellTitle icon={iconAddresses}>
            <Trans>Addresses</Trans>
          </AppShellTitle>
          <SectionContainer labelLeft={t`Add new address`}>
            <CreateCustomerAddressForm />
          </SectionContainer>
        </NoSsr>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutSheetProps> = {
  overlayGroup: 'account',
  Layout: LayoutSheet,
  sharedKey: () => 'account/addresses',
}
AddNewAddressPage.pageOptions = pageOptions

export default AddNewAddressPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variant: 'bottom',
      size: 'max',
      up: { href: '/account', title: 'Account' },
    },
  }
}
