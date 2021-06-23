import { useQuery } from '@apollo/client'
import { Box, Container, NoSsr, TextField, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { CustomerDocument, CustomerTokenDocument } from '@reachdigital/magento-customer'
import SignInForm from '@reachdigital/magento-customer/SignInForm'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import Button from '@reachdigital/next-ui/Button'
import FormRow from '@reachdigital/next-ui/Form/FormRow'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import AnimatedRow from '../../../../packages/next-ui/AnimatedRow'
import SheetShell, { SheetShellProps } from '../../components/AppShell/SheetShell'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<SheetShellProps>

function AccountSessionExpiredPage() {
  // const router = useRouter()

  const { loading: customerLoading, data: customerData } = useQuery(CustomerDocument)
  const customer = customerData?.customer

  const [continued, setContinued] = useState<boolean>(false)

  const { loading: customerTokenLoading, data: customerTokenData } = useQuery(CustomerTokenDocument)
  const requireAuth = Boolean(
    customerTokenData?.customerToken && !customerTokenData?.customerToken.valid,
  )

  // useEffect(() => {
  //   if (!requireAuth) router.back()
  // }, [requireAuth, router])

  if (customerLoading || customerTokenLoading) return <></>

  return (
    <Container maxWidth='sm'>
      <PageMeta
        title='Session expired'
        metaDescription='Session expired'
        metaRobots={['noindex', 'nofollow']}
      />
      <NoSsr>
        <Box pt={4} textAlign='center'>
          <AnimatePresence>
            {!requireAuth && (
              <>
                <Typography variant='h3'>You are now logged in again!</Typography>
              </>
            )}

            {requireAuth && (
              <>
                <Typography variant='h3'>Your session is expired</Typography>
                <Typography variant='body1'>Login to continue shopping!</Typography>
                <AnimatedRow key='email-field'>
                  <FormRow>
                    <TextField
                      key='email'
                      variant='outlined'
                      type='text'
                      autoFocus
                      label='Email'
                      value={customer?.email ?? 'info@reachdigital.nl'}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormRow>
                </AnimatedRow>

                <AnimatedRow key='continue-btn'>
                  {!continued && (
                    <Button
                      onClick={() => setContinued(true)}
                      color='primary'
                      variant='contained'
                      size='large'
                      text='bold'
                    >
                      Continue
                    </Button>
                  )}
                </AnimatedRow>

                {continued && (
                  <AnimatedRow key='signinform'>
                    <SignInForm
                      email={customer?.email ?? 'info@reachdigital.nl'}
                      hideSessionExpiredAlert
                    />
                  </AnimatedRow>
                )}
              </>
            )}
          </AnimatePresence>
        </Box>
      </NoSsr>
    </Container>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'account-public',
  SharedComponent: SheetShell,
  sharedKey: () => 'account',
}
AccountSessionExpiredPage.pageOptions = pageOptions

export default AccountSessionExpiredPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variant: 'top',
      backFallbackHref: '/',
      backFallbackTitle: 'Home',
    },
  }
}
