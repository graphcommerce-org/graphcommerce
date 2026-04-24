import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { ForgotPasswordForm, getCustomerAccountIsDisabled } from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Container, Typography } from '@mui/material'
import type { LayoutOverlayProps } from '../../components'
import { LayoutOverlay } from '../../components'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountForgotPasswordPage() {
  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span'>
          <Trans>Forgot your password?</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='sm'>
        <PageMeta title={t`Forgot Password`} metaRobots={['noindex']} />
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
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account-public',
  sharedKey: () => 'account-public',
  Layout: LayoutOverlay,
}
AccountForgotPasswordPage.pageOptions = pageOptions

export default AccountForgotPasswordPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCustomerAccountIsDisabled(context.locale)) return { notFound: true }

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
      up: { href: '/account/signin', title: t`Sign in` },
    },
  }
}
