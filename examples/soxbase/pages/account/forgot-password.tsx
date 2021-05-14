import { Box, Container, NoSsr, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import ForgotPasswordForm from '@reachdigital/magento-customer/ForgotPasswordForm'
import { StoreConfigDocument, PageMeta } from '@reachdigital/magento-store'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
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
        <Typography variant='h3' align='center'>
          Forgot your password?
        </Typography>

        <Box textAlign='center'>
          <p>
            No worries! Enter your email address and we will send an email with instructions to
            reset your password.
          </p>
        </Box>
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
