import { Container, NoSsr } from '@material-ui/core'
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
  SheetShellHeader,
  Title,
} from '@graphcommerce/next-ui'
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
    <>
      <PageMeta title='Switch stores' metaDescription='Switch stores' metaRobots={['noindex']} />
      <NoSsr>
        <SheetShellHeader backFallbackHref='/' backFallbackTitle='Home' hideDragIndicator>
          <Title size='small' component='span' icon={iconShoppingBag}>
            Country
          </Title>
        </SheetShellHeader>
        <Container maxWidth='md'>
          <AppShellTitle icon={iconShoppingBag}>Country</AppShellTitle>
          <StoreSwitcherList availableStores={availableStores} locale={locale} />
        </Container>
      </NoSsr>
    </>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'left',
  SharedComponent: SheetShell,
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
      variant: 'left',
      size: responsiveVal(320, 800),
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
