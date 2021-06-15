import { useQuery } from '@apollo/client'
import { Container, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { CartPageDocument, OrderSummary } from '@reachdigital/magento-cart-checkout'
<<<<<<< HEAD
import {
  AddressMultiLine,
  AddressMultiLine,
  OrderStateLabelInline,
} from '@reachdigital/magento-customer'
import InlineAccount from '@reachdigital/magento-customer/InlineAccount'
import { ConfigurableCartItem } from '@reachdigital/magento-product-configurable'

=======
import { CartItemsQueryDocument } from '@reachdigital/magento-cart-items/CartItems/CartItemsQuery.gql'
import { OrderDetails } from '@reachdigital/magento-customer'
>>>>>>> 719691ca (refactor: cleanup succes page components)
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import IconHeader from '@reachdigital/next-ui/IconHeader'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import Stepper from '@reachdigital/next-ui/Stepper/Stepper'
import { iconParty } from '@reachdigital/next-ui/icons'
import { useRouter } from 'next/router'
import React from 'react'
import { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import MinimalPageShell, { MinimalPageShellProps } from '../../components/AppShell/MinimalPageShell'
import apolloClient from '../../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props>

// const useStyles = makeStyles((theme: Theme) => ({}), { name: 'OrderSuccess' })

function ShippingPage() {
  const router = useRouter()

  const { data, error } = useQuery(CartPageDocument, {
    returnPartialData: false,
    variables: { cartId: router.query.cartId as string },
  })

  return (
    <Container maxWidth='md'>
      <PageMeta title='Checkout summary' metaDescription='Ordered items' metaRobots={['noindex']} />

      <Typography variant='h6' component='h1' align='center'>
        Checkout
      </Typography>

      <Stepper steps={3} currentStep={3} key='checkout-stepper' />

      <IconHeader src={iconParty} title='Thank you for your order' alt='celebrate' size='large' />
      <OrderDetails />

      <OrderSummary {...data?.cart} />
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
  const staticClient = apolloClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
