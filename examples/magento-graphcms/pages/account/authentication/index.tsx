import { PageOptions } from '@graphcommerce/framer-next-pages'
import { ChangePasswordForm, WaitForCustomer } from '@graphcommerce/magento-customer'
import { PageMeta } from '@graphcommerce/magento-store'
import {
  SectionContainer,
  iconLock,
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

function AccountAuthenticationPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
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
  layoutProps: { variantMd: 'bottom' },
}
AccountAuthenticationPage.pageOptions = pageOptions

export default AccountAuthenticationPage

export const getStaticProps = enhanceStaticProps(
  layoutProps(() => ({
    props: {
      up: { href: '/account', title: 'Account' },
    },
  })),
)
