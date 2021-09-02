import { Typography, Box } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { StoreConfigDocument, PageMeta } from '@reachdigital/magento-store'
import {
  AppShellTitle,
  GetStaticProps,
  MetaRobots,
  SheetShellHeader,
  Title,
} from '@reachdigital/next-ui'
import { GetStaticPaths } from 'next'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../components/AppShell/SheetShell'
import { DefaultPageDocument, DefaultPageQuery } from '../../components/GraphQL/DefaultPage.gql'
import PageContent from '../../components/PageContent'
import apolloClient from '../../lib/apolloClient'

type Props = DefaultPageQuery
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<SheetShellProps, Props, RouteProps>

function ModalPage(props: Props) {
  const { pages } = props
  const page = pages?.[0]

  if (!pages?.[0]) return <div />

  const metaRobots = page?.metaRobots.toLowerCase().split('_').flat(1) as MetaRobots[]

  return (
    <>
      <SheetShellHeader backFallbackHref='/' backFallbackTitle='Home'>
        <Title size='small' component='span'>
          {page.title}
        </Title>
      </SheetShellHeader>
      <PageMeta
        title={page.metaTitle ?? ''}
        metaDescription={page.metaDescription}
        metaRobots={metaRobots ?? ['noindex']}
        canonical={page.url}
      />
      <Box pt={4}>
        <AppShellTitle>{page.title}</AppShellTitle>
        <Typography variant='body1' align='center'>
          {page.metaDescription ?? ''}
        </Typography>
      </Box>

      <PageContent content={page.content} />
    </>
  )
}

ModalPage.pageOptions = {
  SharedComponent: SheetShell,
  overlayGroup: 'modal',
} as PageOptions

export default ModalPage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const urls = [['modal']]

  const paths = locales.map((locale) => urls.map((url) => ({ params: { url }, locale }))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ locale, params }) => {
  const urlKey = params?.url.join('/') ?? '??'
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const conf = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: `modal/${urlKey}`,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })

  if (!(await page).data.pages?.[0]) return { notFound: true }

  return {
    props: {
      ...(await page).data,
      apolloState: await conf.then(() => client.cache.extract()),
      variant: 'bottom',
      size: 'max',
    },
    revalidate: 60 * 20,
  }
}
