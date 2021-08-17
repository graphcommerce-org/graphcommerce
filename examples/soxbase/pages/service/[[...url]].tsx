import { PageOptions } from '@reachdigital/framer-next-pages'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import {
  AppShellTitle,
  GetStaticProps,
  responsiveVal,
  SheetShellHeader,
  Title,
} from '@reachdigital/next-ui'
import { GetStaticPaths } from 'next'
import React from 'react'
import { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import SheetShell, { SheetShellProps } from '../../components/AppShell/SheetShell'
import { DefaultPageDocument, DefaultPageQuery } from '../../components/GraphQL/DefaultPage.gql'
import { PagesStaticPathsDocument } from '../../components/GraphQL/PagesStaticPaths.gql'
import PageContent from '../../components/PageContent'
import apolloClient from '../../lib/apolloClient'

type Props = DefaultPageQuery
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props, RouteProps>

function ServicePage({ pages }: Props) {
  const title = pages?.[0].title ?? ''
  const asset = pages?.[0].asset

  return (
    <>
      <PageMeta
        title={title}
        metaDescription={title}
        metaRobots={['noindex']}
        canonical={pages?.[0]?.url ?? ''}
      />

      <SheetShellHeader hideDragIndicator>
        <Title component='span' size='small'>
          {title}
        </Title>
      </SheetShellHeader>

      <AppShellTitle>
        <Title>{title}</Title>
      </AppShellTitle>
      {/* <FramerNextPagesSlider> */}
      <PageContent {...pages[0]} />
      {/* </FramerNextPagesSlider> */}
    </>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'left',
  SharedComponent: SheetShell,
  sharedProps: { variant: 'left', size: responsiveVal(320, 800) },
}
ServicePage.pageOptions = pageOptions

export default ServicePage

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = async (locale: string) => {
    const client = apolloClient(locale)
    const { data } = await client.query({
      query: PagesStaticPathsDocument,
      variables: {
        first: process.env.VERCEL_ENV !== 'production' ? 1 : 1000,
        urlStartsWith: 'service',
      },
    })
    return data.pages.map((page) => ({ params: { url: page.url.split('/').slice(1) }, locale }))
  }
  const paths = (await Promise.all(locales.map(path))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ locale, params }) => {
  const url = params?.url ? `service/${params?.url.join('/')}` : `service`
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: { url, rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '' },
  })

  if (!(await page).data.pages?.[0]) return { notFound: true }

  let backFallbackHref: string | null = null
  let backFallbackTitle: string | null = null

  if (typeof params?.url !== 'undefined' && params.url.length > 0) {
    backFallbackHref = '/service'
    backFallbackTitle = 'Help Center'
  }

  return {
    props: {
      ...(await page).data,
      backFallbackHref,
      backFallbackTitle,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
