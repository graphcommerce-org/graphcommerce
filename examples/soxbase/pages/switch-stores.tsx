import { makeStyles, Theme, Typography, Container } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import {
  AvailableStoresDocument,
  AvailableStoresQuery,
} from '@reachdigital/magento-store/switcher/AvailableStores.gql'
import StoreSwitcher from '@reachdigital/magento-store/switcher/StoreSwitcher'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import { useRouter } from 'next/router'
import React from 'react'
import OverlayPage from '../components/AppShell/OverlayUi'
import apolloClient from '../lib/apolloClient'

type RouteProps = { country?: string[] }
type Props = AvailableStoresQuery
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    textAlign: 'center',
    padding: `${theme.spacings.md} 0`,
  },
}))

function StoresIndexPage({ availableStores, countries }: Props) {
  const { locale } = useRouter()
  const classes = useStyles()

  return (
    <OverlayPage title='Switch Stores' variant='left' backFallbackHref='/' backFallbackTitle='Home'>
      <PageMeta title='Switch stores' metaDescription='Switch stores' metaRobots={['noindex']} />
      {availableStores && countries && (
        <Container maxWidth='xs'>
          <Typography variant='h2' component='h1' className={classes.title}>
            Country
          </Typography>
          <StoreSwitcher
            countries={countries}
            stores={availableStores}
            locale={locale}
            fallbackCountry={{
              full_name_locale: 'International',
              id: 'EU',
              two_letter_abbreviation: 'eu',
            }}
          />
        </Container>
      )}
    </OverlayPage>
  )
}

StoresIndexPage.Layout = PageLayout

registerRouteUi('/switch-stores', OverlayPage)

export default StoresIndexPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const config = client.query({ query: StoreConfigDocument })
  const availableStores = staticClient.query({ query: AvailableStoresDocument })

  return {
    props: {
      ...(await availableStores).data,
      apolloState: await config.then(() => client.cache.extract()),
    },
  }
}
