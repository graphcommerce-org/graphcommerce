import type { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  AccountMenuItem,
  ChangePasswordForm,
  getCustomerAccountIsDisabled,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { customerDeleteEnabled, magentoVersion } from '@graphcommerce/next-config/config'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  iconBin,
  iconLock,
  LayoutOverlayHeader,
  LayoutTitle,
  SectionContainer,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
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
          <Trans>Authentication</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        <PageMeta title={t`Authentication`} metaRobots={['noindex']} />
        <WaitForCustomer>
          <LayoutTitle icon={iconLock}>
            <Trans>Authentication</Trans>
          </LayoutTitle>
          <SectionContainer labelLeft={<Trans>Password</Trans>}>
            <ChangePasswordForm />
          </SectionContainer>

          {magentoVersion >= 246 && customerDeleteEnabled && (
            <AccountMenuItem
              href='/account/delete'
              disableRipple
              iconSrc={iconBin}
              title={<Trans>Delete account</Trans>}
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
      up: { href: '/account', title: t`Account` },
    },
  }
}
