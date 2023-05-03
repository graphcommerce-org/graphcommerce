import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  ChangeNameForm,
  CustomerDocument,
  useCustomerQuery,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { PageMeta } from '@graphcommerce/magento-store'
import {
  GetStaticProps,
  iconId,
  SectionContainer,
  LayoutOverlayHeader,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'

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
          <Trans id='Name' />
        </LayoutTitle>
      </LayoutOverlayHeader>

      <Container maxWidth='md'>
        <WaitForCustomer waitFor={dashboard}>
          <PageMeta title={i18n._(/* i18n */ 'Name')} metaRobots={['noindex']} />

          <LayoutTitle icon={iconId}>
            <Trans id='Name' />
          </LayoutTitle>

          <SectionContainer labelLeft={<Trans id='Name' />}>
            {customer && (
              <ChangeNameForm
                prefix={customer.prefix ?? ''}
                firstname={customer.firstname ?? ''}
                lastname={customer.lastname ?? ''}
              />
            )}
          </SectionContainer>
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

export const getStaticProps: GetPageStaticProps = enhanceStaticProps(() => ({
  props: {
    variantMd: 'bottom',
    size: 'max',
    up: { href: '/account', title: 'Account' },
  },
}))
