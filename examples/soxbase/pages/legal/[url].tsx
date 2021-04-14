import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { GetStaticPaths } from 'next'
import NextError from 'next/error'
import React from 'react'
import FullPageUi from '../../components/AppShell/FullPageUi'
import { DefaultPageDocument, DefaultPageQuery } from '../../components/GraphQL/DefaultPage.gql'
import PageContent from '../../components/PageContent'
import apolloClient from '../../lib/apolloClient'

type Props = DefaultPageQuery
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

const LegalPage = ({ pages }: Props) => {
  if (!pages) return <NextError statusCode={503} title='Loading skeleton' />
  if (!pages?.[0]) return <NextError statusCode={404} title='Page not found' />
  const page = pages[0]

  return (
    <FullPageUi title={page.title ?? ''} backFallbackTitle='Home' backFallbackHref='/'>
      <PageContent {...pages[0]} />
    </FullPageUi>
  )
}

LegalPage.Layout = PageLayout

export default LegalPage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const urls = ['index']
  const paths = locales.map((locale) => urls.map((url) => ({ params: { url }, locale }))).flat(1)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ locale, params }) => {
  const urlKey = params?.url ?? '??'
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const conf = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: `legal/${urlKey}`,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })
  if (!(await page).data.pages?.[0]) return { notFound: true }
  return {
    props: {
      ...(await page).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
