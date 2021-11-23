import { PageOptions, usePageRouter } from '@graphcommerce/framer-next-pages'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, FullPageShellHeader } from '@graphcommerce/next-ui'
import { GetStaticPaths } from 'next'
import React from 'react'
import FullPageShell, { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import MinimalPageShellHeader from '../../components/AppShell/MinimalPageShellHeader'
import { DefaultPageDocument, DefaultPageQuery } from '../../components/GraphQL/DefaultPage.gql'
import apolloClient from '../../lib/apolloClient'
import { AppShellDemo } from './minimal-page-shell/[[...url]]'

type Props = { url: string } & DefaultPageQuery
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props, RouteProps>

function AppShellTestIndex() {
  const queryParams = usePageRouter().asPath.split('/')

  const header =
    queryParams.includes('minimal') || queryParams.includes('sheet')
      ? MinimalPageShellHeader
      : FullPageShellHeader

  return <AppShellDemo baseUrl='/test' Header={header} />
}

AppShellTestIndex.pageOptions = {
  SharedComponent: FullPageShell,
} as PageOptions

export default AppShellTestIndex

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const urls = ['index', 'other']

  const paths = locales
    .map((locale) => urls.map((url) => ({ params: { url: [url] }, locale })))
    .flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const url = (params?.url ?? ['index']).join('/') ?? ''

  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const conf = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: `test/${url}`,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })

  return {
    props: {
      url,
      up: url !== 'index' ? { href: '/', title: 'Home' } : null,
      ...(await page).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
