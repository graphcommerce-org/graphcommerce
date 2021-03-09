import { makeStyles, Theme, Typography, Box } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import OverlayUi from '@reachdigital/next-ui/AppShell/OverlayUi'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import NextError from 'next/error'
import React from 'react'
import Page from '../../components/Page'
import { PageByUrlDocument, PageByUrlQuery } from '../../components/Page/PageByUrl.gql'
import apolloClient from '../../lib/apolloClient'

type Props = PageByUrlQuery
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

  if (!pages) return <NextError statusCode={503} title='Loading skeleton' />
  if (!pages?.[0]) return <NextError statusCode={404} title='Page not found' />
  const page = pages[0]

  return (
    <OverlayUi title={page.title ?? ''} variant='left'>
      <PageMeta
        title={page.title ?? ''}
        metaDescription={page.title ?? ''}
        metaRobots='INDEX, FOLLOW'
      />

      {page.title && (
        <Box component='div' whiteSpace='normal' className={classes.box}>
          <Typography variant='h2' component='h1' className={classes.title}>
            {page.title}
          </Typography>
        </Box>
      )}
      <Page {...page} />
    </OverlayUi>
  )
}

FaqPage.Layout = PageLayout
registerRouteUi('/faq/[url]', OverlayUi)
export default FaqPage
// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  // todo: te vervangen met een query naar GraphCMS welke alle URLS op haalt.
  const urls = ['index']
  const paths = locales.map((locale) => urls.map((url) => ({ params: { url }, locale }))).flat(1)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ locale, params }) => {
  const urlKey = params?.url ?? '??'
  const client = apolloClient(localeToStore(locale))
  const staticClient = apolloClient(localeToStore(locale))

  const page = staticClient.query({
    query: PageByUrlDocument,
    variables: { url: `faq/${urlKey}` },
  })
  if (!(await page).data.pages?.[0]) return { notFound: true }
  return {
    props: {
      ...(await page).data,
      apolloState: client.cache.extract(),
    },
    revalidate: 60 * 20,
  }
}
