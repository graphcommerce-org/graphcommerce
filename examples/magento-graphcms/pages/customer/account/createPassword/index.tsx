import { PageOptions } from '@graphcommerce/framer-next-pages'
import { ResetPasswordForm } from '@graphcommerce/magento-customer'
import { PageMeta } from '@graphcommerce/magento-store'
import { LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Container, Link, Button } from '@mui/material'
import { InferGetStaticPropsType } from 'next'
import router, { useRouter } from 'next/router'
import { LayoutOverlay, LayoutOverlayProps } from '../../../../components'
import { layoutProps } from '../../../../components/Layout/layout'

function CustomerAccountCreatePasswordPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { token, success } = useRouter().query

  if (typeof token !== 'undefined' && success === 'undefined') return null

  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'Create new password')} metaRobots={['noindex']} />
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span'>
          {!success ? (
            <Trans id='Set your new password' />
          ) : (
            <Trans id='You have now successfully reset your password' />
          )}
        </LayoutTitle>
      </LayoutOverlayHeader>

      {!success && (
        <Container maxWidth='sm'>
          <LayoutTitle gutterBottom={false}>
            <Trans id='Set your new password' />
          </LayoutTitle>

          <Box textAlign='center'>
            <p>
              <Trans id='Fill in your new password, confirm it and click on the save button.' />
            </p>
          </Box>

          <ResetPasswordForm token={(token as string) ?? ''} />
        </Container>
      )}

      {success && (
        <Container>
          <LayoutTitle gutterBottom={false}>
            <Trans id='You have now successfully reset your password' />
          </LayoutTitle>

          <Box textAlign='center'>
            <p>
              <Trans
                id='You can now <0>sign in again</0>.'
                components={{
                  0: <Link color='primary' href='/account/signin' underline='hover' />,
                }}
              />
            </p>

            <Button onClick={() => router.back()} variant='pill' color='secondary' size='large'>
              <Trans id='Continue shopping' />
            </Button>
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
  layoutProps: { variantMd: 'bottom' },
}
CustomerAccountCreatePasswordPage.pageOptions = pageOptions

export default CustomerAccountCreatePasswordPage

export const getStaticProps = enhanceStaticProps(
  layoutProps(() => ({
    props: {
      up: { href: '/account/signin', title: 'Sign in' },
    },
  })),
)
