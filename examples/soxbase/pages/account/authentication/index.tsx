import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { ChangePasswordForm, CustomerDocument } from '@reachdigital/magento-customer'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import IconHeader from '@reachdigital/next-ui/IconHeader'
import MessageAuthRequired from '@reachdigital/next-ui/MessageAuthRequired'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import SectionContainer from '@reachdigital/next-ui/SectionContainer'
import { iconLock } from '@reachdigital/next-ui/icons'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import apolloClient from '../../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<SheetShellProps>

function AccountAuthenticationPage() {
  const { loading, data } = useQuery(CustomerDocument)
  const customer = data?.customer

  if (!loading && !customer)
    return <MessageAuthRequired signInHref='/account/signin' signUpHref='/account/signin' />

  return (
    <NoSsr>
      <Container maxWidth='md'>
        <PageMeta
          title='Authentication'
          metaDescription='Change password'
          metaRobots={['noindex']}
        />

        <IconHeader src={iconLock} title='Authentication' alt='authentication' size='large' />
        <SectionContainer label='Password'>{customer && <ChangePasswordForm />}</SectionContainer>
      </Container>
    </NoSsr>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'account',
  SharedComponent: SheetShell,
  sharedKey: () => 'account-authentication',
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
      backFallbackHref: '/account',
      backFallbackTitle: 'Account',
    },
  }
}
