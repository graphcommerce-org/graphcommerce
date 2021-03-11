import { makeStyles, Theme, Typography, Box } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'
import OverlayPage from '../../components/AppShell/OverlayUi'
import { DefaultPageDocument, DefaultPageQuery } from '../../components/GraphQL/DefaultPage.gql'
import PageContent from '../../components/PageContent'
import apolloClient from '../../lib/apolloClient'

type Props = DefaultPageQuery
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    textAlign: 'center',
    padding: `${theme.spacings.md} 0`,
  },
  box: {
    maxWidth: 820,
    margin: '0 auto',
  },
}))

const FaqPage = ({ pages }: Props) => {
  const classes = useStyles()
  const page = pages[0]
  const title = page.title ?? ''

  return (
    <OverlayPage title={title} variant='left' backFallbackTitle='FAQ' backFallbackHref='/faq/index'>
      <PageMeta title={title} metaDescription={title} metaRobots={['noindex']} />

      {page.title && (
        <Box component='div' whiteSpace='normal' className={classes.box}>
          <Typography variant='h2' component='h1' className={classes.title}>
            {page.title}
          </Typography>
        </Box>
      )}

      <PageContent content={page[0].content} />
    </OverlayPage>
  )
}

FaqPage.Layout = PageLayout
registerRouteUi('/faq/[url]', OverlayPage)
export default FaqPage
// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  // todo: te vervangen met een query naar GraphCMS welke alle URLS op haalt.
  const urls = ['index']
  const paths = locales.map((locale) => urls.map((url) => ({ params: { url }, locale }))).flat(1)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ locale, params }) => {
  const url = `faq/${params?.url}`
  const client = apolloClient(localeToStore(locale))
  const staticClient = apolloClient(localeToStore(locale))

  const config = client.query({ query: StoreConfigDocument })
  const defaultPage = staticClient.query({ query: DefaultPageDocument, variables: { url } })

  if (!(await defaultPage).data.pages?.[0]) return { notFound: true }

  return {
    props: {
      ...(await defaultPage).data,
      apolloState: await config.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
