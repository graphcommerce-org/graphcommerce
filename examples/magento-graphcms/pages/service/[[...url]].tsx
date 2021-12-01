import { PageOptions } from '@graphcommerce/framer-next-pages'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  AppShellTitle,
  GetStaticProps,
  responsiveVal,
  OverlayAppBar,
  Title,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import { Container } from '@material-ui/core'
import { GetStaticPaths } from 'next'
import React from 'react'
import { DefaultPageDocument, DefaultPageQuery } from '../../components/GraphQL/DefaultPage.gql'
import { PagesStaticPathsDocument } from '../../components/GraphQL/PagesStaticPaths.gql'
import { LayoutFullProps } from '../../components/Layout'
import { LayoutOverlay, LayoutOverlayProps } from '../../components/Layout/LayoutOverlay'
import RowRenderer from '../../components/Row/RowRenderer'
import apolloClient from '../../lib/apolloClient'

type Props = DefaultPageQuery
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutFullProps, Props, RouteProps>

function ServicePage({ pages }: Props) {
  const title = pages?.[0].title ?? ''

  return (
    <>
      <PageMeta
        title={title}
        metaDescription={title}
        metaRobots={['noindex']}
        canonical={pages?.[0]?.url ?? ''}
      />
      <OverlayAppBar>
        <Title component='span' size='small'>
          {title}
        </Title>
      </OverlayAppBar>

      <Container maxWidth='md'>
        <AppShellTitle>
          <Title>{title}</Title>
        </AppShellTitle>
      </Container>
      <RowRenderer {...pages[0]} />
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'left',
  Layout: LayoutOverlay,
  layoutProps: { variantMd: 'left' },
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

  const isRoot = url === 'service'

  return {
    props: {
      ...(await page).data,
      up: isRoot ? null : { href: '/service', title: 'Customer Service' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
