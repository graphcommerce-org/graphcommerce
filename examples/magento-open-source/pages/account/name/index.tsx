import type { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  ChangeNameForm,
  CustomerDocument,
  CustomerUpdateForm,
  getCustomerAccountIsDisabled,
  useCustomerQuery,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { PageMeta, preloadAttributesForm, StoreConfigDocument } from '@graphcommerce/magento-store'
import { magentoVersion } from '@graphcommerce/next-config/config'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { iconId, LayoutOverlayHeader, LayoutTitle, SectionContainer } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import type { LayoutOverlayProps } from '../../../components'
import { LayoutOverlay } from '../../../components'
import { graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountNamePage() {
  const dashboard = useCustomerQuery(CustomerDocument, {
    fetchPolicy: 'cache-and-network',
  })
  const customer = dashboard.data?.customer

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconId}>
          <Trans id='Personal details' />
        </LayoutTitle>
      </LayoutOverlayHeader>

      <Container maxWidth='md'>
        <WaitForCustomer waitFor={dashboard}>
          <PageMeta title={i18n._(/* i18n */ 'Personal details')} metaRobots={['noindex']} />

          <LayoutTitle icon={iconId}>
            <Trans id='Personal details' />
          </LayoutTitle>

          {magentoVersion < 247 ? (
            <SectionContainer labelLeft={<Trans id='Name' />}>
              {customer && (
                <ChangeNameForm
                  prefix={customer.prefix ?? ''}
                  firstname={customer.firstname ?? ''}
                  lastname={customer.lastname ?? ''}
                />
              )}
            </SectionContainer>
          ) : (
            <>{customer && <CustomerUpdateForm customer={customer} />}</>
          )}
        </WaitForCustomer>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account',
  Layout: LayoutOverlay,
}
AccountNamePage.pageOptions = pageOptions

export default AccountNamePage

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCustomerAccountIsDisabled(context.locale)) return { notFound: true }

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  if (magentoVersion >= 247) await preloadAttributesForm(client, 'customer_account_edit')

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
      up: { href: '/account', title: i18n._(/* i18n */ 'Account') },
    },
  }
}
