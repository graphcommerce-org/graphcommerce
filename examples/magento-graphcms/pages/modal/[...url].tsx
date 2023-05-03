import { PageOptions } from '@graphcommerce/framer-next-pages'
import { HygraphPagesQuery } from '@graphcommerce/graphcms-ui'
import { hygraphPageContent } from '@graphcommerce/graphcms-ui/server'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  GetStaticProps,
  MetaRobots,
  LayoutOverlayHeader,
  LayoutTitle,
  PageMeta,
} from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { Box, Typography } from '@mui/material'
import { GetStaticPaths } from 'next'
import { LayoutOverlay, LayoutOverlayProps, RowRenderer } from '../../components'
import { LayoutDocument } from '../../components/Layout/Layout.gql'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type Props = HygraphPagesQuery
type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props, RouteProps>

function ModalPage(props: Props) {
  const { pages } = props
  const page = pages?.[0]

  if (!pages?.[0]) return <div />

  const metaRobots = page?.metaRobots.toLowerCase().split('_').flat(1) as MetaRobots[]

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span'>
          {page.title}
        </LayoutTitle>
      </LayoutOverlayHeader>
      <PageMeta
        title={page.metaTitle ?? ''}
        metaDescription={page.metaDescription}
        metaRobots={metaRobots ?? ['noindex']}
      />
      <Box pt={4}>
        <LayoutTitle>{page.title}</LayoutTitle>
        <Typography variant='body1' align='center'>
          {page.metaDescription ?? ''}
        </Typography>
      </Box>

      <RowRenderer content={page.content} />
    </>
  )
}

ModalPage.pageOptions = {
  Layout: LayoutOverlay,
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

export const getStaticProps: GetPageStaticProps = enhanceStaticProps(async ({ params }) => {
  const urlKey = params?.url.join('/') ?? '??'
  const staticClient = graphqlSsrClient()
  const page = hygraphPageContent(`modal/${urlKey}`)

  const layout = staticClient.query({ query: LayoutDocument })

  if (!(await page).data.pages?.[0]) return { notFound: true }

  return {
    props: {
      ...(await page).data,
      ...(await layout).data,
      variantMd: 'bottom',
      size: 'max',
    },
    revalidate: 60 * 20,
  }
})
