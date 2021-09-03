import { Container, NoSsr } from '@material-ui/core'
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
import { DefaultPageDocument } from '../../../components/GraphQL/DefaultPage.gql'
import apolloClient from '../../../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<SheetShellProps, Props>

function EditBillingAddress() {
  const { data, loading } = useCartQuery(CartPageDocument, {
    fetchPolicy: 'network-only',
  })

  if (loading) return <></>

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

      <Container maxWidth='md'>
        <NoSsr>
          <EditBillingAddressForm cartId={data?.cart?.id} address={data?.cart?.billing_address} />
        </NoSsr>
      </Container>
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
  const staticClient = apolloClient(locale)

  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: `checkout`,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })

  return {
    props: {
      ...(await page).data,
      backFallbackHref: '/checkout/payment',
      backFallbackTitle: 'Payment',
      variant: 'left',
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
