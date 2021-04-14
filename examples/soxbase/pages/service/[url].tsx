import { Box, makeStyles, Theme, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { GetStaticPaths } from 'next'
import NextError from 'next/error'
import React from 'react'
import FullPageUi from '../../components/AppShell/FullPageUi'
import OverlayPage from '../../components/AppShell/OverlayPage'
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

const ServicePage = ({ pages }: Props) => {
  const classes = useStyles()
  if (!pages) return <NextError statusCode={503} title='Loading skeleton' />
  if (!pages?.[0]) return <NextError statusCode={404} title='Page not found' />
  const title = pages?.[0].title ?? ''

  return (
    <OverlayPage
      title={title}
      variant='left'
      backFallbackTitle='Customer Service'
      backFallbackHref='/service/index'
    >
      <PageMeta title={title} metaDescription={title} metaRobots={['noindex']} />

      {title && (
        <Box component='div' whiteSpace='normal' className={classes.box}>
          <Typography variant='h2' component='h1' className={classes.title}>
            {title}
          </Typography>
        </Box>
      )}

      <PageContent {...pages[0]} />
    </OverlayPage>
  )
}

ServicePage.Layout = PageLayout
ServicePage.pageOptions = { overlay: 'left' } as PageOptions

export default ServicePage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const urls = ['index']
  const paths = locales.map((locale) => urls.map((url) => ({ params: { url }, locale }))).flat(1)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ locale, params }) => {
  const url = `service/${params?.url}`
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const conf = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: { url, rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '' },
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
