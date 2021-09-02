import { Container } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { useCartQuery } from '@reachdigital/magento-cart'
import { EditBillingAddressForm } from '@reachdigital/magento-cart-billing-address'
import { CartPageDocument } from '@reachdigital/magento-cart-checkout'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import {
  AppShellTitle,
  GetStaticProps,
  PageMeta,
  responsiveVal,
  SheetShellHeader,
  Title,
} from '@reachdigital/next-ui'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import apolloClient from '../../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<SheetShellProps>

function EditBillingAddress() {
  const { data, error, loading } = useCartQuery(CartPageDocument, { returnPartialData: true })

  console.log(data)

  return (
    <>
      <PageMeta title='Edit billing address' metaRobots={['noindex', 'nofollow']} />

      <SheetShellHeader hideDragIndicator>
        <Title component='span' size='small'>
          Billing address
        </Title>
      </SheetShellHeader>

      <AppShellTitle>
        <Title>Billing address</Title>
      </AppShellTitle>
      <>
        <Container maxWidth='md'>
          <EditBillingAddressForm cartId={data?.cart?.id} address={data?.cart?.billing_address} />
        </Container>
      </>
    </>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'left',
  SharedComponent: SheetShell,
  sharedProps: { variant: 'left', size: responsiveVal(320, 800) },
}
EditBillingAddress.pageOptions = pageOptions

export default EditBillingAddress

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      backFallbackHref: '/checkout/payment',
      backFallbackTitle: 'Payment',
      variant: 'left',
    },
  }
}
