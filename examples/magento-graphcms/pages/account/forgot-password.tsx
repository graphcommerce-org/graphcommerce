import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useGoogleRecaptcha } from '@graphcommerce/googlerecaptcha'
import { ForgotPasswordForm } from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { t, Trans } from '@graphcommerce/lingui-next'
import { Container, NoSsr, Typography } from '@mui/material'
import { LayoutOverlay, LayoutOverlayProps } from '../../components'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountForgotPasswordPage() {
  useGoogleRecaptcha()

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span'>
          <Trans>Forgot your password?</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='sm'>
        <PageMeta
          title='Forgot Password'
          metaDescription='Forgot password'
          metaRobots={['noindex']}
        />
        <NoSsr>
          <LayoutTitle size='medium'>
            <Trans>Forgot your password?</Trans>
          </LayoutTitle>
          <Typography variant='subtitle1'>
            <Trans>
              No worries! Enter your email address and we will send an email with instructions to
              reset your password.
            </Trans>
          </Typography>
          <ForgotPasswordForm />
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
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
      size: 'max',
      up: { href: '/account-signin', title: t`Sign in` },
    },
  }
}
