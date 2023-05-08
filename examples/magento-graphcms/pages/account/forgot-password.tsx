import { PageOptions } from '@graphcommerce/framer-next-pages'
import { ForgotPasswordForm } from '@graphcommerce/magento-customer'
import { PageMeta } from '@graphcommerce/magento-store'
import { LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container, Typography } from '@mui/material'
import { InferGetStaticPropsType } from 'next'
import { LayoutOverlay, LayoutOverlayProps } from '../../components'
import { layoutProps } from '../../components/Layout/layout'

function AccountForgotPasswordPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span'>
          <Trans id='Forgot your password?' />
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='sm'>
        <PageMeta title={i18n._(/* i18n */ 'Forgot Password')} metaRobots={['noindex']} />
        <LayoutTitle size='medium'>
          <Trans id='Forgot your password?' />
        </LayoutTitle>
        <Typography variant='subtitle1'>
          <Trans id='No worries! Enter your email address and we will send an email with instructions to reset your password.' />
        </Typography>
        <ForgotPasswordForm />
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account-public',
  sharedKey: () => 'account-signin',
  Layout: LayoutOverlay,
  layoutProps: { variantMd: 'bottom' },
}
AccountForgotPasswordPage.pageOptions = pageOptions

export default AccountForgotPasswordPage

export const getStaticProps = enhanceStaticProps(
  layoutProps(() => ({
    props: {
      up: { href: '/account/signin', title: i18n._(/* i18n */ 'Sign in') },
    },
  })),
)
