import type { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  AccountMenuItem,
  ChangePasswordForm,
  getCustomerAccountIsDisabled,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  iconBin,
  iconLock,
  LayoutOverlayHeader,
  LayoutTitle,
  SectionContainer,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import type { LayoutOverlayProps } from '../../../components'
import { LayoutOverlay } from '../../../components'
import { graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountAuthenticationPage() {
  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconLock}>
          <Trans id='Authentication' />
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        <PageMeta title={i18n._(/* i18n */ 'Authentication')} metaRobots={['noindex']} />
        <WaitForCustomer>
          <LayoutTitle icon={iconLock}>
            <Trans id='Authentication' />
          </LayoutTitle>
          <SectionContainer labelLeft={<Trans id='Password' />}>
            <ChangePasswordForm />
          </SectionContainer>

          {import.meta.graphCommerce.magentoVersion >= 246 &&
            import.meta.graphCommerce.customerDeleteEnabled && (
              <AccountMenuItem
                href='/account/delete'
                disableRipple
                iconSrc={iconBin}
                title={<Trans id='Delete account' />}
              />
            )}
        </WaitForCustomer>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account',
  sharedKey: ({ asPath }) => asPath,
  Layout: LayoutOverlay,
}
AccountAuthenticationPage.pageOptions = pageOptions

export default AccountAuthenticationPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCustomerAccountIsDisabled(context.locale)) return { notFound: true }

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
      up: { href: '/account', title: i18n._(/* i18n */ 'Account') },
    },
  }
}
