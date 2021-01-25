import { Container } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import {
  AvailableStoresDocument,
  AvailableStoresQuery,
} from '@reachdigital/magento-store/switcher/AvailableStores.gql'
import StoreSwitcher from '@reachdigital/magento-store/switcher/StoreSwitcher'
import OverlayUi from '@reachdigital/next-ui/AppShell/OverlayUi'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import { useRouter } from 'next/router'
import React from 'react'
import apolloClient from '../lib/apolloClient'

type RouteProps = { country?: string[] }
type Props = AvailableStoresQuery
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

function StoresIndexPage({ availableStores, countries }: Props) {
  const { locale } = useRouter()

  return (
    <OverlayUi title='Switch Stores' variant='bottom'>
      <PageMeta
        title='Switch stores'
        metaDescription='Switch stores'
        metaRobots='NOINDEX, FOLLOW'
      />
      {availableStores && countries && (
        <Container maxWidth='xs'>
          <StoreSwitcher
            countries={countries}
            stores={availableStores}
            locale={locale}
            fallbackCountry={{
              full_name_locale: 'International',
              id: 'EU',
              two_letter_abbreviation: 'EU',
            }}
          />
        </Container>
      )}
    </OverlayUi>
  )
}

StoresIndexPage.Layout = PageLayout

registerRouteUi('/switch-stores', OverlayUi)

export default StoresIndexPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(localeToStore(locale))
  const staticClient = apolloClient(localeToStore(locale))

  const config = client.query({ query: StoreConfigDocument })
  const pageLayout = staticClient.query({ query: PageLayoutDocument })
  const availableStores = staticClient.query({ query: AvailableStoresDocument })

  await config
  return {
    props: {
      ...(await pageLayout).data,
      ...(await availableStores).data,
      apolloState: client.cache.extract(),
    },
  }
}
