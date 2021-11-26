import { PageOptions } from '@graphcommerce/framer-next-pages'
import { EditBillingAddressForm } from '@graphcommerce/magento-cart-billing-address'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  AppShellTitle,
  GetStaticProps,
  PageMeta,
  responsiveVal,
  SheetShellHeader,
  Title,
} from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Container, NoSsr } from '@material-ui/core'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import { DefaultPageDocument } from '../../../components/GraphQL/DefaultPage.gql'
import apolloClient from '../../../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<SheetShellProps, Props>

function EditBillingAddress() {
  return (
    <>
      <PageMeta title={t`Edit billing address`} metaRobots={['noindex', 'nofollow']} />

      <SheetShellHeader>
        <Title component='span' size='small'>
          <Trans>Billing address</Trans>
        </Title>
      </SheetShellHeader>

      <AppShellTitle>
        <Title>
          <Trans>Billing address</Trans>
        </Title>
      </AppShellTitle>

      <Container maxWidth='md'>
        <NoSsr>
          <EditBillingAddressForm />
        </NoSsr>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'left',
  SharedComponent: SheetShell,
  sharedProps: { variantMd: 'left' },
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
      apolloState: await conf.then(() => client.cache.extract()),
      ...(await page).data,
      variant: 'left',
    },
  }
}
