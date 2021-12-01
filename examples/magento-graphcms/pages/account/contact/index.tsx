import { useQuery } from '@apollo/client'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  ApolloCustomerErrorFullPage,
  CustomerDocument,
  UpdateCustomerEmailForm,
} from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  AppShellTitle,
  GetStaticProps,
  iconEmailOutline,
  SectionContainer,
  OverlayAppBar,
  Title,
} from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Container, NoSsr } from '@material-ui/core'
import React from 'react'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components/Layout/LayoutOverlay'
import apolloClient from '../../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

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
      <OverlayAppBar>
        <Title size='small' component='span' icon={iconEmailOutline}>
          <Trans>Contact</Trans>
        </Title>
      </OverlayAppBar>
      <NoSsr>
        <Container maxWidth='md'>
          <PageMeta
            title={t`Contact`}
            metaDescription={t`Contact information`}
            metaRobots={['noindex']}
          />

          <AppShellTitle icon={iconEmailOutline}>
            <Trans>Contact</Trans>
          </AppShellTitle>

          <SectionContainer labelLeft='Email'>
            {customer && <UpdateCustomerEmailForm email={customer.email ?? ''} />}
          </SectionContainer>
        </Container>
      </NoSsr>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account',
  Layout: LayoutOverlay,
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
      up: { href: '/account', title: 'Account' },
    },
  }
}
