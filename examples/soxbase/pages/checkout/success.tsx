import { Container, NoSsr } from '@material-ui/core'
import { ArrowForwardIos } from '@material-ui/icons'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { ShippingPageDocument } from '@reachdigital/magento-cart-checkout/ShippingPage.gql'
import EmailForm from '@reachdigital/magento-cart-email/EmailForm/EmailForm'
import ShippingAddressForm from '@reachdigital/magento-cart-shipping-address/ShippingAddressForm/ShippingAddressForm'
import ShippingMethodForm from '@reachdigital/magento-cart-shipping-method/ShippingMethodForm/ShippingMethodForm'
import { useCartQuery } from '@reachdigital/magento-cart/CurrentCartId/useCartQuery'
import EmptyCart from '@reachdigital/magento-cart/EmptyCart/EmptyCart'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import Button from '@reachdigital/next-ui/Button'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import FormHeader from '@reachdigital/next-ui/FormHeader'
import IconTitle from '@reachdigital/next-ui/IconTitle'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import CheckoutStepper from '@reachdigital/next-ui/Stepper/Stepper'
import {
  ComposedForm,
  ComposedSubmit,
  ComposedSubmitRenderComponentProps,
} from '@reachdigital/react-hook-form'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import SheetShell, { SheetShellProps } from '../../components/AppShell/SheetShell'
import apolloClient from '../../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props>

function ShippingPage() {
  const router = useRouter()
  const cartId = router.query.cartId as string

  return (
    <Container maxWidth='md'>
      <PageMeta title='Checkout' metaDescription='Cart Items' metaRobots={['noindex']} />
      <NoSsr>Show info about cartId: {cartId}</NoSsr>
    </Container>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'checkout',
  SharedComponent: SheetShell,
  sharedKey: () => 'checkout',
  sharedProps: { variant: 'bottom', size: 'max' },
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
