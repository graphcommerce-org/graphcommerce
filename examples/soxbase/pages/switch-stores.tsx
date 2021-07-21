import { Box, Container, Typography } from '@material-ui/core'
import { PageOptions, usePageRouter } from '@reachdigital/framer-next-pages'
import {
  StoreConfigDocument,
  StoreSwitcherList,
  StoreSwitcherListDocument,
  StoreSwitcherListQuery,
  PageMeta,
} from '@reachdigital/magento-store'
import { GetStaticProps, responsiveVal } from '@reachdigital/next-ui'
import React from 'react'
import { FullPageShellProps } from '../components/AppShell/FullPageShell'
import SheetShell, { SheetShellProps } from '../components/AppShell/SheetShell'
import apolloClient from '../lib/apolloClient'

type RouteProps = { country?: string[] }
type Props = StoreSwitcherListQuery
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props, RouteProps>

function StoresIndexPage({ availableStores }: Props) {
  const { locale } = usePageRouter()

  return (
    <Container maxWidth='md'>
      <PageMeta title='Switch stores' metaDescription='Switch stores' metaRobots={['noindex']} />
      <Box pt={4} pb={4}>
        <Typography variant='h2' component='h1' align='center'>
          Country
        </Typography>
      </Box>
      <StoreSwitcherList availableStores={availableStores} locale={locale} />
    </Container>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'left',
  SharedComponent: SheetShell,
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
