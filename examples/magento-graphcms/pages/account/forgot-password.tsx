import { PageOptions } from '@graphcommerce/framer-next-pages'
import { ForgotPasswordForm } from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { AppShellTitle, GetStaticProps, OverlayAppBar, Title } from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Box, Container, NoSsr } from '@material-ui/core'
import React from 'react'
import { LayoutOverlay, LayoutOverlayProps } from '../../components/Layout/LayoutOverlay'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountForgotPasswordPage() {
  return (
    <>
      <OverlayAppBar>
        <Title size='small' component='span'>
          <Trans>Forgot your password?</Trans>
        </Title>
      </OverlayAppBar>
      <Container maxWidth='sm'>
        <PageMeta
          title='Forgot Password'
          metaDescription='Forgot password'
          metaRobots={['noindex']}
        />
        <NoSsr>
          <Box pt={4} textAlign='center'>
            <AppShellTitle>
              <Trans>Forgot your password?</Trans>
            </AppShellTitle>
            <p>
              <Trans>
                No worries! Enter your email address and we will send an email with instructions to
                reset your password.
              </Trans>
            </p>
            <ForgotPasswordForm />
          </Box>
        </NoSsr>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account-public',
  Layout: LayoutOverlay,
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
      up: { href: '/account-signin', title: t`Sign In` },
    },
  }
}
