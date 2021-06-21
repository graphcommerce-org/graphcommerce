import { useQuery } from '@apollo/client'
import { Box, Container, NoSsr, TextField, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { CustomerDocument, CustomerTokenDocument } from '@reachdigital/magento-customer'
import SignInForm from '@reachdigital/magento-customer/SignInForm'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import FormRow from '@reachdigital/next-ui/Form/FormRow'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { useRouter } from 'next/router'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../components/AppShell/SheetShell'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<SheetShellProps>

function AccountSessionExpiredPage() {
  const router = useRouter()

  const { loading: customerLoading, data: customerData } = useQuery(CustomerDocument)
  const customer = customerData?.customer

  const { loading: customerTokenLoading, data: customerTokenData } = useQuery(CustomerTokenDocument)
  const requireAuth = false

  // Boolean(
  //   customerTokenData?.customerToken && !customerTokenData?.customerToken.valid,
  // )

  console.log(customer)

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
          <Typography variant='h3'>Your session is expired</Typography>
          <Typography variant='body1'>Login to continue shopping!</Typography>

          <FormRow>
            <TextField
              key='email'
              variant='outlined'
              type='text'
              autoFocus
              label='Email'
              value={customer?.email ?? 'yvo@reachdigital.nl'}
              InputProps={{
                readOnly: true,
              }}
            />
          </FormRow>

          {requireAuth && <SignInForm email={customer?.email ?? 'yvo@reachdigital.nl'} />}
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
