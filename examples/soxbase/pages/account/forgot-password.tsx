import { Container, NoSsr, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import ForgotPasswordForm from '@reachdigital/magento-customer/ForgotPasswordForm'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../components/AppShell/SheetShell'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<SheetShellProps>

function AccountForgotPasswordPage() {
  return (
    <Container maxWidth='xs'>
      <PageMeta
        title='Forgot Password'
        metaDescription='Forgot password'
        metaRobots={['noindex']}
      />
      <NoSsr>
        <Typography variant='h3' align='center'>
          Forgot password
        </Typography>
        <Typography variant='h6' align='center'>
          Fill in your e-mail to request changing your password
        </Typography>
        <ForgotPasswordForm />
      </NoSsr>
    </Container>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'account-public',
  SharedComponent: SheetShell,
}
AccountForgotPasswordPage.pageOptions = pageOptions

export default AccountForgotPasswordPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variant: 'top',
      backFallbackHref: '/account/signin',
      backFallbackTitle: 'Sign In',
    },
  }
}
