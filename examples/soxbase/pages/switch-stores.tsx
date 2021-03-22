import { makeStyles, Theme, Typography, Container } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import StoreSwitcherList from '@reachdigital/magento-store/switcher/StoreSwitcherList'
import {
  StoreSwitcherListDocument,
  StoreSwitcherListQuery,
} from '@reachdigital/magento-store/switcher/StoreSwitcherList.gql'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import { useRouter } from 'next/router'
import React from 'react'
import OverlayPage from '../components/AppShell/OverlayPage'
import apolloClient from '../lib/apolloClient'

type RouteProps = { country?: string[] }
type Props = StoreSwitcherListQuery
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    textAlign: 'center',
    padding: `${theme.spacings.md} 0`,
  },
}))

function StoresIndexPage({ availableStores }: Props) {
  const { locale } = useRouter()
  const classes = useStyles()

  return (
    <OverlayPage title='Switch Stores' variant='left' backFallbackHref='/' backFallbackTitle='Home'>
      <PageMeta title='Switch stores' metaDescription='Switch stores' metaRobots={['noindex']} />

      <Container maxWidth='md'>
        <Typography variant='h2' component='h1' className={classes.title}>
          Country
        </Typography>

        <StoreSwitcherList availableStores={availableStores} locale={locale} />
      </Container>
    </OverlayPage>
  )
}

StoresIndexPage.Layout = PageLayout

registerRouteUi('/switch-stores', OverlayPage)

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
