import { PageOptions } from '@graphcommerce/framer-next-pages'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  AppShellTitle,
  GetStaticProps,
  MetaRobots,
  SheetAppBar,
  Title,
} from '@graphcommerce/next-ui'
import { Box, Typography } from '@material-ui/core'
import { GetStaticPaths } from 'next'
import React from 'react'
import { DefaultPageDocument, DefaultPageQuery } from '../../components/GraphQL/DefaultPage.gql'
import { LayoutSheet, LayoutSheetProps } from '../../components/Layout/LayoutSheet'
import RowRenderer from '../../components/Row/RowRenderer'
import apolloClient from '../../lib/apolloClient'

export const config = { unstable_JsPreload: false }

type Props = DefaultPageQuery
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutSheetProps, Props, RouteProps>

function ModalPage(props: Props) {
  const { pages } = props
  const page = pages?.[0]

  if (!pages?.[0]) return <div />

  const metaRobots = page?.metaRobots.toLowerCase().split('_').flat(1) as MetaRobots[]

  return (
    <>
      <SheetAppBar>
        <Title size='small' component='span'>
          {page.title}
        </Title>
      </SheetAppBar>
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

      <RowRenderer content={page.content} />
    </>
  )
}

ModalPage.pageOptions = {
  Layout: LayoutSheet,
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
