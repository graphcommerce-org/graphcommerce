import { PageOptions } from '@graphcommerce/framer-next-pages'
import { ResetPasswordForm } from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  AppShellTitle,
  Button,
  GetStaticProps,
  SheetShellHeader,
  Title,
} from '@graphcommerce/next-ui'
import { Box, Container, Link, NoSsr } from '@material-ui/core'
import router, { useRouter } from 'next/router'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../../components/AppShell/SheetShell'
import apolloClient from '../../../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<SheetShellProps>

function CustomerAccountCreatePasswordPage() {
  const { query } = useRouter()
  const { token, success } = query

  if (typeof token !== 'undefined' && success === 'undefined') return <></>

  return (
    <>
      <PageMeta
        title='Create new Password'
        metaDescription='Create new password'
        metaRobots={['noindex']}
      />
      <SheetShellHeader backFallbackHref='/account/signin' backFallbackTitle='Sign In'>
        <Title size='small' component='span'>
          {!success ? 'Set your new password' : 'You have now successfully reset your password'}
        </Title>
      </SheetShellHeader>
      <NoSsr>
        <Box pt={4} pb={4}>
          {!success && (
            <Container maxWidth='sm'>
              <AppShellTitle>Set your new password</AppShellTitle>

              <Box textAlign='center'>
                <p>Fill in your new password, confirm it and click on the save button.</p>
              </Box>

              <ResetPasswordForm token={(token as string) ?? ''} />
            </Container>
          )}

          {success && (
            <Container>
              <AppShellTitle>You have now successfully reset your password</AppShellTitle>

              <Box textAlign='center'>
                <p>
                  You can now{' '}
                  <Link color='primary' href='/account/signin'>
                    sign in again
                  </Link>
                  .
                </p>

                <Button
                  onClick={() => router.back()}
                  color='primary'
                  variant='contained'
                  size='large'
                >
                  Continue shopping
                </Button>
              </Box>
            </Container>
          )}
        </Box>
      </NoSsr>
    </>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'account-public',
  SharedComponent: SheetShell,
}
CustomerAccountCreatePasswordPage.pageOptions = pageOptions

export default CustomerAccountCreatePasswordPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variant: 'bottom',
      size: 'max',
    },
  }
}
