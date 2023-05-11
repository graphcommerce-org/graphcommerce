import { PageOptions } from '@graphcommerce/framer-next-pages'
import { PagesStaticPathsDocument, HygraphPagesQuery } from '@graphcommerce/graphcms-ui'
import { hygraphPageContent } from '@graphcommerce/graphcms-ui/server'
import { PageMeta, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import {
  enhanceStaticPaths,
  enhanceStaticProps,
  notFound,
  urlFromParams,
} from '@graphcommerce/next-ui/server'
import { i18n } from '@lingui/core'
import { Container } from '@mui/material'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { LayoutOverlay, LayoutOverlayProps, RowRenderer } from '../../components'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import { getLayout } from '../../components/Layout/layout'

type RouteProps = { url: string[] }

function ServicePage({ pages }: InferGetStaticPropsType<typeof getStaticProps>) {
  const title = pages?.[0].title ?? ''

  return (
    <>
      <PageMeta
        title={title}
        metaDescription={title}
        canonical={pages?.[0]?.url ? `/${pages[0].url}` : undefined}
      />
      <LayoutOverlayHeader>
        <LayoutTitle component='span' size='small'>
          {title}
        </LayoutTitle>
      </LayoutOverlayHeader>

      <Container maxWidth='md'>
        <LayoutTitle>{title}</LayoutTitle>
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

export const getStaticPaths = enhanceStaticPaths<RouteProps>('blocking', async ({ locale }) => {
  const { data } = await graphqlQuery(PagesStaticPathsDocument, {
    variables: {
      first: import.meta.graphCommerce.limitSsg ? 1 : 1000,
      urlStartsWith: 'service',
    },
  })
  return data.pages.map((page) => ({ params: { url: page.url.split('/').slice(1) }, locale }))
})

export const getStaticProps = enhanceStaticProps(getLayout, async (context) => {
  const { params } = context

  const urll = urlFromParams(params)
  const url = urll ? `service/${urll}` : `service`
  const page = hygraphPageContent(url)

  if (!(await page).data.pages?.[0]) return notFound()

  const isRoot = url === 'service'

  return {
    props: {
      ...(await page).data,
      up: isRoot ? null : { href: '/service', title: i18n._(/* i18n */ 'Customer Service') },
    },
    revalidate: 60 * 20,
  }
})
