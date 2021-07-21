import { Box, Container, NoSsr, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { ForgotPasswordForm } from '@reachdigital/magento-customer'
import { StoreConfigDocument, PageMeta } from '@reachdigital/magento-store'
import { GetStaticProps } from '@reachdigital/next-ui'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../components/AppShell/SheetShell'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<SheetShellProps>

function AccountForgotPasswordPage() {
  return (
    <Container maxWidth='sm'>
      <PageMeta
        title='Forgot Password'
        metaDescription='Forgot password'
        metaRobots={['noindex']}
      />
      <NoSsr>
        <Box pt={4} textAlign='center'>
          <Typography variant='h3'>Forgot your password?</Typography>
          <p>
            No worries! Enter your email address and we will send an email with instructions to
            reset your password.
          </p>
          <ForgotPasswordForm />
        </Box>
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
