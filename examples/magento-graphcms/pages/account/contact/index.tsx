import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  CustomerDocument,
  UpdateCustomerEmailForm,
  useCustomerQuery,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { PageMeta } from '@graphcommerce/magento-store'
import {
  iconEmailOutline,
  SectionContainer,
  LayoutOverlayHeader,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import { InferGetStaticPropsType } from 'next'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { layoutProps } from '../../../components/Layout/layout'

function AccountContactPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const dashboard = useCustomerQuery(CustomerDocument, {
    fetchPolicy: 'cache-and-network',
  })
  const customer = dashboard.data?.customer

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconEmailOutline}>
          <Trans id='Contact' />
        </LayoutTitle>
      </LayoutOverlayHeader>
      <WaitForCustomer waitFor={dashboard}>
        <Container maxWidth='md'>
          <PageMeta title={i18n._(/* i18n */ 'Contact')} metaRobots={['noindex']} />

          <LayoutTitle icon={iconEmailOutline}>
            <Trans id='Contact' />
          </LayoutTitle>

          <SectionContainer labelLeft='Email'>
            {customer && <UpdateCustomerEmailForm email={customer.email ?? ''} />}
          </SectionContainer>
        </Container>
      </WaitForCustomer>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account',
  Layout: LayoutOverlay,
  layoutProps: { variantMd: 'bottom' },
}
AccountContactPage.pageOptions = pageOptions

export default AccountContactPage

export const getStaticProps = enhanceStaticProps(
  layoutProps(() => ({
    props: {
      up: { href: '/account', title: 'Account' },
    },
  })),
)
