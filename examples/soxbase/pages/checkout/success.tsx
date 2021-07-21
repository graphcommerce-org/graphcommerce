import { Box, Container } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { CartItemSummary, CartSummary } from '@reachdigital/magento-cart'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import {
  Button,
  GetStaticProps,
  iconParty,
  PageShellHeader,
  Stepper,
  Title,
} from '@reachdigital/next-ui'
import PageLink from 'next/link'
import React from 'react'
import { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import MinimalPageShell, { MinimalPageShellProps } from '../../components/AppShell/MinimalPageShell'
import apolloClient from '../../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props>

function ShippingPage() {
  return (
    <>
      <PageMeta title='Checkout summary' metaDescription='Ordered items' metaRobots={['noindex']} />
      <PageShellHeader
        primary={
          <PageLink href='/checkout/payment' passHref>
            {/* TODO: PaymentMethodButton primary action */}
            <Button color='secondary' variant='pill-link'>
              Back to Home
            </Button>
          </PageLink>
        }
        divider={
          <Container maxWidth={false}>
            <Stepper steps={3} currentStep={3} />
          </Container>
        }
      >
        <Title size='small' icon={iconParty}>
          Thank you for your order!
        </Title>
      </PageShellHeader>
      <Container maxWidth='md'>
        <CartSummary />
        <CartItemSummary />
        <Box textAlign='center' m={8}>
          <PageLink href='/' passHref>
            <Button color='secondary' variant='pill' size='large' text='bold'>
              Continue shopping
            </Button>
          </PageLink>
        </Box>
      </Container>
    </>
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
