import { makeStyles, Theme, Typography, Container } from '@material-ui/core'
import { PageOptions, usePageRouter } from '@reachdigital/framer-next-pages'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import StoreSwitcherList from '@reachdigital/magento-store/switcher/StoreSwitcherList'
import {
  StoreSwitcherListDocument,
  StoreSwitcherListQuery,
} from '@reachdigital/magento-store/switcher/StoreSwitcherList.gql'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import React from 'react'
import { FullPageShellProps } from '../components/AppShell/FullPageShell'
import SheetShell, { SheetShellProps } from '../components/AppShell/SheetShell'
import apolloClient from '../lib/apolloClient'

type RouteProps = { country?: string[] }
type Props = StoreSwitcherListQuery
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props, RouteProps>

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    textAlign: 'center',
    padding: `${theme.spacings.md} 0`,
  },
}))

function StoresIndexPage({ availableStores }: Props) {
  const { locale } = usePageRouter()
  const classes = useStyles()

  return (
    <Container maxWidth='md'>
      <PageMeta title='Switch stores' metaDescription='Switch stores' metaRobots={['noindex']} />
      <Typography variant='h2' component='h1' className={classes.title}>
        Country
      </Typography>

      <StoreSwitcherList availableStores={availableStores} locale={locale} />
    </Container>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'left',
  SharedComponent: SheetShell,
  sharedKey: () => 'switch-stores',
  sharedProps: { variant: 'left', size: responsiveVal(320, 800) },
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
