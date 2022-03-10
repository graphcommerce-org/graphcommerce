import { PageOptions } from '@graphcommerce/framer-next-pages'
import { ResetPasswordForm } from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Box, Container, Link, NoSsr, Button } from '@mui/material'
import router, { useRouter } from 'next/router'
import React from 'react'
import { LayoutOverlay, LayoutOverlayProps } from '../../../../components'
import { graphqlSharedClient } from '../../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function CustomerAccountCreatePasswordPage() {
  const { token, success } = useRouter().query

  if (typeof token !== 'undefined' && success === 'undefined') return null

  return (
    <>
      <PageMeta
        title={t`Create new password`}
        metaDescription={t`Create new password`}
        metaRobots={['noindex']}
      />
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span'>
          {!success ? t`Set your new password` : t`You have now successfully reset your password`}
        </LayoutTitle>
      </LayoutOverlayHeader>
      <NoSsr>
        <Box pt={4} pb={4}>
          {!success && (
            <Container maxWidth='sm'>
              <LayoutTitle>
                <Trans>Set your new password</Trans>
              </LayoutTitle>

              <Box textAlign='center'>
                <p>
                  <Trans>Fill in your new password, confirm it and click on the save button.</Trans>
                </p>
              </Box>

              <ResetPasswordForm token={(token as string) ?? ''} />
            </Container>
          )}

          {success && (
            <Container>
              <LayoutTitle>
                <Trans>You have now successfully reset your password</Trans>
              </LayoutTitle>

              <Box textAlign='center'>
                <p>
                  <Trans>
                    You can now
                    <Link color='primary' href='/account/signin' underline='hover'>
                      sign in again
                    </Link>
                    .
                  </Trans>
                </p>

                <Button onClick={() => router.back()} variant='pill' color='secondary' size='large'>
                  <Trans>Continue shopping</Trans>
                </Button>
              </Box>
            </Container>
          )}
        </Box>
      </NoSsr>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account-public',
  Layout: LayoutOverlay,
}
CustomerAccountCreatePasswordPage.pageOptions = pageOptions

export default CustomerAccountCreatePasswordPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
      size: 'max',
      up: { href: '/account/signin', title: 'Sign in' },
    },
  }
}
