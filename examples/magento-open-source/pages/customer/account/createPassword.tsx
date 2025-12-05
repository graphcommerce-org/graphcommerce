import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { getCustomerAccountIsDisabled, ResetPasswordForm } from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Box, Button, Container, Link } from '@mui/material'
import { useRouter } from 'next/router'
import type { LayoutOverlayProps } from '../../../components'
import { LayoutOverlay } from '../../../components'
import { graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function CustomerAccountCreatePasswordPage() {
  const { token, success } = useRouter().query

  if (typeof token !== 'undefined' && success === 'undefined') return null

  return (
    <>
      <PageMeta title={t`Create new password`} metaRobots={['noindex']} />
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span'>
          {!success ? (
            <Trans>Set your new password</Trans>
          ) : (
            <Trans>You have now successfully reset your password</Trans>
          )}
        </LayoutTitle>
      </LayoutOverlayHeader>

      {!success && (
        <Container maxWidth='sm'>
          <LayoutTitle gutterBottom={false}>
            <Trans>Set your new password</Trans>
          </LayoutTitle>

          <Box sx={{ textAlign: 'center' }}>
            <p>
              <Trans>Fill in your new password, confirm it and click on the save button.</Trans>
            </p>
          </Box>

          <ResetPasswordForm token={(token as string) ?? ''} />
        </Container>
      )}

      {success && (
        <Container>
          <LayoutTitle gutterBottom={false}>
            <Trans>You have now successfully reset your password</Trans>
          </LayoutTitle>

          <Box sx={{ textAlign: 'center' }}>
            <p>
              <Trans>
                You can now{' '}
                <Link color='primary' href='/account/signin' underline='hover'>
                  sign in again
                </Link>
                .
              </Trans>
            </p>
          </Box>
        </Container>
      )}
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account-public',
  sharedKey: () => 'account-public',
  Layout: LayoutOverlay,
}
CustomerAccountCreatePasswordPage.pageOptions = pageOptions

export default CustomerAccountCreatePasswordPage

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
