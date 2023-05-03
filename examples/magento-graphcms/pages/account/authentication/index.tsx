import { PageOptions } from '@graphcommerce/framer-next-pages'
import { ChangePasswordForm, WaitForCustomer } from '@graphcommerce/magento-customer'
import { PageMeta } from '@graphcommerce/magento-store'
import {
  GetStaticProps,
  SectionContainer,
  iconLock,
  LayoutOverlayHeader,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'

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
        <WaitForCustomer>
          <PageMeta title={i18n._(/* i18n */ 'Authentication')} metaRobots={['noindex']} />
          <LayoutTitle icon={iconLock}>
            <Trans id='Authentication' />
          </LayoutTitle>
          <SectionContainer labelLeft={<Trans id='Password' />}>
            <ChangePasswordForm />
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
AccountAuthenticationPage.pageOptions = pageOptions

export default AccountAuthenticationPage

export const getStaticProps: GetPageStaticProps = enhanceStaticProps(() => ({
  props: {
    variantMd: 'bottom',
    size: 'max',
    up: { href: '/account', title: 'Account' },
  },
}))
