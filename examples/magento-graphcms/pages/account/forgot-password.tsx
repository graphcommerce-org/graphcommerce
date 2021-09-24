import { Box, Container, NoSsr } from '@material-ui/core'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { ForgotPasswordForm } from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { AppShellTitle, GetStaticProps, SheetShellHeader, Title } from '@graphcommerce/next-ui'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../components/AppShell/SheetShell'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<SheetShellProps>

function AccountForgotPasswordPage() {
  return (
    <>
      <SheetShellHeader backFallbackHref='/' backFallbackTitle='Home'>
        <Title size='small' component='span'>
          Forgot your password?
        </Title>
      </SheetShellHeader>
      <Container maxWidth='sm'>
        <PageMeta
          title='Forgot Password'
          metaDescription='Forgot password'
          metaRobots={['noindex']}
        />
        <NoSsr>
          <Box pt={4} textAlign='center'>
            {/* <Typography variant='h3'>Forgot your password?</Typography> */}

            <AppShellTitle>Forgot your password?</AppShellTitle>

            <p>
              No worries! Enter your email address and we will send an email with instructions to
              reset your password.
            </p>
            <ForgotPasswordForm />
          </Box>
        </NoSsr>
      </Container>
    </>
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
      variant: 'bottom',
      size: 'max',
      backFallbackHref: '/account/signin',
      backFallbackTitle: 'Sign In',
    },
  }
}
