import { PageOptions } from '@graphcommerce/framer-next-pages'
import { ForgotPasswordForm } from '@graphcommerce/magento-customer'
import { PageMeta } from '@graphcommerce/magento-store'
import { GetStaticProps, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container, Typography } from '@mui/material'
import { LayoutOverlay, LayoutOverlayProps } from '../../components'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountForgotPasswordPage() {
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
}
AccountForgotPasswordPage.pageOptions = pageOptions

export default AccountForgotPasswordPage

export const getStaticProps: GetPageStaticProps = enhanceStaticProps(() => ({
  props: {
    variantMd: 'bottom',
    size: 'max',
    up: { href: '/account/signin', title: i18n._(/* i18n */ 'Sign in') },
  },
}))
