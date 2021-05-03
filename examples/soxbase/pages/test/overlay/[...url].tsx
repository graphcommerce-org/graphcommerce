import { Container } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import ForwardButton from '@reachdigital/next-ui/AppShell/ForwardButton'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import { GetStaticPaths } from 'next'
import PageLink from 'next/link'
import React, { useState } from 'react'
import { FullPageShellProps } from '../../../components/AppShell/FullPageShell'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import { DefaultPageDocument, DefaultPageQuery } from '../../../components/GraphQL/DefaultPage.gql'
import apolloClient from '../../../lib/apolloClient'

type Props = { url: string } & DefaultPageQuery
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props, RouteProps>

const cycles = [100, 200, 1000, 2000]

function AppShellTextOverlay({ url, pages }: Props) {
  const title = `Overlay ${url?.charAt(0).toUpperCase() + url?.slice(1)}`
  const [cycle, setCycle] = useState(url === 'index' ? 0 : 3)

  const next = Number(url) + 1
  return <Container maxWidth='md'>Content here</Container>
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'test',
  SharedComponent: SheetShell,
  sharedProps: { variant: 'left', size: responsiveVal(320, 800) },
}
AppShellTextOverlay.pageOptions = pageOptions

export default AppShellTextOverlay

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const urls = ['1']

  const paths = locales
    .map((locale) => urls.map((url) => ({ params: { url: [url] }, locale })))
    .flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const url = params?.url.join('/') ?? ''

  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const conf = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: `test/overlay/${url}`,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })

  return {
    props: {
      url,
      ...(await page).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
