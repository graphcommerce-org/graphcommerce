import { Container, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { CartItemSummary, CartSummary } from '@reachdigital/magento-cart'
import { ContinueShoppingButton } from '@reachdigital/magento-customer'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import { IconHeader, GetStaticProps, Stepper, iconParty } from '@reachdigital/next-ui'
import React from 'react'
import { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import MinimalPageShell, { MinimalPageShellProps } from '../../components/AppShell/MinimalPageShell'
import apolloClient from '../../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props>

function ShippingPage() {
  return (
    <Container maxWidth='md'>
      <PageMeta title='Checkout summary' metaDescription='Ordered items' metaRobots={['noindex']} />

      <Typography variant='h6' component='h1' align='center'>
        Checkout
      </Typography>

      <Stepper steps={3} currentStep={3} key='checkout-stepper' />

      <IconHeader src={iconParty} title='Thank you for your order' alt='celebrate' size='large' />

      <CartSummary />

      <CartItemSummary />

      <ContinueShoppingButton variant='pill' color='secondary' route='/' />
    </Container>
  )
}

const pageOptions: PageOptions<MinimalPageShellProps> = {
  overlayGroup: 'checkout',
  SharedComponent: MinimalPageShell,
  sharedKey: () => 'checkout',
}
ShippingPage.pageOptions = pageOptions

export default ShippingPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
