import { PageOptions, usePageRouter } from '@graphcommerce/framer-next-pages'
import {
  PageMeta,
  StoreConfigDocument,
  StoreSwitcherList,
  StoreSwitcherListDocument,
  StoreSwitcherListQuery,
} from '@graphcommerce/magento-store'
import {
  AppShellTitle,
  GetStaticProps,
  iconShoppingBag,
  responsiveVal,
  OverlayAppBar,
  Title,
} from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Container, NoSsr } from '@material-ui/core'
import React from 'react'
import { LayoutFullProps } from '../components/Layout'
import { LayoutOverlay, LayoutOverlayProps } from '../components/Layout/LayoutOverlay'
import apolloClient from '../lib/apolloClient'

type RouteProps = { country?: string[] }
type Props = StoreSwitcherListQuery
type GetPageStaticProps = GetStaticProps<LayoutFullProps, Props, RouteProps>

function StoresIndexPage({ availableStores }: Props) {
  const { locale } = usePageRouter()

  return (
    <>
      <PageMeta
        title={t`Switch stores`}
        metaDescription={t`Switch stores`}
        metaRobots={['noindex']}
      />
      <NoSsr>
        <OverlayAppBar>
          <Title size='small' component='span' icon={iconShoppingBag}>
            <Trans>Country</Trans>
          </Title>
        </OverlayAppBar>
        <Container maxWidth='md'>
          <AppShellTitle icon={iconShoppingBag}>
            <Trans>Country</Trans>
          </AppShellTitle>
          <StoreSwitcherList availableStores={availableStores} locale={locale} />
        </Container>
      </NoSsr>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'left',
  Layout: LayoutOverlay,
  layoutProps: { variantMd: 'left' },
}
StoresIndexPage.pageOptions = pageOptions

export default StoresIndexPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const conf = client.query({ query: StoreConfigDocument })
  const stores = staticClient.query({ query: StoreSwitcherListDocument })

  return {
    props: {
      ...(await stores).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
