import { useQuery } from '@apollo/client'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  ApolloCustomerErrorFullPage,
  ChangePasswordForm,
  CustomerDocument,
} from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  GetStaticProps,
  SectionContainer,
  iconLock,
  AppShellTitle,
  SheetAppBar,
  Title,
} from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Container, NoSsr } from '@material-ui/core'
import React from 'react'
import { LayoutSheet, LayoutSheetProps } from '../../../components/Layout/LayoutSheet'
import apolloClient from '../../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<LayoutSheetProps>

function AccountAuthenticationPage() {
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
      <SheetAppBar>
        <Title size='small' component='span' icon={iconLock}>
          <Trans>Authentication</Trans>
        </Title>
      </SheetAppBar>
      <Container maxWidth='md'>
        <PageMeta
          title={t`Authentication`}
          metaDescription={t`Change password`}
          metaRobots={['noindex']}
        />
        <NoSsr>
          <AppShellTitle icon={iconLock}>
            <Trans>Authentication</Trans>
          </AppShellTitle>
          <SectionContainer labelLeft={t`Password`}>
            {customer && <ChangePasswordForm />}
          </SectionContainer>
        </NoSsr>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutSheetProps> = {
  overlayGroup: 'account',
  Layout: LayoutSheet,
}
AccountAuthenticationPage.pageOptions = pageOptions

export default AccountAuthenticationPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
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
